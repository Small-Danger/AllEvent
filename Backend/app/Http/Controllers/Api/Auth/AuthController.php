<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\IdentifiantBloque;
use App\Models\Profil;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

/**
 * Gestion de l'authentification API.
 * Endpoints: inscription, connexion, deconnexion et recuperation utilisateur courant.
 */
class AuthController extends Controller
{
    /**
     * Inscription (compte client par défaut ; le rôle prestataire se fait via process métier / admin).
     */
    public function register(Request $request): JsonResponse
    {
        $donnees = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email'),
                function (string $attribute, mixed $value, \Closure $fail): void {
                    if (IdentifiantBloque::emailEstBloque((string) $value)) {
                        $fail('Cette adresse e-mail ne peut plus etre utilisee pour une inscription.');
                    }
                },
            ],
            'password' => ['required', 'confirmed', Password::defaults()],
            'prenom' => ['nullable', 'string', 'max:255'],
            'nom' => ['nullable', 'string', 'max:255'],
            'telephone' => [
                'nullable',
                'string',
                'max:32',
                function (string $attribute, mixed $value, \Closure $fail): void {
                    if ($value !== null && $value !== '' && IdentifiantBloque::telephoneEstBloque((string) $value)) {
                        $fail('Ce numero de telephone ne peut plus etre utilise pour une inscription.');
                    }
                },
            ],
        ]);

        $user = User::create([
            'name' => $donnees['name'],
            'email' => $donnees['email'],
            'password' => $donnees['password'],
            'role' => 'client',
            'status' => 'active',
        ]);

        if ($request->filled('prenom') || $request->filled('nom') || $request->filled('telephone')) {
            Profil::create([
                'user_id' => $user->id,
                'prenom' => $donnees['prenom'] ?? null,
                'nom' => $donnees['nom'] ?? null,
                'telephone' => $donnees['telephone'] ?? null,
            ]);
        }

        $jeton = $user->createToken('auth')->plainTextToken;

        return response()->json([
            'message' => 'Compte cree.',
            'token' => $jeton,
            'token_type' => 'Bearer',
            'user' => $this->formaterUtilisateur($user->load('profil')),
        ], 201);
    }

    /**
     * Connexion : retourne un jeton Sanctum.
     */
    public function login(Request $request): JsonResponse
    {
        $donnees = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::query()->where('email', $donnees['email'])->first();

        if (! $user || ! Hash::check($donnees['password'], $user->password)) {
            return response()->json([
                'message' => 'Identifiants invalides.',
            ], 422);
        }

        if ($user->status !== 'active') {
            return response()->json([
                'message' => 'Ce compte est desactive.',
            ], 403);
        }

        $user->tokens()->delete();

        $jeton = $user->createToken('auth')->plainTextToken;

        return response()->json([
            'message' => 'Connecte.',
            'token' => $jeton,
            'token_type' => 'Bearer',
            'user' => $this->formaterUtilisateur($user->load(['profil', 'prestataires'])),
        ]);
    }

    /**
     * Déconnexion : révoque le jeton courant.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json(['message' => 'Deconnecte.']);
    }

    /**
     * Utilisateur connecté (profil + liens prestataire si présents).
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load(['profil', 'prestataires']);

        return response()->json($this->formaterUtilisateur($user));
    }

    /**
     * @return array<string, mixed>
     */
    private function formaterUtilisateur(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'status' => $user->status,
            'profil' => $user->profil,
            'prestataires' => $user->prestataires->map(fn ($p) => [
                'id' => $p->id,
                'nom' => $p->nom,
                'statut' => $p->statut,
                'pivot' => [
                    'role_membre' => $p->pivot->role_membre ?? null,
                ],
            ]),
        ];
    }
}
