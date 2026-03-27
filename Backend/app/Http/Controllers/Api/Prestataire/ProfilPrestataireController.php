<?php

namespace App\Http\Controllers\Api\Prestataire;

use App\Http\Controllers\Controller;
use App\Models\Prestataire;
use App\Models\PrestataireMembre;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Gestion du profil organisation prestataire.
 * Endpoints: creation, edition, soumission validation et suivi statut.
 */
class ProfilPrestataireController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $prestataires = $request->user()->prestataires()->latest()->paginate(20);
        return response()->json($prestataires);
    }

    public function store(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'nom' => ['required', 'string', 'max:255'],
            'raison_sociale' => ['nullable', 'string', 'max:255'],
            'numero_fiscal' => ['nullable', 'string', 'max:255'],
        ]);

        $prestataire = Prestataire::create(array_merge($payload, [
            'statut' => 'en_attente_validation',
            'valide_le' => null,
        ]));

        PrestataireMembre::create([
            'user_id' => $request->user()->id,
            'prestataire_id' => $prestataire->id,
            'role_membre' => 'owner',
            'rejoint_le' => now(),
        ]);

        if ($request->user()->role !== 'admin') {
            $request->user()->update(['role' => 'prestataire']);
        }

        return response()->json($prestataire, 201);
    }

    public function update(Request $request, Prestataire $prestataire): JsonResponse
    {
        $autorise = $request->user()->prestataires()->whereKey($prestataire->id)->exists();
        if (! $autorise) {
            return response()->json(['message' => 'Prestataire introuvable.'], 404);
        }

        $payload = $request->validate([
            'nom' => ['sometimes', 'string', 'max:255'],
            'raison_sociale' => ['nullable', 'string', 'max:255'],
            'numero_fiscal' => ['nullable', 'string', 'max:255'],
        ]);

        $payload['statut'] = 'en_attente_validation';
        $payload['valide_le'] = null;
        $prestataire->update($payload);

        return response()->json($prestataire->fresh());
    }

    public function soumettreValidation(Request $request, Prestataire $prestataire): JsonResponse
    {
        $autorise = $request->user()->prestataires()->whereKey($prestataire->id)->exists();
        if (! $autorise) {
            return response()->json(['message' => 'Prestataire introuvable.'], 404);
        }

        $prestataire->update(['statut' => 'en_attente_validation', 'valide_le' => null]);
        return response()->json(['message' => 'Profil soumis pour validation.', 'prestataire' => $prestataire->fresh()]);
    }

    public function statut(Request $request, Prestataire $prestataire): JsonResponse
    {
        $autorise = $request->user()->prestataires()->whereKey($prestataire->id)->exists();
        if (! $autorise) {
            return response()->json(['message' => 'Prestataire introuvable.'], 404);
        }

        return response()->json([
            'id' => $prestataire->id,
            'statut' => $prestataire->statut,
            'valide_le' => $prestataire->valide_le,
        ]);
    }
}
