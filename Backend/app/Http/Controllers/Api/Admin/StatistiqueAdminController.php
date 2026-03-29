<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\CampagnePublicitaire;
use App\Models\EvenementStatistique;
use App\Models\Litige;
use App\Models\Paiement;
use App\Models\Prestataire;
use App\Models\Reservation;
use App\Models\SignalementAvis;
use App\Models\User;
use Illuminate\Http\JsonResponse;

/**
 * Supervision admin globale.
 * Endpoints: dashboard KPI et export des indicateurs plateforme.
 */
class StatistiqueAdminController extends Controller
{
    /** @return array<string, float|int> */
    private function buildDashboardKpis(): array
    {
        return [
            'utilisateurs_total' => User::query()->count(),
            'prestataires_en_attente' => Prestataire::query()
                ->where('statut', 'en_attente_validation')
                ->count(),
            'signalements_en_attente' => SignalementAvis::query()
                ->where('statut', 'en_attente')
                ->count(),
            'litiges_actifs' => Litige::query()
                ->whereIn('statut', ['ouvert', 'en_cours'])
                ->count(),
            'reservations_total' => Reservation::query()->count(),
            'reservations_payees' => Reservation::query()->where('statut', 'payee')->count(),
            'chiffre_affaires_total' => (float) Paiement::query()->whereIn('statut', ['reussi', 'paye'])->sum('montant'),
            'campagnes_validees' => CampagnePublicitaire::query()->where('statut', 'validee')->count(),
            'evenements_stats' => EvenementStatistique::query()->count(),
        ];
    }

    public function dashboard(): JsonResponse
    {
        return response()->json($this->buildDashboardKpis());
    }

    public function export(): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $kpis = $this->buildDashboardKpis();

        return response()->streamDownload(function () use ($kpis): void {
            echo "metrique,valeur\n";
            foreach ($kpis as $k => $v) {
                echo $k.','.$v."\n";
            }
        }, 'rapport-admin.csv', ['Content-Type' => 'text/csv']);
    }
}
