import { CustomFile } from '../components/upload';

type ITypeDefault =
    | 'homeAboutUs'
    | 'homePartner'
    | 'aboutUsCompany'
    | 'aboutUsBackground'
    | 'storeBanner'
    | 'storeBackground'
    | 'storeSale'
    | 'serviceAdvertiseBg'
    | 'serviceHouseBg'
    | 'serviceWebsiteBg'
    | 'serviceOtherBg'
    | 'contactBackground'
    | 'aboutUsActivity'
    ;

export enum TypeDefault {
    HOME_ABOUT_US = 'homeAboutUs',
    HOME_PARTNER = 'homePartner',
    ABOUT_US_COMPANY = 'aboutUsCompany',
    ABOUT_US_BACKGROUND = 'aboutUsBackground',
    STORE_BANNER = 'storeBanner',
    STORE_BACKGROUND = 'storeBackground',
    STORE_SALE = 'storeSale',
    SERVICE_ADVERTISE_BG = 'serviceAdvertiseBg',
    SERVICE_HOUSE_BG = 'serviceHouseBg',
    SERVICE_WEBSITE_BG = 'serviceWebsiteBg',
    SERVICE_OTHER_BG = 'serviceOtherBg',
    CONTACT_BACKGROUND = 'contactBackground',
    ABOUT_US_ACTIVITY = 'aboutUsActivity',
}

type ICommonProjectImage = {
    id: number;
    name: string;
    description: string;
    type: ITypeDefault | null;
};

export type IProjectImage = ICommonProjectImage & {
    images: (string | CustomFile)[];
    totalImage?: number;
};

export type IRenderProjectImage = ICommonProjectImage & {
    images: string;
};

export type IFieldProjectImage = IProjectImage & {
    idProjectImage: number | null;
};
