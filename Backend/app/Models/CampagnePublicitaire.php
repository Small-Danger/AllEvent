<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Campagne publicitaire de mise en avant.
 * Cible une zone/categorie/activite selon les besoins business.
 */
class CampagnePublicitaire extends Model
{
    protected $table = 'campagnes_publicitaires';

    protected $fillable = [
        'prestataire_id',
        'titre',
        'emplacement',
        'ville_id',
        'categorie_id',
        'activite_id',
        'debut_at',
        'fin_at',
        'priorite',
        'budget_montant',
        'statut',
    ];

    protected function casts(): array
    {
        return [
            'debut_at' => 'datetime',
            'fin_at' => 'datetime',
            'budget_montant' => 'decimal:2',
        ];
    }

    public function prestataire(): BelongsTo
    {
        return $this->belongsTo(Prestataire::class);
    }

    public function ville(): BelongsTo
    {
        return $this->belongsTo(Ville::class);
    }

    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class);
    }

    public function activite(): BelongsTo
    {
        return $this->belongsTo(Activite::class);
    }

    public function paiements(): HasMany
    {
        return $this->hasMany(PaiementPublicite::class, 'campagne_publicitaire_id');
    }

    public function evenementsStatistiques(): HasMany
    {
        return $this->hasMany(EvenementStatistique::class);
    }
}
