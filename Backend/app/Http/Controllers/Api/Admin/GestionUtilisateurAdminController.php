<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

/**
 * Administration des comptes utilisateurs.
 * Endpoints: lister, consulter, modifier et supprimer les comptes.
 */
class GestionUtilisateurAdminController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::query()->with('profil')->latest();

        if ($request->filled('role')) {
            $query->where('role', $request->string('role'));
        }
        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return response()->json($query->paginate(30));
    }

    public function show(User $user): JsonResponse
    {
        return response()->json($user->load(['profil', 'prestataires']));
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $payload = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'role' => ['sometimes', 'string', 'in:admin,client,prestataire'],
            'status' => ['sometimes', 'string', 'in:active,inactive,suspendu'],
        ]);

        $user->update($payload);
        return response()->json($user->fresh()->load('profil'));
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json(['message' => 'Compte supprime.']);
    }
}
