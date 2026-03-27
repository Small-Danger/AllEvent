<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\JournalNotification;
use App\Models\Prestataire;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Supervision admin des prestataires.
 * Endpoints: listing et validation/rejet de statut.
 */
class GestionPrestataireController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Prestataire::query()->latest()->paginate(30));
    }

    public function updateStatut(Request $request, Prestataire $prestataire): JsonResponse
    {
        $payload = $request->validate([
            'statut' => ['required', 'string', 'max:32'],
        ]);

        $prestataire->update([
            'statut' => $payload['statut'],
            'valide_le' => $payload['statut'] === 'valide' ? now() : null,
        ]);

        foreach ($prestataire->users as $user) {
            JournalNotification::create([
                'user_id' => $user->id,
                'canal' => 'email',
                'cle_modele' => 'prestataire_statut_mis_a_jour',
                'payload' => ['prestataire_id' => $prestataire->id, 'statut' => $payload['statut']],
                'statut' => 'envoye',
                'envoye_le' => now(),
            ]);
        }

        return response()->json($prestataire->fresh());
    }
}
