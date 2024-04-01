import i18next from 'i18next';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: i18next.t('systemManagement'),

    items: [
      {
        title: i18next.t('home'),
        path: PATH_DASHBOARD.app.root,
        icon: ICONS.label,
        children: [
          {
            title: i18next.t('product'),
            path: PATH_DASHBOARD.app.product.product,
          },
          {
            title: i18next.t('order'),
            path: PATH_DASHBOARD.app.order.order,
          },
          {
            title: i18next.t('event'),
            path: PATH_DASHBOARD.app.event.event,
          },
          {
            title: i18next.t('editImage'),
            path: PATH_DASHBOARD.app.pageImage.pageImage,
            children: [
              {
                title: i18next.t('home'),
                path: PATH_DASHBOARD.app.editWebsite.homePage,
              },
              {
                title: i18next.t('aboutUs'),
                path: PATH_DASHBOARD.app.editWebsite.aboutUs,
              },
              {
                title: i18next.t('service'),
                path: PATH_DASHBOARD.app.editWebsite.service,
              },
              {
                title: i18next.t('store'),
                path: PATH_DASHBOARD.app.editWebsite.store,
              },
              {
                title: i18next.t('contact'),
                path: PATH_DASHBOARD.app.editWebsite.contact,
              },
              {
                title: i18next.t('webBanner'),
                path: PATH_DASHBOARD.app.editWebsite.webBanner,
              },
              {
                title: i18next.t('projectImage'),
                path: PATH_DASHBOARD.app.editWebsite.projectImage,
              },
            ],
          },
          {
            title: i18next.t('contact'),
            path: PATH_DASHBOARD.app.contact.contact,
          },
        ],
      },
    ],
  },
];

export default navConfig;
