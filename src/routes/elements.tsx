import { ElementType, Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// DASHBOARD NAM DONG
// Product
export const CreateProductPage = Loadable(lazy(() => import('../pages/dashboard/product/create')));
export const ProductListPage = Loadable(lazy(() => import('../pages/dashboard/product/index')));
export const EditProductPage = Loadable(lazy(() => import('../pages/dashboard/product/edit')));

// Order
export const OrderListPage = Loadable(lazy(() => import('../pages/dashboard/order/index')));
export const CreateOrderPage = Loadable(lazy(() => import('../pages/dashboard/order/create')));
export const EditOrderPage = Loadable(lazy(() => import('../pages/dashboard/order/edit')));

// Event
export const EventListPage = Loadable(lazy(() => import('../pages/dashboard/event/index')));
export const CreateEventPage = Loadable(lazy(() => import('../pages/dashboard/event/create')));
export const EditEventPage = Loadable(lazy(() => import('../pages/dashboard/event/edit')));

// Project Image
export const ProjectImagePage = Loadable(
  lazy(() => import('../pages/dashboard/project-image/index'))
);
export const PageImagePage = Loadable(lazy(() => import('../pages/dashboard/page-image/index')));
export const WebBannerPage = Loadable(lazy(() => import('../pages/dashboard/web-banner/index')));

// Edit Image Webiste
export const HomePage = Loadable(lazy(() => import('../pages/dashboard/edit-website/home/Home')));
export const AboutUsPage = Loadable(
  lazy(() => import('../pages/dashboard/edit-website/about-us/AboutUs'))
);
export const ServicePage = Loadable(
  lazy(() => import('../pages/dashboard/edit-website/service/Service'))
);
export const StorePage = Loadable(
  lazy(() => import('../pages/dashboard/edit-website/store/Store'))
);
export const ContactPage = Loadable(
  lazy(() => import('../pages/dashboard/edit-website/contact/Contact'))
);
// Contact
export const ContactListPage = Loadable(lazy(() => import('../pages/dashboard/contact/index')));

// DASHBOARD: USER
export const UserProfilePage = Loadable(lazy(() => import('../pages/dashboard/UserProfilePage')));
export const UserCardsPage = Loadable(lazy(() => import('../pages/dashboard/UserCardsPage')));
export const UserListPage = Loadable(lazy(() => import('../pages/dashboard/UserListPage')));
export const UserAccountPage = Loadable(lazy(() => import('../pages/dashboard/UserAccountPage')));
export const UserCreatePage = Loadable(lazy(() => import('../pages/dashboard/UserCreatePage')));
export const UserEditPage = Loadable(lazy(() => import('../pages/dashboard/UserEditPage')));

// Edit website
export const AboutUs = Loadable(
  lazy(() => import('../pages/dashboard/edit-website/about-us/AboutUs'))
);
// DASHBOARD: FILE MANAGER
export const FileManagerPage = Loadable(lazy(() => import('../pages/dashboard/FileManagerPage')));

// TEST RENDER PAGE BY ROLE
export const PermissionDeniedPage = Loadable(
  lazy(() => import('../pages/dashboard/PermissionDeniedPage'))
);

// BLANK PAGE
export const BlankPage = Loadable(lazy(() => import('../pages/dashboard/BlankPage')));

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));
