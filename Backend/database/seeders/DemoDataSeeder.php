<?php

namespace Database\Seeders;

use App\Models\Activite;
use App\Models\ActiviteMedia;
use App\Models\Avis;
use App\Models\Billet;
use App\Models\CampagnePublicitaire;
use App\Models\Categorie;
use App\Models\Commission;
use App\Models\Creneau;
use App\Models\EvenementStatistique;
use App\Models\Favori;
use App\Models\JournalNotification;
use App\Models\LigneReservation;
use App\Models\Litige;
use App\Models\Lieu;
use App\Models\MessageLitige;
use App\Models\Paiement;
use App\Models\PaiementPublicite;
use App\Models\Panier;
use App\Models\Prestataire;
use App\Models\PrestataireMembre;
use App\Models\Profil;
use App\Models\Promotion;
use App\Models\RegleCommission;
use App\Models\Remboursement;
use App\Models\Reservation;
use App\Models\SignalementAvis;
use App\Models\User;
use App\Models\Ville;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $password = 'Password123!';

        $admin = User::query()->create([
            'name' => 'Admin Principal',
            'email' => 'admin@allevent.local',
            'password' => $password,
            'role' => 'admin',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        Profil::query()->create([
            'user_id' => $admin->id,
            'prenom' => 'Admin',
            'nom' => 'Principal',
            'telephone' => '+237600000001',
        ]);

        $clients = collect(range(1, 3))->map(function (int $i) use ($password) {
            $user = User::query()->create([
                'name' => "Client {$i}",
                'email' => "client{$i}@allevent.local",
                'password' => $password,
                'role' => 'client',
                'status' => 'active',
                'email_verified_at' => now(),
            ]);

            Profil::query()->create([
                'user_id' => $user->id,
                'prenom' => "PrenomClient{$i}",
                'nom' => "NomClient{$i}",
                'telephone' => "+23760000010{$i}",
            ]);

            return $user;
        });

        $prestataireUsers = collect(range(1, 3))->map(function (int $i) use ($password) {
            $user = User::query()->create([
                'name' => "Prestataire User {$i}",
                'email' => "prestataire{$i}@allevent.local",
                'password' => $password,
                'role' => 'prestataire',
                'status' => 'active',
                'email_verified_at' => now(),
            ]);

            Profil::query()->create([
                'user_id' => $user->id,
                'prenom' => "PrenomPrestataire{$i}",
                'nom' => "NomPrestataire{$i}",
                'telephone' => "+23760000020{$i}",
            ]);

            return $user;
        });

        $categories = collect([
            'Aventure',
            'Culture',
            'Gastronomie',
            'Nature',
            'Vie nocturne',
        ])->map(fn (string $nom) => Categorie::query()->create([
            'nom' => $nom,
            'slug' => Str::slug($nom),
        ]));

        $villes = collect(['Douala', 'Yaounde', 'Bafoussam'])->map(fn (string $nom) => Ville::query()->create([
            'nom' => $nom,
            'code_pays' => 'CM',
        ]));

        $lieux = $villes->flatMap(function (Ville $ville) {
            return collect(range(1, 3))->map(function (int $n) use ($ville) {
                return Lieu::query()->create([
                    'ville_id' => $ville->id,
                    'nom' => "Lieu {$ville->nom} {$n}",
                    'adresse' => "Avenue {$n}, {$ville->nom}",
                    'latitude' => 4.00 + ($n / 10),
                    'longitude' => 9.00 + ($n / 10),
                ]);
            });
        })->values();

        $prestataires = $prestataireUsers->map(function (User $user, int $i) {
            $prestataire = Prestataire::query()->create([
                'nom' => 'Prestataire '.($i + 1),
                'raison_sociale' => "Allevent Services ".($i + 1),
                'numero_fiscal' => 'MRC'.str_pad((string) ($i + 1), 6, '0', STR_PAD_LEFT),
                'statut' => 'valide',
                'valide_le' => now()->subDays(10 - $i),
            ]);

            PrestataireMembre::query()->create([
                'user_id' => $user->id,
                'prestataire_id' => $prestataire->id,
                'role_membre' => 'owner',
                'rejoint_le' => now()->subDays(12 - $i),
            ]);

            RegleCommission::query()->create([
                'prestataire_id' => $prestataire->id,
                'taux_pourcent' => 12.5,
                'debut_effet' => now()->subMonth()->toDateString(),
            ]);

            return $prestataire;
        });

        $activites = collect();
        for ($i = 1; $i <= 15; $i++) {
            $prestataire = $prestataires[($i - 1) % $prestataires->count()];
            $categorie = $categories[($i - 1) % $categories->count()];
            $ville = $villes[($i - 1) % $villes->count()];
            $lieu = $lieux->firstWhere('ville_id', $ville->id);

            $activite = Activite::query()->create([
                'prestataire_id' => $prestataire->id,
                'categorie_id' => $categorie->id,
                'ville_id' => $ville->id,
                'lieu_id' => $lieu?->id,
                'titre' => "Activite Demo {$i}",
                'description' => "Description complete de l'activite demo {$i}.",
                'statut' => 'publiee',
                'prix_base' => 7500 + ($i * 500),
            ]);
            $activites->push($activite);

            ActiviteMedia::query()->create([
                'activite_id' => $activite->id,
                'url' => "https://picsum.photos/seed/allevent-{$i}/900/600",
                'ordre' => 0,
            ]);

            Creneau::query()->create([
                'activite_id' => $activite->id,
                'debut_at' => now()->addDays($i)->setHour(10),
                'fin_at' => now()->addDays($i)->setHour(13),
                'capacite_totale' => 30,
                'capacite_restante' => 24,
                'prix_applique' => 7500 + ($i * 500),
                'statut' => 'ouvert',
            ]);
            Creneau::query()->create([
                'activite_id' => $activite->id,
                'debut_at' => now()->addDays($i + 5)->setHour(15),
                'fin_at' => now()->addDays($i + 5)->setHour(18),
                'capacite_totale' => 20,
                'capacite_restante' => 18,
                'prix_applique' => 8000 + ($i * 450),
                'statut' => 'ouvert',
            ]);
        }

        $promotions = $prestataires->map(function (Prestataire $prestataire, int $i) {
            return Promotion::query()->create([
                'code' => 'PROMO'.($i + 1).'A',
                'libelle' => 'Promotion lancement '.($i + 1),
                'prestataire_id' => $prestataire->id,
                'type_remise' => 'pourcentage',
                'valeur' => 10 + $i,
                'montant_minimum_commande' => 10000,
                'utilisations_max' => 200,
                'utilisations_actuelles' => 3 + $i,
                'debut_at' => now()->subDays(5),
                'fin_at' => now()->addDays(30),
                'statut' => 'active',
            ]);
        });

        $campagnes = $prestataires->map(function (Prestataire $prestataire, int $i) use ($villes, $categories, $activites) {
            $campagne = CampagnePublicitaire::query()->create([
                'prestataire_id' => $prestataire->id,
                'titre' => 'Campagne premium '.($i + 1),
                'emplacement' => 'hero_home',
                'ville_id' => $villes[$i % $villes->count()]->id,
                'categorie_id' => $categories[$i % $categories->count()]->id,
                'activite_id' => $activites[$i]->id,
                'debut_at' => now()->subDays(2),
                'fin_at' => now()->addDays(20),
                'priorite' => 5 + $i,
                'budget_montant' => 60000 + ($i * 5000),
                'statut' => 'validee',
            ]);

            PaiementPublicite::query()->create([
                'campagne_publicitaire_id' => $campagne->id,
                'montant' => 25000 + ($i * 2500),
                'devise' => 'XAF',
                'statut' => 'paye',
                'fournisseur' => 'simulation',
                'id_intention_fournisseur' => 'ad-intent-'.$campagne->id,
                'paye_le' => now()->subDay(),
            ]);

            return $campagne;
        });

        $reservations = collect();
        $paidPaymentIds = collect();
        foreach ($clients as $indexClient => $client) {
            for ($j = 0; $j < 3; $j++) {
                $activite = $activites[($indexClient * 3) + $j];
                $creneau = Creneau::query()->where('activite_id', $activite->id)->firstOrFail();

                $panier = Panier::query()->create([
                    'user_id' => $client->id,
                    'statut' => 'converti',
                    'expire_le' => now()->addDays(2),
                ]);

                $reservation = Reservation::query()->create([
                    'user_id' => $client->id,
                    'panier_id' => $panier->id,
                    'promotion_id' => $promotions[$indexClient % $promotions->count()]->id,
                    'statut' => $j === 2 ? 'annulee' : 'payee',
                    'montant_total' => (float) $creneau->prix_applique * 2,
                    'montant_reduction' => 1000,
                    'devise' => 'XAF',
                ]);
                $reservations->push($reservation);

                LigneReservation::query()->create([
                    'reservation_id' => $reservation->id,
                    'creneau_id' => $creneau->id,
                    'quantite' => 2,
                    'prix_unitaire_snapshot' => $creneau->prix_applique,
                ]);

                $paiement = Paiement::query()->create([
                    'reservation_id' => $reservation->id,
                    'montant' => $reservation->montant_total,
                    'devise' => 'XAF',
                    'statut' => $j === 2 ? 'annule' : 'paye',
                    'fournisseur' => 'simulation',
                    'id_intention_fournisseur' => 'pay-intent-'.$reservation->id,
                    'paye_le' => $j === 2 ? null : now()->subHours(3),
                ]);

                if ($j !== 2) {
                    $paidPaymentIds->push($paiement->id);

                    Billet::query()->create([
                        'reservation_id' => $reservation->id,
                        'code_public' => Str::upper(Str::random(10)),
                        'payload_qr' => json_encode(['reservation_id' => $reservation->id], JSON_THROW_ON_ERROR),
                        'statut' => 'emis',
                        'emis_le' => now()->subHours(2),
                    ]);
                }
            }
        }

        foreach ($paidPaymentIds as $paymentId) {
            $payment = Paiement::query()->findOrFail($paymentId);
            $reservation = Reservation::query()->findOrFail($payment->reservation_id);
            $firstLine = LigneReservation::query()->where('reservation_id', $reservation->id)->firstOrFail();
            $creneau = Creneau::query()->findOrFail($firstLine->creneau_id);
            $activite = Activite::query()->findOrFail($creneau->activite_id);

            Commission::query()->create([
                'paiement_id' => $payment->id,
                'prestataire_id' => $activite->prestataire_id,
                'montant_plateforme' => round((float) $payment->montant * 0.125, 2),
                'montant_net_prestataire' => round((float) $payment->montant * 0.875, 2),
                'devise' => 'XAF',
            ]);
        }

        $avis = collect();
        foreach ($clients as $idx => $client) {
            $reservationClient = $reservations->firstWhere('user_id', $client->id);
            if (! $reservationClient) {
                continue;
            }

            $ligne = LigneReservation::query()->where('reservation_id', $reservationClient->id)->first();
            if (! $ligne) {
                continue;
            }

            $creneau = Creneau::query()->find($ligne->creneau_id);
            if (! $creneau) {
                continue;
            }

            $review = Avis::query()->create([
                'user_id' => $client->id,
                'activite_id' => $creneau->activite_id,
                'reservation_id' => $reservationClient->id,
                'note' => 4 + ($idx % 2),
                'commentaire' => "Avis demo du client {$idx}.",
                'statut' => $idx === 2 ? 'en_attente_moderation' : 'visible',
                'reponse_prestataire' => $idx === 0 ? 'Merci pour votre retour.' : null,
                'repondu_le' => $idx === 0 ? now()->subHour() : null,
            ]);
            $avis->push($review);
        }

        if ($avis->count() >= 2) {
            Favori::query()->create([
                'user_id' => $clients[0]->id,
                'activite_id' => $avis[1]->activite_id,
            ]);
            Favori::query()->create([
                'user_id' => $clients[1]->id,
                'activite_id' => $avis[0]->activite_id,
            ]);

            SignalementAvis::query()->create([
                'avis_id' => $avis[1]->id,
                'user_id' => $clients[0]->id,
                'motif' => 'contenu_inapproprie',
                'details' => 'Signalement demo pour moderation.',
                'statut' => 'en_attente',
            ]);
        }

        $reservationLitige = $reservations->first();
        if ($reservationLitige) {
            $ligne = LigneReservation::query()->where('reservation_id', $reservationLitige->id)->first();
            if ($ligne) {
                $creneau = Creneau::query()->find($ligne->creneau_id);
                if ($creneau) {
                    $activite = Activite::query()->find($creneau->activite_id);
                    if ($activite) {
                        $litige = Litige::query()->create([
                            'reservation_id' => $reservationLitige->id,
                            'client_id' => $reservationLitige->user_id,
                            'prestataire_id' => $activite->prestataire_id,
                            'admin_id' => $admin->id,
                            'sujet' => 'Horaire non respecte',
                            'description' => 'Le client indique un decalage important de programme.',
                            'statut' => 'en_cours',
                            'priorite' => 'normale',
                        ]);

                        MessageLitige::query()->create([
                            'litige_id' => $litige->id,
                            'auteur_id' => $reservationLitige->user_id,
                            'message' => 'Bonjour, je souhaite ouvrir un litige.',
                            'interne_admin' => false,
                        ]);
                        MessageLitige::query()->create([
                            'litige_id' => $litige->id,
                            'auteur_id' => $admin->id,
                            'message' => 'Prise en charge par le support.',
                            'interne_admin' => true,
                        ]);
                    }
                }
            }
        }

        $reservationRemboursement = $reservations->firstWhere('statut', 'payee');
        if ($reservationRemboursement) {
            $paiement = Paiement::query()->where('reservation_id', $reservationRemboursement->id)->first();
            if ($paiement) {
                Remboursement::query()->create([
                    'paiement_id' => $paiement->id,
                    'reservation_id' => $reservationRemboursement->id,
                    'demandeur_id' => $reservationRemboursement->user_id,
                    'montant' => (float) $paiement->montant / 2,
                    'statut' => 'demande',
                    'motif' => 'Empêchement de dernière minute',
                ]);
            }
        }

        $usersForNotifications = $clients->concat($prestataireUsers)->push($admin);
        foreach ($usersForNotifications as $user) {
            JournalNotification::query()->create([
                'user_id' => $user->id,
                'canal' => 'email',
                'cle_modele' => 'notification_demo',
                'payload' => ['message' => 'Notification de test seed.'],
                'statut' => 'envoye',
                'envoye_le' => now()->subMinutes(15),
            ]);
        }

        EvenementStatistique::query()->create([
            'type_evenement' => 'reservation_payee',
            'user_id' => $clients[0]->id,
            'session_id' => Str::uuid()->toString(),
            'activite_id' => $activites[0]->id,
            'ville_id' => $activites[0]->ville_id,
            'prestataire_id' => $activites[0]->prestataire_id,
            'reservation_id' => $reservations[0]->id,
            'campagne_publicitaire_id' => $campagnes[0]->id,
            'payload' => ['source' => 'seed_demo'],
            'occurred_at' => now()->subMinutes(30),
        ]);
    }
}
