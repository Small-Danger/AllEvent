<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Activite;
use App\Models\Categorie;
use App\Models\Ville;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Catalogue public sans authentification.
 * Expose landing, listing activites, details, avis, categories et villes.
 */
class CataloguePublicController extends Controller
{
    public function landing(): JsonResponse
    {
        return response()->json([
            'message' => 'Bienvenue sur ALLEVENT.',
            'invitation_prestataire' => 'Inscrivez vos activites pour toucher plus de clients.',
        ]);
    }

    public function activites(Request $request): JsonResponse
    {
        $perPage = min((int) $request->integer('per_page', 6), 12);

        $activites = Activite::query()
            ->where('statut', 'publiee')
            ->with(['ville:id,nom', 'categorie:id,nom', 'medias:id,activite_id,url,ordre'])
            ->latest()
            ->paginate($perPage);

        return response()->json($activites);
    }

    public function showActivite(Activite $activite): JsonResponse
    {
        if ($activite->statut !== 'publiee') {
            return response()->json(['message' => 'Activite non disponible publiquement.'], 404);
        }

        $activite->load([
            'ville:id,nom',
            'categorie:id,nom',
            'lieu:id,nom,adresse,ville_id',
            'medias:id,activite_id,url,ordre',
            'avis' => fn ($q) => $q->where('statut', 'visible')->with('user:id,name')->latest()->limit(20),
        ]);

        return response()->json($activite);
    }

    public function avisActivite(Activite $activite): JsonResponse
    {
        if ($activite->statut !== 'publiee') {
            return response()->json(['message' => 'Activite non disponible publiquement.'], 404);
        }

        $avis = $activite->avis()
            ->where('statut', 'visible')
            ->with('user:id,name')
            ->latest()
            ->paginate(20);

        return response()->json($avis);
    }

    public function categories(): JsonResponse
    {
        return response()->json(Categorie::query()->select('id', 'nom', 'slug')->orderBy('nom')->get());
    }

    public function villes(): JsonResponse
    {
        return response()->json(Ville::query()->select('id', 'nom', 'code_pays')->orderBy('nom')->get());
    }
}
