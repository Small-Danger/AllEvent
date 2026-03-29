const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'
const TOKEN_STORAGE_KEY = 'allevent_auth_token'

function getHeaders() {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

function errorMessageFromPayload(payload) {
  if (payload == null || typeof payload !== 'object') return null
  if (typeof payload.message === 'string' && payload.message.trim()) {
    return payload.message.trim()
  }
  const errs = payload.errors
  if (errs && typeof errs === 'object') {
    for (const key of Object.keys(errs)) {
      const arr = errs[key]
      if (Array.isArray(arr) && arr.length && typeof arr[0] === 'string') {
        return arr[0]
      }
    }
  }
  return null
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {}),
    },
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(errorMessageFromPayload(payload) || 'Erreur API administrateur.')
  }
  return payload
}

export const adminApi = {
  /** GET /admin/statistiques/dashboard — agrégats SQL (users, litiges, réservations, CA, etc.). */
  async getDashboardStats() {
    return request('/admin/statistiques/dashboard')
  },

  async downloadStatsExport(filename = 'rapport-admin-allevent.csv') {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)
    const response = await fetch(`${API_BASE_URL}/admin/statistiques/export`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}))
      throw new Error(errorMessageFromPayload(payload) || 'Export indisponible.')
    }
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  },
}
