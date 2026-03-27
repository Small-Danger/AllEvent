export const adminUsersSeed = [
  { id: 'U-1', name: 'Aline Moukouri', role: 'client', status: 'active' },
  { id: 'U-2', name: 'Brice Tchoua', role: 'prestataire', status: 'active' },
  { id: 'U-3', name: 'Nina Kotto', role: 'client', status: 'suspended' },
]

export const adminPrestatairesSeed = [
  { id: 'P-1', name: 'Savana Adventure', city: 'Douala', status: 'verified' },
  { id: 'P-2', name: 'Boat Club Kribi', city: 'Kribi', status: 'pending' },
]

export const adminActivitiesSeed = [
  { id: 'A-1', title: 'Quad Sunset', provider: 'Savana Adventure', status: 'published' },
  { id: 'A-2', title: 'Boat Party', provider: 'Boat Club Kribi', status: 'review' },
]

export const adminReviewsSeed = [
  { id: 'R-1', activity: 'Quad Sunset', score: 5, flagged: false },
  { id: 'R-2', activity: 'Boat Party', score: 2, flagged: true },
]

export const adminReportsSeed = [
  { id: 'RP-1', target: 'Avis R-2', reason: 'Langage inapproprie', status: 'open' },
  { id: 'RP-2', target: 'Activite A-2', reason: 'Infos trompeuses', status: 'resolved' },
]

export const adminAdsSeed = [
  { id: 'AD-1', owner: 'Savana Adventure', budget: 120000, status: 'active' },
  { id: 'AD-2', owner: 'Boat Club Kribi', budget: 80000, status: 'paused' },
]

export const adminCommissionsSeed = [
  { id: 'C-1', month: 'Jan 2026', amount: 98000 },
  { id: 'C-2', month: 'Fev 2026', amount: 112000 },
  { id: 'C-3', month: 'Mar 2026', amount: 124000 },
]

export const adminDisputesSeed = [
  { id: 'D-1', subject: 'Remboursement RSV-999', status: 'open' },
  { id: 'D-2', subject: 'Annulation tardive RSV-1002', status: 'pending' },
]

export const adminNotificationsSeed = [
  { id: 'N-1', message: 'Nouveau signalement recu', channel: 'email', enabled: true },
  { id: 'N-2', message: 'Pic d annulations detecte', channel: 'in-app', enabled: true },
]
