<?php

use App\Http\Controllers\Api\Admin\GestionPrestataireController;
use App\Http\Controllers\Api\Admin\GestionPubliciteAdminController;
use App\Http\Controllers\Api\Admin\GestionUtilisateurAdminController;
use App\Http\Controllers\Api\Admin\GestionCommissionAdminController;
use App\Http\Controllers\Api\Admin\GestionLitigeAdminController;
use App\Http\Controllers\Api\Admin\ModerationAvisAdminController;
use App\Http\Controllers\Api\Admin\ContenuAdminController;
use App\Http\Controllers\Api\Admin\NotificationAdminController;
use App\Http\Controllers\Api\Admin\StatistiqueAdminController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\MotDePasseController;
use App\Http\Controllers\Api\Client\AvisClientController;
use App\Http\Controllers\Api\Client\CatalogueClientController;
use App\Http\Controllers\Api\Client\FavoriClientController;
use App\Http\Controllers\Api\Client\PanierClientController;
use App\Http\Controllers\Api\Client\ProfilClientController;
use App\Http\Controllers\Api\Client\ReservationClientController;
use App\Http\Controllers\Api\Client\LitigeClientController;
use App\Http\Controllers\Api\Client\NotificationClientController;
use App\Http\Controllers\Api\Client\RecommandationClientController;
use App\Http\Controllers\Api\Prestataire\GestionActiviteController;
use App\Http\Controllers\Api\Prestataire\GestionCampagnePublicitaireController;
use App\Http\Controllers\Api\Prestataire\GestionPromotionController;
use App\Http\Controllers\Api\Prestataire\StatistiquePrestataireController;
use App\Http\Controllers\Api\Prestataire\ProfilPrestataireController;
use App\Http\Controllers\Api\Prestataire\ReservationPrestataireController;
use App\Http\Controllers\Api\Prestataire\AvisPrestataireController;
use App\Http\Controllers\Api\Prestataire\MediaActivitePrestataireController;
use App\Http\Controllers\Api\Public\CataloguePublicController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Ordre par acteur : public -> client -> prestataire -> admin
|--------------------------------------------------------------------------
| Authentification API : Laravel Sanctum (Bearer token).
|--------------------------------------------------------------------------
*/

Route::prefix('public')->group(function (): void {
    // Catalogue public (sans authentification).
    Route::get('/landing', [CataloguePublicController::class, 'landing']);
    Route::get('/activites', [CataloguePublicController::class, 'activites']);
    Route::get('/activites/{activite}', [CataloguePublicController::class, 'showActivite']);
    Route::get('/activites/{activite}/avis', [CataloguePublicController::class, 'avisActivite']);
    Route::get('/categories', [CataloguePublicController::class, 'categories']);
    Route::get('/villes', [CataloguePublicController::class, 'villes']);

    // Auth publique.
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/mot-de-passe/email', [MotDePasseController::class, 'demanderLienReset']);
    Route::post('/auth/mot-de-passe/reset', [MotDePasseController::class, 'reinitialiser']);
});

Route::prefix('client')
    ->middleware('auth:sanctum')
    ->group(function (): void {
        // Session client.
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Catalogue client.
        Route::get('/catalogue/activites', [CatalogueClientController::class, 'index']);
        Route::get('/catalogue/activites/{activite}', [CatalogueClientController::class, 'show']);

        // Profil client.
        Route::get('/profil', [ProfilClientController::class, 'show']);
        Route::patch('/profil', [ProfilClientController::class, 'update']);

        // Panier.
        Route::get('/panier', [PanierClientController::class, 'show']);
        Route::post('/panier/lignes', [PanierClientController::class, 'ajouterLigne']);
        Route::patch('/panier/lignes/{lignePanier}', [PanierClientController::class, 'modifierLigne']);
        Route::delete('/panier/lignes/{lignePanier}', [PanierClientController::class, 'supprimerLigne']);
        Route::delete('/panier', [PanierClientController::class, 'vider']);

        // Reservations et paiement.
        Route::get('/reservations', [ReservationClientController::class, 'index']);
        Route::post('/reservations', [ReservationClientController::class, 'validerPanier']);
        Route::get('/reservations/{reservation}', [ReservationClientController::class, 'show']);
        Route::get('/reservations/{reservation}/billet', [ReservationClientController::class, 'billet']);
        Route::post('/reservations/{reservation}/paiement/simuler', [ReservationClientController::class, 'simulerPaiement']);
        Route::patch('/reservations/{reservation}/annuler', [ReservationClientController::class, 'annuler']);
        Route::post('/reservations/{reservation}/remboursements', [ReservationClientController::class, 'demanderRemboursement']);

        // Favoris.
        Route::get('/favoris', [FavoriClientController::class, 'index']);
        Route::post('/favoris', [FavoriClientController::class, 'ajouter']);
        Route::delete('/favoris/{activite}', [FavoriClientController::class, 'supprimer']);

        // Avis client.
        Route::get('/avis', [AvisClientController::class, 'index']);
        Route::post('/avis', [AvisClientController::class, 'store']);
        Route::patch('/avis/{avis}', [AvisClientController::class, 'update']);
        Route::delete('/avis/{avis}', [AvisClientController::class, 'destroy']);
        Route::post('/avis/{avis}/signalements', [AvisClientController::class, 'signaler']);

        // Notifications et recommandations.
        Route::get('/notifications', [NotificationClientController::class, 'index']);
        Route::get('/recommandations', [RecommandationClientController::class, 'index']);

        // Litiges.
        Route::get('/litiges', [LitigeClientController::class, 'index']);
        Route::post('/litiges', [LitigeClientController::class, 'store']);
        Route::get('/litiges/{litige}', [LitigeClientController::class, 'show']);
        Route::post('/litiges/{litige}/messages', [LitigeClientController::class, 'ajouterMessage']);
    });

Route::prefix('prestataire')
    ->middleware(['auth:sanctum', 'role:prestataire,admin'])
    ->group(function (): void {
        // Profil prestataire.
        Route::get('/profil', [ProfilPrestataireController::class, 'index']);
        Route::post('/profil', [ProfilPrestataireController::class, 'store']);
        Route::patch('/profil/{prestataire}', [ProfilPrestataireController::class, 'update']);
        Route::post('/profil/{prestataire}/soumettre', [ProfilPrestataireController::class, 'soumettreValidation']);
        Route::get('/profil/{prestataire}/statut', [ProfilPrestataireController::class, 'statut']);

        // Activites et creneaux.
        Route::get('/activites', [GestionActiviteController::class, 'index']);
        Route::post('/activites', [GestionActiviteController::class, 'store']);
        Route::get('/activites/{activite}', [GestionActiviteController::class, 'show']);
        Route::put('/activites/{activite}', [GestionActiviteController::class, 'update']);
        Route::delete('/activites/{activite}', [GestionActiviteController::class, 'destroy']);

        Route::post('/activites/{activite}/creneaux', [GestionActiviteController::class, 'storeCreneau']);
        Route::put('/activites/{activite}/creneaux/{creneau}', [GestionActiviteController::class, 'updateCreneau']);
        Route::delete('/activites/{activite}/creneaux/{creneau}', [GestionActiviteController::class, 'destroyCreneau']);

        // Promotions.
        Route::get('/promotions', [GestionPromotionController::class, 'index']);
        Route::post('/promotions', [GestionPromotionController::class, 'store']);
        Route::put('/promotions/{promotion}', [GestionPromotionController::class, 'update']);

        // Campagnes publicitaires.
        Route::get('/publicites/campagnes', [GestionCampagnePublicitaireController::class, 'index']);
        Route::post('/publicites/campagnes', [GestionCampagnePublicitaireController::class, 'store']);
        Route::put('/publicites/campagnes/{campagne}', [GestionCampagnePublicitaireController::class, 'update']);
        Route::delete('/publicites/campagnes/{campagne}', [GestionCampagnePublicitaireController::class, 'destroy']);
        Route::post('/publicites/campagnes/{campagne}/paiement/simuler', [GestionCampagnePublicitaireController::class, 'simulerPaiement']);

        // Medias activite.
        Route::post('/activites/{activite}/medias', [MediaActivitePrestataireController::class, 'ajouter']);
        Route::delete('/activites/{activite}/medias/{media}', [MediaActivitePrestataireController::class, 'supprimer']);

        // Reservations, avis et statistiques prestataire.
        Route::get('/reservations', [ReservationPrestataireController::class, 'index']);
        Route::patch('/reservations/{reservation}/statut', [ReservationPrestataireController::class, 'updateStatut']);

        Route::get('/avis', [AvisPrestataireController::class, 'index']);
        Route::post('/avis/{avis}/reponse', [AvisPrestataireController::class, 'repondre']);

        Route::get('/statistiques/dashboard', [StatistiquePrestataireController::class, 'dashboard']);
        Route::get('/statistiques/export', [StatistiquePrestataireController::class, 'export']);
    });

Route::prefix('admin')
    ->middleware(['auth:sanctum', 'role:admin'])
    ->group(function (): void {
        // Prestataires.
        Route::get('/prestataires', [GestionPrestataireController::class, 'index']);
        Route::patch('/prestataires/{prestataire}/statut', [GestionPrestataireController::class, 'updateStatut']);

        // Comptes utilisateurs.
        Route::get('/utilisateurs', [GestionUtilisateurAdminController::class, 'index']);
        Route::get('/utilisateurs/{user}', [GestionUtilisateurAdminController::class, 'show']);
        Route::patch('/utilisateurs/{user}', [GestionUtilisateurAdminController::class, 'update']);
        Route::delete('/utilisateurs/{user}', [GestionUtilisateurAdminController::class, 'destroy']);

        // Commissions et remboursements.
        Route::get('/commissions/regles', [GestionCommissionAdminController::class, 'regles']);
        Route::post('/commissions/regles', [GestionCommissionAdminController::class, 'storeRegle']);
        Route::patch('/commissions/regles/{regleCommission}', [GestionCommissionAdminController::class, 'updateRegle']);
        Route::get('/commissions', [GestionCommissionAdminController::class, 'commissions']);
        Route::get('/remboursements', [GestionCommissionAdminController::class, 'remboursements']);
        Route::patch('/remboursements/{remboursement}', [GestionCommissionAdminController::class, 'traiterRemboursement']);

        // Moderation avis.
        Route::get('/avis', [ModerationAvisAdminController::class, 'index']);
        Route::get('/avis/signalements', [ModerationAvisAdminController::class, 'signalements']);
        Route::patch('/avis/{avis}/statut', [ModerationAvisAdminController::class, 'updateStatut']);
        Route::delete('/avis/{avis}', [ModerationAvisAdminController::class, 'supprimer']);

        // Publicites.
        Route::post('/publicites/campagnes', [GestionPubliciteAdminController::class, 'storeCampagne']);
        Route::get('/publicites/campagnes', [GestionPubliciteAdminController::class, 'campagnes']);
        Route::patch('/publicites/campagnes/{campagne}', [GestionPubliciteAdminController::class, 'updateCampagne']);
        Route::patch('/publicites/campagnes/{campagne}/statut', [GestionPubliciteAdminController::class, 'updateStatutCampagne']);
        Route::delete('/publicites/campagnes/{campagne}', [GestionPubliciteAdminController::class, 'deleteCampagne']);
        Route::get('/publicites/paiements', [GestionPubliciteAdminController::class, 'paiementsPublicite']);

        // Litiges.
        Route::post('/litiges', [GestionLitigeAdminController::class, 'store']);
        Route::get('/litiges', [GestionLitigeAdminController::class, 'index']);
        Route::get('/litiges/{litige}', [GestionLitigeAdminController::class, 'show']);
        Route::patch('/litiges/{litige}', [GestionLitigeAdminController::class, 'update']);
        Route::post('/litiges/{litige}/messages', [GestionLitigeAdminController::class, 'ajouterMessage']);
        Route::post('/litiges/{litige}/messages-internes', [GestionLitigeAdminController::class, 'ajouterMessageInterne']);

        // Contenu global.
        Route::get('/contenu/categories', [ContenuAdminController::class, 'categories']);
        Route::post('/contenu/categories', [ContenuAdminController::class, 'storeCategorie']);
        Route::patch('/contenu/categories/{categorie}', [ContenuAdminController::class, 'updateCategorie']);
        Route::delete('/contenu/categories/{categorie}', [ContenuAdminController::class, 'deleteCategorie']);

        Route::get('/contenu/villes', [ContenuAdminController::class, 'villes']);
        Route::post('/contenu/villes', [ContenuAdminController::class, 'storeVille']);
        Route::patch('/contenu/villes/{ville}', [ContenuAdminController::class, 'updateVille']);
        Route::delete('/contenu/villes/{ville}', [ContenuAdminController::class, 'deleteVille']);

        Route::get('/contenu/activites', [ContenuAdminController::class, 'activites']);
        Route::patch('/contenu/activites/{activite}', [ContenuAdminController::class, 'updateActivite']);
        Route::delete('/contenu/activites/{activite}', [ContenuAdminController::class, 'deleteActivite']);

        // Notifications et statistiques globales.
        Route::post('/notifications/globales', [NotificationAdminController::class, 'envoyerGlobale']);
        Route::get('/notifications/logs', [NotificationAdminController::class, 'logs']);

        Route::get('/statistiques/dashboard', [StatistiqueAdminController::class, 'dashboard']);
        Route::get('/statistiques/export', [StatistiqueAdminController::class, 'export']);
    });
