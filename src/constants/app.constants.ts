import i18next from 'i18next';
import { TypeDefault } from '../@types/projectImage';

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  LOCALE: 'i18nextLng',
  ADMIN_TOKEN: 'admin-token',
};

export const TYPE_NOTICE = {
  basicType: 'basic',
  contactType: 'contact',
  profileType: 'profile',
  insuranceType: 'insurance',
  bankType: 'bank',
  taxType: 'tax',
  contractType: 'contract',
};

export const DEFAULT_PAGINATION = {
  PAGE_INDEX: 1,
  PAGE_SIZE: 10,
  PAGE_ONE: 1,
};

export const GETALL_PROVINCE = {
  PAGE_INDEX: 1,
  PAGE_SIZE: 100,
};

export const GETALL_DISTRICT = {
  PAGE_INDEX: 1,
  PAGE_SIZE: 1000,
};

export const EMPLOYEE_GENERAL_STATUS = {
  CONTRACT: {
    probationary: {
      label: i18next.t('probationaryPeriod'),
      value: 'probationary',
    },
    firstLaborContract: {
      label: i18next.t('isFirstLaborContract'),
      value: 'firstLaborContract',
    },
    secondLaborContract: {
      label: i18next.t('isSecondLaborContract'),
      value: 'secondLaborContract',
    },
    infinite: {
      label: i18next.t('isInfinite'),
      value: 'infinite',
    },
    service: {
      label: i18next.t('isService'),
      value: 'service',
    },
    training: {
      label: i18next.t('isTraining'),
      value: 'training',
    },
  },
  INCOMPLETE: {
    contact: {
      label: i18next.t('contactInfo'),
      value: 'contact',
    },
    bank: {
      label: i18next.t('bankingInfo'),
      value: 'bank',
    },
    insurance: {
      label: i18next.t('insuranceInformation'),
      value: 'insurance',
    },
    tax: {
      label: i18next.t('incomeTaxInformation'),
      value: 'tax',
    },
    profile: {
      label: i18next.t('profileInformation'),
      value: 'profile',
    },
  },
};
export const OBJECT_TYPE = {
  source: {
    internalSource: 'internalSource',
    externalSource: 'externalSource,',
  },
  experience: {
    saleExperience: 'saleExperience',
    office: 'office',
    market: 'market',
    warehouseAndDelivery: 'warehouseAndDelivery',
  },
  tax: {
    contractStatus: 'contractStatus',
  },
  insurance: {
    insuranceStatus: 'insuranceStatus',
  },
  bank: {
    bankStatus: 'bankStatus',
  },
};

export const SOURCE_OPTIONS = [
  {
    label: i18next.t('internalSource'),
    value: 'internalSource',
  },
  {
    label: i18next.t('externalSource'),
    value: 'externalSource',
  },
];

export const EXPERIENCE_OPTIONS = [
  {
    label: i18next.t('saleExperience'),
    value: 'saleExperience',
  },
  {
    label: i18next.t('office'),
    value: 'office',
  },
  {
    label: i18next.t('market'),
    value: 'market',
  },
  {
    label: i18next.t('warehouseAndDelivery'),
    value: 'warehouseAndDelivery',
  },
];

export const CONTRACT_STATUS = [
  {
    label: EMPLOYEE_GENERAL_STATUS.CONTRACT.probationary.label,
    value: EMPLOYEE_GENERAL_STATUS.CONTRACT.probationary.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.CONTRACT.firstLaborContract.label,
    value: EMPLOYEE_GENERAL_STATUS.CONTRACT.firstLaborContract.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.CONTRACT.secondLaborContract.label,
    value: EMPLOYEE_GENERAL_STATUS.CONTRACT.secondLaborContract.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.CONTRACT.infinite.label,
    value: EMPLOYEE_GENERAL_STATUS.CONTRACT.infinite.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.CONTRACT.service.label,
    value: EMPLOYEE_GENERAL_STATUS.CONTRACT.service.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.CONTRACT.training.label,
    value: EMPLOYEE_GENERAL_STATUS.CONTRACT.training.value,
  },
];

export const INCOMPLETE_STATUS = [
  {
    label: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.contact.label,
    value: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.contact.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.bank.label,
    value: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.bank.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.insurance.label,
    value: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.insurance.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.tax.label,
    value: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.tax.value,
  },
  {
    label: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.profile.label,
    value: EMPLOYEE_GENERAL_STATUS.INCOMPLETE.profile.value,
  },
];

export const PRIORITY = [
  {
    label: i18next.t('highPriority'),
    value: 1,
  },
  {
    label: i18next.t('averagePriority'),
    value: 2,
  },
  {
    label: i18next.t('lowPriority'),
    value: 3,
  },
];

export const OBJECT_TYPES = {
  product: {
    productType: 'productType',
    tags: 'tags',
    productCategories: 'productCategories',
  },
};

// background color
export const backgroundColor = {
  main: '#D8F3DC',
  white: '#fff',
};

export const S3_PROJECT = 'namdong';
export const PRODUCT_HAS_CHILDREN = 11;
export const PRODUCT_ADVERTISING_FURNITURE = 8;
export const PRODUCT_INTERIOR_HOME = 9;

export const type: {
  [key in TypeDefault]: {
    link: string;
    size: string;
    totalImage: number;
  };
} = {
  homeAboutUs: {
    link: 'http://namdong.techsource.com.vn/',
    size: '1: 499 × 310 , 2-3: 348 × 232',
    totalImage: 3,
  },

  homePartner: {
    link: 'http://namdong.techsource.com.vn/#partner',
    size: '97 × 103',
    totalImage: 88,
  },
  aboutUsCompany: {
    link: 'http://namdong.techsource.com.vn/about',
    size: '599 × 320',
    totalImage: 1,
  },
  aboutUsBackground: {
    link: 'http://namdong.techsource.com.vn/about',
    size: '1519 × 444',
    totalImage: 1,
  },
  storeBanner: {
    link: 'http://namdong.techsource.com.vn/store',
    size: '380x240',
    totalImage: 3,
  },
  storeBackground: {
    link: 'http://namdong.techsource.com.vn/store',
    size: '1519 × 444',
    totalImage: 1,
  },
  storeSale: {
    link: 'https://namdong.techsource.com.vn/store/general',
    size: '270 × 390',
    totalImage: 1,
  },
  serviceAdvertiseBg: {
    link: 'http://namdong.techsource.com.vn/advertise-furniture',
    size: '1519 × 444',
    totalImage: 1,
  },
  serviceHouseBg: {
    link: 'http://namdong.techsource.com.vn/house-furniture',
    size: '1519 × 444',
    totalImage: 1,
  },
  serviceWebsiteBg: {
    link: 'http://namdong.techsource.com.vn/website-and-system',
    size: '1519 × 444',
    totalImage: 1,
  },
  serviceOtherBg: {
    link: 'http://namdong.techsource.com.vn/other-service',
    size: '1519 × 444',
    totalImage: 1,
  },
  contactBackground: {
    link: 'http://namdong.techsource.com.vn/contact',
    size: '1519 × 444',
    totalImage: 1,
  },
  aboutUsActivity: {
    link: 'http://namdong.techsource.com.vn/about',
    size: '379 × 320',
    totalImage: 3,
  },
};
