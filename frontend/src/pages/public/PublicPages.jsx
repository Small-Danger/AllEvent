import { Link, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import logoAllevent from '../../assets/brand/logo-allevent.png'
import './public.css'

export function LandingPage() {
  const heroSlides = useMemo(
    () => [
      {
        id: 1,
        title: 'Le meilleur des experiences en un seul endroit',
        text: 'Concerts, loisirs, sorties famille et aventures locales selectionnes pour toi.',
        image:
          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80',
        cta: '/search',
        ctaLabel: 'Explorer maintenant',
      },
      {
        id: 2,
        title: 'Reserve en quelques clics',
        text: 'Parcours simple, activites verifiees et tarifs transparents.',
        image:
          'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=80',
        cta: '/register',
        ctaLabel: 'Creer un compte',
      },
      {
        id: 3,
        title: 'Passe pro avec ALL EVENT',
        text: 'Publie tes activites, gere tes reservations et fais grandir ton business.',
        image:
          'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
        cta: '/become-prestataire',
        ctaLabel: 'Devenir prestataire',
      },
    ],
    [],
  )
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [heroSlides.length])

  const featuredActivities = [
    {
      id: 1,
      title: 'Concert Electro en Plein Air',
      city: 'Douala',
      category: 'Musique',
      rating: 4.8,
      reviews: 134,
      price: 25000,
      image:
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 2,
      title: 'Atelier Cuisine Locale',
      city: 'Yaounde',
      category: 'Gastronomie',
      rating: 4.7,
      reviews: 92,
      price: 18000,
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 3,
      title: 'Randonnee Cascade',
      city: 'Bafoussam',
      category: 'Nature',
      rating: 4.9,
      reviews: 201,
      price: 22000,
      image:
        'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 4,
      title: 'Escape Game Urbain',
      city: 'Douala',
      category: 'Loisir',
      rating: 4.6,
      reviews: 77,
      price: 20000,
      image:
        'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 5,
      title: 'Tour Street Art',
      city: 'Yaounde',
      category: 'Culture',
      rating: 4.5,
      reviews: 58,
      price: 15000,
      image:
        'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 6,
      title: 'Sunset Boat Party',
      city: 'Kribi',
      category: 'Premium',
      rating: 4.9,
      reviews: 245,
      price: 35000,
      image:
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    },
  ]

  return (
    <main className="landing">
      <section className="hero-carousel">
        {heroSlides.map((slide, index) => (
          <article
            key={slide.id}
            className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} />
            <div className="hero-overlay" />
            <div className="hero-content">
              <p className="hero-kicker">ALL EVENT</p>
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              <div className="hero-buttons">
                <Link className="btn btn-primary" to={slide.cta}>
                  {slide.ctaLabel}
                </Link>
                <Link className="btn btn-light" to="/search">
                  Voir les activites
                </Link>
              </div>
            </div>
          </article>
        ))}
        <div className="hero-dots">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={index === activeSlide ? 'active' : ''}
              onClick={() => setActiveSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="landing-proof">
        <article>
          <strong>+12 000</strong>
          <p>reservations confirmees</p>
        </article>
        <article>
          <strong>4.8 / 5</strong>
          <p>satisfaction moyenne</p>
        </article>
        <article>
          <strong>+320</strong>
          <p>prestataires verifies</p>
        </article>
      </section>

      <section className="quick-actions">
        <div className="quick-actions-header">
          <h2>Trouve ton experience en quelques secondes</h2>
          <p>
            Recherche par ville, date, categorie et budget avec un parcours
            ultra rapide.
          </p>
        </div>
        <div className="quick-actions-bar">
          <input type="text" placeholder="Rechercher une activite..." />
          <input type="text" placeholder="Ville" />
          <input type="date" />
          <button className="btn btn-primary">Rechercher</button>
        </div>
      </section>

      <section className="activities-section">
        <div className="section-head">
          <h2>Activites a la une</h2>
          <Link to="/search">Voir tout le catalogue</Link>
        </div>
        <div className="activity-grid">
          {featuredActivities.map((item) => (
            <Link
              key={item.id}
              to={`/activity/${item.id}`}
              className="activity-cardLink"
            >
              <article className="activity-card">
                <div className="activity-media">
                  <img src={item.image} alt={item.title} />
                  <span className="activity-badge">{item.category}</span>
                </div>
                <div className="activity-content">
                  <h3>{item.title}</h3>
                  <p className="activity-meta">{item.city}</p>
                  <p className="activity-rating">
                    {item.rating} ({item.reviews} avis)
                  </p>
                  <div className="activity-footer">
                    <strong>{item.price.toLocaleString('fr-FR')} XAF</strong>
                    <span className="activity-details">Details</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="landing-steps">
        <h2>Comment ca marche ?</h2>
        <div className="landing-steps-grid">
          <article>
            <span>01</span>
            <h3>Explore</h3>
            <p>
              Parcours les experiences par categorie, ville, date, budget et
              note utilisateur.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Reserve</h3>
            <p>
              Compare les options, choisis ton creneau, puis confirme rapidement
              avec un parcours fluide.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Profite</h3>
            <p>
              Recois ta confirmation, retrouve les details pratiques et profite
              pleinement de ton activite.
            </p>
          </article>
          <article>
            <span>04</span>
            <h3>Evalue</h3>
            <p>
              Laisse ton avis pour aider la communaute et faire monter les
              meilleures experiences.
            </p>
          </article>
        </div>
      </section>

      <section className="become-pro">
        <div className="become-pro-content">
          <img src={logoAllevent} alt="ALL EVENT logo" />
          <div>
            <h2>Tu proposes des activites ? Rejoins ALL EVENT</h2>
            <p>
              Gagne en visibilite, automatise tes reservations et pilote ton
              activite avec des outils pro modernes.
            </p>
          </div>
        </div>
        <div className="become-pro-benefits">
          <article>
            <h3>Visibilite maximale</h3>
            <p>Touche des clients qualifies sur tout le territoire.</p>
          </article>
          <article>
            <h3>Gestion simplifiee</h3>
            <p>Disponibilites, reservations et suivi centralises.</p>
          </article>
          <article>
            <h3>Performance business</h3>
            <p>Tableaux de bord et insights pour booster tes ventes.</p>
          </article>
        </div>
        <div className="become-pro-actions">
          <Link className="btn btn-primary" to="/become-prestataire">
            Commencer maintenant
          </Link>
          <Link className="btn btn-light" to="/register">
            Creer mon compte
          </Link>
        </div>
      </section>

      <section className="trust-section">
        <article>
          <h3>Activites verifiees</h3>
          <p>Chaque annonce passe une verification avant mise en ligne.</p>
        </article>
        <article>
          <h3>Support rapide</h3>
          <p>Assistance disponible pour clients et prestataires.</p>
        </article>
        <article>
          <h3>Paiement securise</h3>
          <p>Flux de paiement trace et notifications transactionnelles.</p>
        </article>
      </section>
    </main>
  )
}

export function SearchPage() {
  const activities = [
    {
      id: 1,
      title: 'Concert Electro en Plein Air',
      city: 'Douala',
      category: 'Musique',
      rating: 4.8,
      reviews: 134,
      price: 25000,
      image:
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 2,
      title: 'Atelier Cuisine Locale',
      city: 'Yaounde',
      category: 'Gastronomie',
      rating: 4.7,
      reviews: 92,
      price: 18000,
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 3,
      title: 'Randonnee Cascade',
      city: 'Bafoussam',
      category: 'Nature',
      rating: 4.9,
      reviews: 201,
      price: 22000,
      image:
        'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 4,
      title: 'Escape Game Urbain',
      city: 'Douala',
      category: 'Loisir',
      rating: 4.6,
      reviews: 77,
      price: 20000,
      image:
        'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 5,
      title: 'Tour Street Art',
      city: 'Yaounde',
      category: 'Culture',
      rating: 4.5,
      reviews: 58,
      price: 15000,
      image:
        'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 6,
      title: 'Sunset Boat Party',
      city: 'Kribi',
      category: 'Premium',
      rating: 4.9,
      reviews: 245,
      price: 35000,
      image:
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 7,
      title: 'Croisiere Lagune',
      city: 'Kribi',
      category: 'Nature',
      rating: 4.6,
      reviews: 64,
      price: 27000,
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 8,
      title: 'Soiree Salsa Live',
      city: 'Douala',
      category: 'Musique',
      rating: 4.4,
      reviews: 88,
      price: 12000,
      image:
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80',
    },
  ]

  const [search, setSearch] = useState('')
  const [city, setCity] = useState('all')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [date, setDate] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(50000)
  const [minRating, setMinRating] = useState(0)

  const cities = useMemo(
    () => ['all', ...new Set(activities.map((item) => item.city))],
    [activities],
  )

  const categories = useMemo(
    () => ['all', ...new Set(activities.map((item) => item.category))],
    [activities],
  )

  const filteredActivities = useMemo(() => {
    const q = search.trim().toLowerCase()

    let result = activities.filter((item) => {
      const matchQuery =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      const matchCity = city === 'all' || item.city === city
      const matchCategory = category === 'all' || item.category === category
      const matchPrice = item.price >= minPrice && item.price <= maxPrice
      const matchRating = item.rating >= minRating

      return matchQuery && matchCity && matchCategory && matchPrice && matchRating
    })

    if (sortBy === 'price_asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price_desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    } else {
      result = [...result].sort((a, b) => b.reviews - a.reviews)
    }

    return result
  }, [activities, category, city, maxPrice, minPrice, minRating, search, sortBy])

  const resetFilters = () => {
    setSearch('')
    setCity('all')
    setCategory('all')
    setSortBy('popular')
    setDate('')
    setMinPrice(0)
    setMaxPrice(50000)
    setMinRating(0)
  }

  return (
    <main className="catalog-page">
      <section className="catalog-head">
        <h1>Explorer les activites</h1>
        <p>
          Filtre par ville, categorie ou budget pour trouver rapidement
          l&apos;experience qui te correspond.
        </p>
      </section>

      <section className="catalog-filters">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Rechercher une activite..."
          aria-label="Rechercher une activite"
        />
        <select value={city} onChange={(event) => setCity(event.target.value)}>
          {cities.map((value) => (
            <option key={value} value={value}>
              {value === 'all' ? 'Toutes les villes' : value}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((value) => (
            <option key={value} value={value}>
              {value === 'all' ? 'Toutes les categories' : value}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Trier les activites"
        >
          <option value="popular">Plus populaires</option>
          <option value="rating">Meilleure note</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix decroissant</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          aria-label="Date souhaitee"
        />
        <div className="catalog-range">
          <label htmlFor="minPrice">Prix min: {minPrice.toLocaleString('fr-FR')} XAF</label>
          <input
            id="minPrice"
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={minPrice}
            onChange={(event) => setMinPrice(Number(event.target.value))}
          />
        </div>
        <div className="catalog-range">
          <label htmlFor="maxPrice">Prix max: {maxPrice.toLocaleString('fr-FR')} XAF</label>
          <input
            id="maxPrice"
            type="range"
            min="5000"
            max="70000"
            step="1000"
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
          />
        </div>
        <div className="catalog-range">
          <label htmlFor="minRating">Note min: {minRating.toFixed(1)}</label>
          <input
            id="minRating"
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={minRating}
            onChange={(event) => setMinRating(Number(event.target.value))}
          />
        </div>
        <button type="button" className="btn btn-light catalog-reset" onClick={resetFilters}>
          Reinitialiser les filtres
        </button>
      </section>

      <section className="catalog-results">
        <p className="catalog-count">
          {filteredActivities.length} activite
          {filteredActivities.length > 1 ? 's' : ''} trouvee
          {filteredActivities.length > 1 ? 's' : ''}
        </p>

        <div className="catalog-grid">
          {filteredActivities.map((item) => (
            <Link
              key={item.id}
              to={`/activity/${item.id}`}
              className="catalog-cardLink"
            >
              <article className="catalog-card">
                <div className="catalog-media">
                  <img src={item.image} alt={item.title} />
                  <span className="catalog-badge">{item.category}</span>
                </div>
                <div className="catalog-content">
                  <h3>{item.title}</h3>
                  <p>{item.city}</p>
                  <p>
                    {item.rating} ({item.reviews} avis)
                  </p>
                  <div className="catalog-footer">
                    <strong>{item.price.toLocaleString('fr-FR')} XAF</strong>
                    <span>Details</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export function ActivityDetailsPage() {
  const { id } = useParams()

  const activities = [
    {
      id: 1,
      title: 'Concert Electro en Plein Air',
      city: 'Douala',
      category: 'Musique',
      rating: 4.8,
      reviews: 134,
      price: 25000,
      image:
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80',
      description:
        'Une experience musicale immersive avec DJ internationaux, ambiance open air et espaces chill.',
    },
    {
      id: 2,
      title: 'Atelier Cuisine Locale',
      city: 'Yaounde',
      category: 'Gastronomie',
      rating: 4.7,
      reviews: 92,
      price: 18000,
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      description:
        'Apprends les recettes locales avec un chef, puis deguste les plats prepares en groupe.',
    },
    {
      id: 3,
      title: 'Randonnee Cascade',
      city: 'Bafoussam',
      category: 'Nature',
      rating: 4.9,
      reviews: 201,
      price: 22000,
      image:
        'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80',
      description:
        'Parcours guide en montagne avec points panoramiques, collation incluse et photos souvenir.',
    },
  ]

  const activity = activities.find((item) => String(item.id) === String(id))

  if (!activity) {
    return (
      <main className="simple-page">
        <section className="simple-card">
          <h1>Activite introuvable</h1>
          <p>Cette activite n&apos;existe pas ou a ete retiree du catalogue.</p>
          <Link to="/search" className="btn btn-primary">
            Retour au catalogue
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="activity-page">
      <section className="activity-hero">
        <img src={activity.image} alt={activity.title} />
        <span>{activity.category}</span>
      </section>

      <section className="activity-main">
        <div className="activity-summary">
          <h1>{activity.title}</h1>
          <p className="activity-location">{activity.city}</p>
          <p className="activity-score">
            {activity.rating} ({activity.reviews} avis)
          </p>
          <p className="activity-description">{activity.description}</p>
        </div>

        <aside className="activity-booking">
          <strong>{activity.price.toLocaleString('fr-FR')} XAF</strong>
          <p>Par personne - confirmation immediate</p>
          <button className="btn btn-primary">Reserver maintenant</button>
          <Link className="btn btn-light" to="/register">
            Creer un compte pour continuer
          </Link>
        </aside>
      </section>
    </main>
  )
}

export function BecomePrestatairePage() {
  return (
    <main className="become-page">
      <section className="become-hero">
        <div className="become-pro-content">
          <img src={logoAllevent} alt="ALL EVENT logo" />
          <div>
            <h1>Devenir prestataire sur ALL EVENT</h1>
            <p>
              Publie tes activites, recois des reservations et suis tes
              performances depuis ton espace pro.
            </p>
          </div>
        </div>
        <div className="become-pro-actions">
          <Link className="btn btn-primary" to="/register">
            Creer mon espace pro
          </Link>
          <Link className="btn btn-light" to="/login">
            J ai deja un compte
          </Link>
        </div>
      </section>
      <section className="become-highlights">
        <article>
          <h3>Audience qualifiee</h3>
          <p>Expose tes experiences a des utilisateurs prets a reserver.</p>
        </article>
        <article>
          <h3>Commission transparente</h3>
          <p>Modele clair, sans surprise, adapte aux prestataires locaux.</p>
        </article>
        <article>
          <h3>Accompagnement dedie</h3>
          <p>Support operationnel pour lancer et scaler ton activite.</p>
        </article>
      </section>
      <section className="become-process">
        <h2>Ton onboarding en 3 etapes</h2>
        <div className="become-process-grid">
          <article>
            <span>1</span>
            <h3>Creer ton profil</h3>
            <p>Renseigne ton activite, ton equipe et tes zones d&apos;intervention.</p>
          </article>
          <article>
            <span>2</span>
            <h3>Publier tes offres</h3>
            <p>Ajoute photos, disponibilites, tarifs et options de reservation.</p>
          </article>
          <article>
            <span>3</span>
            <h3>Vendre et optimiser</h3>
            <p>Analyse tes performances et augmente ta conversion.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export function LoginPage() {
  const visualImage =
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80'

  return (
    <main className="auth-page">
      <section className="auth-split">
        <div className="auth-card">
          <h1>Connexion</h1>
          <p>Connecte-toi pour gerer tes reservations et favoris.</p>
          <form className="auth-form">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mot de passe" />
            <button className="btn btn-primary" type="button">
              Se connecter
            </button>
          </form>
          <div className="auth-links">
            <Link to="/forgot-password">Mot de passe oublie ?</Link>
            <Link to="/register">Creer un compte</Link>
          </div>
        </div>
        <aside className="auth-visual">
          <img src={visualImage} alt="ALL EVENT experience" />
          <div className="auth-visual-overlay" />
          <div className="auth-visual-content">
            <img src={logoAllevent} alt="ALL EVENT logo" />
            <h2>Bienvenue sur ALL EVENT</h2>
            <p>Retrouve tes activites preferees et reserve en toute fluidite.</p>
          </div>
        </aside>
      </section>
    </main>
  )
}

export function RegisterPage() {
  const visualImage =
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'

  return (
    <main className="auth-page">
      <section className="auth-split">
        <div className="auth-card">
          <h1>Inscription</h1>
          <p>Rejoins ALL EVENT pour reserver et suivre tes activites.</p>
          <form className="auth-form">
            <input type="text" placeholder="Nom complet" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mot de passe" />
            <button className="btn btn-primary" type="button">
              Creer mon compte
            </button>
          </form>
          <div className="auth-links">
            <Link to="/login">J&apos;ai deja un compte</Link>
          </div>
        </div>
        <aside className="auth-visual">
          <img src={visualImage} alt="ALL EVENT prestataire" />
          <div className="auth-visual-overlay" />
          <div className="auth-visual-content">
            <img src={logoAllevent} alt="ALL EVENT logo" />
            <h2>Commence ton aventure</h2>
            <p>Cree ton compte et accede aux meilleures experiences locales.</p>
          </div>
        </aside>
      </section>
    </main>
  )
}

export function ForgotPasswordPage() {
  const visualImage =
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80'

  return (
    <main className="auth-page">
      <section className="auth-split">
        <div className="auth-card">
          <h1>Recuperation du mot de passe</h1>
          <p>
            Entre ton email et nous t&apos;enverrons un lien de reinitialisation.
          </p>
          <form className="auth-form">
            <input type="email" placeholder="Email" />
            <button className="btn btn-primary" type="button">
              Envoyer le lien
            </button>
          </form>
          <div className="auth-links">
            <Link to="/login">Retour a la connexion</Link>
          </div>
        </div>
        <aside className="auth-visual">
          <img src={visualImage} alt="ALL EVENT support" />
          <div className="auth-visual-overlay" />
          <div className="auth-visual-content">
            <img src={logoAllevent} alt="ALL EVENT logo" />
            <h2>Acces securise</h2>
            <p>On t&apos;accompagne pour recuperer ton acces rapidement.</p>
          </div>
        </aside>
      </section>
    </main>
  )
}

export function TermsPage() {
  return (
    <main className="legal-page">
      <section className="legal-card">
        <h1>Conditions d&apos;utilisation</h1>
        <div className="legal-sections">
          <article>
            <h3>1. Objet du service</h3>
            <p>
              ALL EVENT met en relation clients et prestataires pour la
              reservation d&apos;activites de divertissement.
            </p>
          </article>
          <article>
            <h3>2. Conditions de reservation</h3>
            <p>
              Chaque activite est soumise a des regles de disponibilite, prix,
              annulation et remboursement affichees avant paiement.
            </p>
          </article>
          <article>
            <h3>3. Responsabilites</h3>
            <p>
              Le prestataire reste responsable de l&apos;execution de l&apos;activite.
              La plateforme facilite la transaction et la mediation.
            </p>
          </article>
          <article>
            <h3>4. Moderation et litiges</h3>
            <p>
              En cas de conflit, un processus de traitement est prevu avec
              collecte des preuves et arbitrage interne.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export function PrivacyPage() {
  return (
    <main className="legal-page">
      <section className="legal-card">
        <h1>Politique de confidentialite</h1>
        <div className="legal-sections">
          <article>
            <h3>Donnees collectees</h3>
            <p>
              Nom, email, donnees de reservation et journaux techniques utiles a
              la securite et a la qualite du service.
            </p>
          </article>
          <article>
            <h3>Usage des donnees</h3>
            <p>
              Les informations servent a authentifier, traiter les commandes,
              envoyer les notifications et ameliorer l&apos;experience.
            </p>
          </article>
          <article>
            <h3>Protection</h3>
            <p>
              Les acces sont controles, les flux sensibles journalises et les
              operations critiques monitorees.
            </p>
          </article>
          <article>
            <h3>Vos droits</h3>
            <p>
              Vous pouvez demander l&apos;acces, la rectification ou la suppression
              de vos donnees conformement aux regles applicables.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export function FaqPage() {
  const faqItems = [
    {
      q: 'Comment reserver une activite ?',
      a: 'Choisis une activite, verifie les details, selectionne ton creneau puis confirme ta reservation.',
    },
    {
      q: 'Comment filtrer comme un site e-commerce ?',
      a: 'Utilise la recherche, la ville, la categorie, la note minimale et la plage de prix pour affiner rapidement.',
    },
    {
      q: 'Comment devenir prestataire ?',
      a: 'Depuis la page dediee, cree ton compte, complete ton profil et publie tes activites.',
    },
    {
      q: 'Puis-je annuler une reservation ?',
      a: 'Oui, selon les conditions d annulation affichees sur l activite au moment de la commande.',
    },
    {
      q: 'Le paiement est-il securise ?',
      a: 'Les paiements suivent un flux trace avec verification de statut et notifications systeme.',
    },
  ]

  return (
    <main className="legal-page">
      <section className="legal-card">
        <h1>FAQ</h1>
        <div className="faq-list">
          {faqItems.map((item) => (
            <article key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
