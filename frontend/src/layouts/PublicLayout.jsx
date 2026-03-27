import { Link, Outlet } from 'react-router-dom'
import logoAllevent from '../assets/brand/logo-allevent.png'
import './public-layout.css'

export function PublicLayout() {
  return (
    <div className="public-shell">
      <header className="public-header">
        <Link to="/" className="brand-link">
          <img src={logoAllevent} alt="ALL EVENT" />
          ALL EVENT
        </Link>

        <nav className="public-nav">
          <Link to="/search">Recherche</Link>
          <Link to="/become-prestataire">Devenir prestataire</Link>
          <Link to="/faq">FAQ</Link>
        </nav>

        <div className="header-actions">
          <Link className="header-btn secondary" to="/login">
            Connexion
          </Link>
          <Link className="header-btn primary" to="/register">
            Reserver maintenant
          </Link>
        </div>
      </header>

      <div className="public-content">
        <Outlet />
      </div>

      <nav className="mobile-tabbar" aria-label="Navigation mobile principale">
        <Link to="/">Accueil</Link>
        <Link to="/search">Explorer</Link>
        <Link to="/reservations">Reservations</Link>
        <Link to="/profile">Profil</Link>
      </nav>

      <footer className="public-footer">
        <div className="public-footer-grid">
          <section>
            <h4>ALL EVENT</h4>
            <p>
              La plateforme moderne pour trouver, reserver et vivre les
              meilleures experiences locales.
            </p>
          </section>
          <section>
            <h4>Produit</h4>
            <div className="footer-links">
              <Link to="/search">Explorer</Link>
              <Link to="/become-prestataire">Espace prestataire</Link>
              <Link to="/login">Connexion</Link>
            </div>
          </section>
          <section>
            <h4>Entreprise</h4>
            <div className="footer-links">
              <Link to="/terms">Conditions</Link>
              <Link to="/privacy">Confidentialite</Link>
              <Link to="/faq">Support</Link>
            </div>
          </section>
          <section>
            <h4>Contact</h4>
            <div className="footer-links">
              <a href="mailto:support@allevent.local">support@allevent.local</a>
              <a href="tel:+237600000000">+237 600 00 00 00</a>
              <a href="#">Douala, Cameroun</a>
            </div>
          </section>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} ALL EVENT - Tous droits reserves.
        </div>
      </footer>
    </div>
  )
}
