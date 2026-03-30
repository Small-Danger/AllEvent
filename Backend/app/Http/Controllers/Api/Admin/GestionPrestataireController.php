<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\JournalNotification;
use App\Models\Prestataire;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Supervision admin des prestataires.
 * Endpoints: listing, fiche, validation ou rejet du statut metier.
 */
class GestionPrestataireController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Prestataire::query()
            ->withCount(['activites', 'users'])
            ->latest();

        if ($request->filled('statut')) {
            $query->where('statut', $request->string('statut'));
        }

        return response()->json($query->paginate(30));
    }

    public function show(Prestataire $prestataire): JsonResponse
    {
        $prestataire->loadCount('activites');
        $prestataire->load([
            'users:id,name,email',
            'documents.uploadedBy:id,name,email',
        ]);

        return response()->json($prestataire);
    }

    public function updateStatut(Request $request, Prestataire $prestataire): JsonResponse
    {
        $payload = $request->validate([
            'statut' => ['required', 'string', 'in:en_attente_validation,valide,rejete'],
        ]);

        $prestataire->update([
            'statut' => $payload['statut'],
            'valide_le' => $payload['statut'] === 'valide' ? now() : null,
        ]);

        $prestataire->load('users');

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
