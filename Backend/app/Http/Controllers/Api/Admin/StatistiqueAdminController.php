<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\CampagnePublicitaire;
use App\Models\EvenementStatistique;
use App\Models\Paiement;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;

/**
 * Supervision admin globale.
 * Endpoints: dashboard KPI et export des indicateurs plateforme.
 */
class StatistiqueAdminController extends Controller
{
    public function dashboard(): JsonResponse
    {
        $kpis = [
            'reservations_total' => Reservation::query()->count(),
            'reservations_payees' => Reservation::query()->where('statut', 'payee')->count(),
            'chiffre_affaires_total' => (float) Paiement::query()->whereIn('statut', ['reussi', 'paye'])->sum('montant'),
            'campagnes_validees' => CampagnePublicitaire::query()->where('statut', 'validee')->count(),
            'evenements_stats' => EvenementStatistique::query()->count(),
        ];

        return response()->json($kpis);
    }

    public function export(): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $kpis = [
            'reservations_total' => Reservation::query()->count(),
            'reservations_payees' => Reservation::query()->where('statut', 'payee')->count(),
            'chiffre_affaires_total' => (float) Paiement::query()->whereIn('statut', ['reussi', 'paye'])->sum('montant'),
            'campagnes_validees' => CampagnePublicitaire::query()->where('statut', 'validee')->count(),
            'evenements_stats' => EvenementStatistique::query()->count(),
        ];

        return response()->streamDownload(function () use ($kpis): void {
            echo "metrique,valeur\n";
            foreach ($kpis as $k => $v) {
                echo $k.','.$v."\n";
            }
        }, 'rapport-admin.csv', ['Content-Type' => 'text/csv']);
    }
}
