<?php

namespace App\Http\Controllers\Api\Prestataire;

use App\Http\Controllers\Controller;
use App\Models\Avis;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Gestion des avis recu par prestataire.
 * Endpoints: consultation et reponse officielle a un avis.
 */
class AvisPrestataireController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $prestataireIds = $request->user()->prestataires()->pluck('prestataires.id');

        $avis = Avis::query()
            ->whereHas('activite', fn ($q) => $q->whereIn('prestataire_id', $prestataireIds))
            ->with(['user:id,name', 'activite:id,titre'])
            ->latest()
            ->paginate(30);

        return response()->json($avis);
    }

    public function repondre(Request $request, Avis $avis): JsonResponse
    {
        $prestataireIds = $request->user()->prestataires()->pluck('prestataires.id');
        if (! $avis->activite()->whereIn('prestataire_id', $prestataireIds)->exists()) {
            return response()->json(['message' => 'Avis introuvable.'], 404);
        }

        $payload = $request->validate([
            'reponse_prestataire' => ['required', 'string', 'max:5000'],
        ]);

        $avis->update([
            'reponse_prestataire' => $payload['reponse_prestataire'],
            'repondu_le' => now(),
        ]);

        return response()->json($avis->fresh());
    }
}
