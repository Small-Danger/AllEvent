import { Navigate } from 'react-router-dom'
import { PublicLayout } from '../../layouts/PublicLayout'
import { UserLayout } from '../../layouts/UserLayout'
import { PrestataireLayout } from '../../layouts/PrestataireLayout'
import { AdminLayout } from '../../layouts/AdminLayout'
import {
  LandingPage,
  SearchPage,
  ActivityDetailsPage,
  BecomePrestatairePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  TermsPage,
  PrivacyPage,
  FaqPage,
} from '../../pages/public/PublicPages'
import {
  ClientDashboardPage,
  ClientReservationsPage,
  ClientFavoritesPage,
  ClientProfilePage,
  ClientReviewsPage,
  ClientMessagesPage,
  ClientPaymentsPage,
} from '../../pages/client/ClientPages'
import {
  PrestataireDashboardPage,
  PrestataireActivitiesPage,
  PrestataireAvailabilityPage,
  PrestataireReservationsPage,
  PrestataireReviewsPage,
  PrestataireAdsPage,
  PrestataireSettingsPage,
} from '../../pages/prestataire/PrestatairePages'
import {
  AdminLoginPage,
  AdminDashboardPage,
  AdminUsersPage,
  AdminPrestatairesPage,
  AdminActivitiesPage,
  AdminReviewsPage,
  AdminReportsPage,
  AdminAdsPage,
  AdminCommissionsPage,
  AdminDisputesPage,
  AdminStatisticsPage,
  AdminNotificationsPage,
} from '../../pages/admin/AdminPages'
import { RequireAuth, RequireRole } from './guards'

export const appRoutes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'activity/:id', element: <ActivityDetailsPage /> },
      { path: 'become-prestataire', element: <BecomePrestatairePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'faq', element: <FaqPage /> },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <RequireRole allowedRoles={['client']} />,
        children: [
          {
            element: <UserLayout />,
            children: [
              { path: 'dashboard', element: <ClientDashboardPage /> },
              { path: 'reservations', element: <ClientReservationsPage /> },
              { path: 'favorites', element: <ClientFavoritesPage /> },
              { path: 'profile', element: <ClientProfilePage /> },
              { path: 'reviews', element: <ClientReviewsPage /> },
              { path: 'messages', element: <ClientMessagesPage /> },
              { path: 'payments', element: <ClientPaymentsPage /> },
            ],
          },
        ],
      },
      {
        element: <RequireRole allowedRoles={['prestataire']} />,
        children: [
          {
            path: 'prestataire',
            element: <PrestataireLayout />,
            children: [
              { path: 'dashboard', element: <PrestataireDashboardPage /> },
              { path: 'activities', element: <PrestataireActivitiesPage /> },
              { path: 'availability', element: <PrestataireAvailabilityPage /> },
              { path: 'reservations', element: <PrestataireReservationsPage /> },
              { path: 'reviews', element: <PrestataireReviewsPage /> },
              {
                path: 'statistics',
                element: <Navigate to="/prestataire/dashboard?tab=analyses" replace />,
              },
              { path: 'ads', element: <PrestataireAdsPage /> },
              { path: 'settings', element: <PrestataireSettingsPage /> },
            ],
          },
        ],
      },
      {
        element: <RequireRole allowedRoles={['admin']} />,
        children: [
          {
            path: 'admin',
            element: <AdminLayout />,
            children: [
              { path: 'dashboard', element: <AdminDashboardPage /> },
              { path: 'users', element: <AdminUsersPage /> },
              { path: 'prestataires', element: <AdminPrestatairesPage /> },
              { path: 'activities', element: <AdminActivitiesPage /> },
              { path: 'reviews', element: <AdminReviewsPage /> },
              { path: 'reports', element: <AdminReportsPage /> },
              { path: 'ads', element: <AdminAdsPage /> },
              { path: 'commissions', element: <AdminCommissionsPage /> },
              { path: 'disputes', element: <AdminDisputesPage /> },
              { path: 'statistics', element: <AdminStatisticsPage /> },
              { path: 'notifications', element: <AdminNotificationsPage /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
