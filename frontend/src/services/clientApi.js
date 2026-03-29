const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'
const TOKEN_STORAGE_KEY = 'allevent_auth_token'

function getAuthHeaders() {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload?.message || 'Erreur API client.')
  }
  return payload
}

function asList(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

function statusToUi(status, dateString) {
  if (status === 'annulee' || status === 'remboursee') return 'cancelled'
  if (status === 'payee' || status === 'confirmee') {
    if (!dateString) return 'upcoming'
    return new Date(dateString) < new Date() ? 'done' : 'upcoming'
  }
  return 'upcoming'
}

export function mapReservationToUi(reservation) {
  const line = reservation?.lignes?.[0]
  const creneau = line?.creneau
  const activite = creneau?.activite
  const dateTime = creneau?.debut_at || reservation?.created_at
  const date = dateTime ? new Date(dateTime).toISOString().slice(0, 10) : '-'
  const hour = dateTime ? new Date(dateTime).toISOString().slice(11, 16) : '--:--'
  const amount = Number(reservation?.paiement?.montant || 0)

  return {
    id: reservation.id,
    activityId: activite?.id,
    title: activite?.titre || `Reservation #${reservation.id}`,
    city: activite?.ville?.nom || '-',
    date,
    hour,
    guests: Number(line?.quantite || 1),
    amount,
    status: statusToUi(reservation?.statut, dateTime),
    backendStatus: reservation?.statut,
  }
}

export function mapFavoriteToUi(favori) {
  const activite = favori?.activite || {}
  return {
    id: activite.id,
    title: activite.titre || 'Activite',
    city: activite?.ville?.nom || '-',
    category: activite?.categorie?.nom || 'Activite',
    price: Number(activite?.prix_base || 0),
    rating: Number(activite?.note_moyenne || 0),
    image:
      activite?.medias?.[0]?.url ||
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  }
}

export const clientApi = {
  async getDashboardData() {
    const [profilePayload, reservationsPayload, favoritesPayload] = await Promise.all([
      request('/client/profil'),
      request('/client/reservations'),
      request('/client/favoris'),
    ])

    const reservations = asList(reservationsPayload).map(mapReservationToUi)
    const favorites = asList(favoritesPayload).map(mapFavoriteToUi)
    const profile = profilePayload?.profil || {}

    return { profile, reservations, favorites }
  },

  async getReservations() {
    const payload = await request('/client/reservations')
    return asList(payload).map(mapReservationToUi)
  },

  async cancelReservation(reservationId) {
    await request(`/client/reservations/${reservationId}/annuler`, { method: 'PATCH' })
  },

  async getFavorites() {
    const payload = await request('/client/favoris')
    return asList(payload).map(mapFavoriteToUi)
  },

  async removeFavorite(activityId) {
    await request(`/client/favoris/${activityId}`, { method: 'DELETE' })
  },

  async getProfile() {
    const payload = await request('/client/profil')
    const profil = payload?.profil || {}
    const user = payload?.user || {}
    return {
      firstName: profil?.prenom || '',
      lastName: profil?.nom || '',
      email: user?.email || '',
      phone: profil?.telephone || '',
      city: profil?.ville || '',
      birthday: profil?.date_naissance || '',
      avatar: profil?.avatar || '',
      memberSince: user?.created_at ? user.created_at.slice(0, 4) : '',
      name: user?.name || '',
    }
  },

  async updateProfile(form) {
    const fullName = `${form.firstName || ''} ${form.lastName || ''}`.trim()
    await request('/client/profil', {
      method: 'PATCH',
      body: JSON.stringify({
        name: fullName || undefined,
        email: form.email || undefined,
        prenom: form.firstName || undefined,
        nom: form.lastName || undefined,
        telephone: form.phone || undefined,
      }),
    })
  },

  async getReviews() {
    const payload = await request('/client/avis')
    return asList(payload).map((item) => ({
      id: item.id,
      reservationId: item.reservation_id || item?.reservation?.id,
      activity: item?.activite?.titre || 'Activite',
      score: Number(item?.note || 0),
      date: item?.created_at?.slice(0, 10) || '-',
      text: item?.commentaire || '',
      activityId: item?.activite_id || item?.activite?.id,
    }))
  },

  async createReview({ reservationId, activityId, score, text }) {
    await request('/client/avis', {
      method: 'POST',
      body: JSON.stringify({
        reservation_id: Number(reservationId),
        activite_id: Number(activityId),
        note: Number(score),
        commentaire: text,
      }),
    })
  },

  async updateReview(reviewId, { score, text }) {
    await request(`/client/avis/${reviewId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        note: Number(score),
        commentaire: text,
      }),
    })
  },

  async deleteReview(reviewId) {
    await request(`/client/avis/${reviewId}`, { method: 'DELETE' })
  },

  async getLitiges() {
    const payload = await request('/client/litiges')
    return asList(payload)
  },

  async getLitigeDetail(litigeId) {
    return request(`/client/litiges/${litigeId}`)
  },

  async sendLitigeMessage(litigeId, message) {
    await request(`/client/litiges/${litigeId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    })
  },

  async getNotifications() {
    const payload = await request('/client/notifications')
    return asList(payload)
  },
}
