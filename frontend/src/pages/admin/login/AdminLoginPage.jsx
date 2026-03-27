import { Link } from 'react-router-dom'
import './AdminLoginPage.css'

export function AdminLoginPage() {
  return (
    <section className="admin-login-page">
      <article className="admin-login-card">
        <h1>Connexion administrateur</h1>
        <p>Acces reserve a l equipe de moderation et operations.</p>
        <label>Email<input type="email" placeholder="admin@allevent.local" /></label>
        <label>Mot de passe<input type="password" placeholder="********" /></label>
        <button type="button">Se connecter</button>
        <Link to="/admin/dashboard?demo=1">Entrer en mode demo</Link>
      </article>
    </section>
  )
}
