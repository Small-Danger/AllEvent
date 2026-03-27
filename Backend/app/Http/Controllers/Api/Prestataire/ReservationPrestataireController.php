<?php

namespace App\Http\Controllers\Api\Prestataire;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Gestion des reservations recues par prestataire.
 * Endpoints: listing et mise a jour statut de reservation.
 */
class ReservationPrestataireController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $prestataireIds = $request->user()->prestataires()->pluck('prestataires.id');

        $reservations = Reservation::query()
            ->whereHas('lignes.creneau.activite', fn ($q) => $q->whereIn('prestataire_id', $prestataireIds))
            ->with(['user:id,name,email', 'lignes.creneau.activite:id,titre,prestataire_id', 'paiement'])
            ->latest()
            ->paginate(30);

        return response()->json($reservations);
    }

    public function updateStatut(Request $request, Reservation $reservation): JsonResponse
    {
        $prestataireIds = $request->user()->prestataires()->pluck('prestataires.id');
        $autorise = $reservation->lignes()
            ->whereHas('creneau.activite', fn ($q) => $q->whereIn('prestataire_id', $prestataireIds))
            ->exists();
        if (! $autorise) {
            return response()->json(['message' => 'Reservation introuvable.'], 404);
        }

        $payload = $request->validate([
            'statut' => ['required', 'string', 'in:confirmee,annulee'],
        ]);

        $reservation->update(['statut' => $payload['statut']]);
        return response()->json($reservation->fresh());
    }
}
