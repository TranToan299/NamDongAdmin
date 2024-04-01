import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from 'auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';

// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  AboutUs,
  BlankPage,
  ComingSoonPage,
  ContactListPage,
  ContactPage,
  CreateEventPage,
  CreateOrderPage,
  CreateProductPage,
  EditEventPage,
  EditOrderPage,
  EditProductPage,
  // Dashboard: Ecommerce
  EventListPage,
  // Dashboard: FileManager
  FileManagerPage,
  HomePage,
  LoginPage,
  MaintenancePage,
  NewPasswordPage,
  OrderListPage,
  Page403,
  Page404,
  //
  Page500,
  PageImagePage,
  PermissionDeniedPage,
  ProductListPage,
  ProjectImagePage,
  RegisterPage,
  ResetPasswordPage,
  ServicePage,
  StorePage,
  UserAccountPage,
  UserCardsPage,
  UserCreatePage,
  UserEditPage,
  // Dashboard: User
  UserListPage,
  UserProfilePage,
  VerifyCodePage,
  WebBannerPage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: (
        // <AuthGuard>
        // </AuthGuard>
        <DashboardLayout />
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'home',
          children: [
            { element: <Navigate to="/" replace />, index: true },
            {
              path: 'product',
              children: [
                {
                  path: '/dashboard/home/product',
                  element: <ProductListPage />,
                },
                {
                  path: '/dashboard/home/product/new',
                  element: <CreateProductPage />,
                },
                {
                  path: '/dashboard/home/product/:id',
                  element: <EditProductPage />,
                },
              ],
            },
            {
              path: 'edit-website',
              children: [
                {
                  path: '/dashboard/home/edit-website/home-page',
                  element: <HomePage />,
                },
                {
                  path: '/dashboard/home/edit-website/about-us',
                  element: <AboutUs />,
                },

                {
                  path: '/dashboard/home/edit-website/service',
                  element: <ServicePage />,
                },
                {
                  path: '/dashboard/home/edit-website/store',
                  element: <StorePage />,
                },
                {
                  path: '/dashboard/home/edit-website/contact',
                  element: <ContactPage />,
                },

                {
                  path: '/dashboard/home/edit-website/project-image',
                  element: <ProjectImagePage />,
                },
                {
                  path: '/dashboard/home/edit-website/page-image',
                  element: <PageImagePage />,
                },
                {
                  path: '/dashboard/home/edit-website/web-banner',
                  element: <WebBannerPage />,
                },
              ],
            },
            {
              path: 'order',
              children: [
                {
                  path: '/dashboard/home/order',
                  element: <OrderListPage />,
                },
                {
                  path: '/dashboard/home/order/new',
                  element: <CreateOrderPage />,
                },
                {
                  path: '/dashboard/home/order/edit/:id',
                  element: <EditOrderPage />,
                },
              ],
            },
            {
              path: 'event',
              children: [
                {
                  path: '/dashboard/home/event',
                  element: <EventListPage />,
                },
                {
                  path: '/dashboard/home/event/new',
                  element: <CreateEventPage />,
                },
                {
                  path: '/dashboard/home/event/edit/:id',
                  element: <EditEventPage />,
                },
              ],
            },

            {
              path: 'web-banner',
              children: [
                {
                  path: '/dashboard/home/web-banner',
                  element: <WebBannerPage />,
                },
              ],
            },

            {
              path: 'contact',
              children: [
                {
                  path: '/dashboard/home/contact',
                  element: <ContactListPage />,
                },
              ],
            },
          ],
        },

        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },

        { path: 'files-manager', element: <FileManagerPage /> },

        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
      ],
    },

    // Main Routes
    {
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [{ element: <ProductListPage />, index: true }],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
