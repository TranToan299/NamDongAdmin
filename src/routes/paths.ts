function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),

  app: {
    root: path(ROOTS_DASHBOARD, '/home'),
    product: {
      root: path(ROOTS_DASHBOARD, '/home/product'),
      product: path(ROOTS_DASHBOARD, '/home/product'),
      edit: (id: String) => path(ROOTS_DASHBOARD, `/home/product/${id}`),
      new: path(ROOTS_DASHBOARD, '/home/product/new'),
    },

    order: {
      root: path(ROOTS_DASHBOARD, '/home/order'),
      order: path(ROOTS_DASHBOARD, '/home/order'),
      new: path(ROOTS_DASHBOARD, '/home/order/new'),
      edit: (id: string) => path(ROOTS_DASHBOARD, `/home/order/edit/${id}`),
    },
    event: {
      root: path(ROOTS_DASHBOARD, '/home/event'),
      event: path(ROOTS_DASHBOARD, '/home/event'),
      new: path(ROOTS_DASHBOARD, '/home/event/new'),
      edit: (id: string) => path(ROOTS_DASHBOARD, `/home/event/edit/${id}`),
      order: path(ROOTS_DASHBOARD, '/home/order'),
    },
    projectImage: {
      root: path(ROOTS_DASHBOARD, '/home/project-image'),
      projectImage: path(ROOTS_DASHBOARD, '/home/project-image'),
    },
    webBanner: {
      root: path(ROOTS_DASHBOARD, '/home/web-banner'),
      webBanner: path(ROOTS_DASHBOARD, '/home/web-banner'),
    },
    pageImage: {
      root: path(ROOTS_DASHBOARD, '/home/page-image'),
      pageImage: path(ROOTS_DASHBOARD, '/home/page-image'),
    },
    editWebsite: {
      root: path(ROOTS_DASHBOARD, '/home/edit-website'),
      homePage: path(ROOTS_DASHBOARD, '/home/edit-website/home-page'),
      aboutUs: path(ROOTS_DASHBOARD, '/home/edit-website/about-us'),
      service: path(ROOTS_DASHBOARD, '/home/edit-website/service'),
      store: path(ROOTS_DASHBOARD, '/home/edit-website/store'),
      contact: path(ROOTS_DASHBOARD, '/home/edit-website/contact'),
      pageImage: path(ROOTS_DASHBOARD, '/home/edit-website/page-image'),
      webBanner: path(ROOTS_DASHBOARD, '/home/edit-website/web-banner'),
      projectImage: path(ROOTS_DASHBOARD, '/home/edit-website/project-image'),
    },
    contact: {
      root: path(ROOTS_DASHBOARD, '/home/contact'),
      contact: path(ROOTS_DASHBOARD, '/home/contact'),
      // new: path(ROOTS_DASHBOARD, '/home/event/new'),
      // edit: (id: string) => path(ROOTS_DASHBOARD, `/home/event/edit/${id}`),
      // order: path(ROOTS_DASHBOARD, '/home/order'),
    },
  },

  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
};

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
