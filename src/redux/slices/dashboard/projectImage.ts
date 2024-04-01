import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { t } from 'i18next';

import ProjectImageApi from '../../../apis/projectImage.api';
import { IRenderProjectImage } from '../../../@types/projectImage';
import SnakeBar from '../../../utils/snackbar';

// ----------------------------------------------------------------------

export const getListProjectImage = createAsyncThunk(
  'projectImage/getListProjectImage',
  async () => {
    const { data } = await ProjectImageApi.get();
    return data;
  }
);

export const getEditorWebsiteAndSystem = createAsyncThunk(
  'projectImage/getEditorWebsiteAndSystem',
  async () => {
    const { data } = await ProjectImageApi.get({ type: 'editorWebsiteAndSystem' });
    return data;
  }
);



export const getListBannerImage = createAsyncThunk(
  'projectImage/getListBannerImage',
  async (params: any) => {
    const { data } = await ProjectImageApi.getBanners(params);
    return data;
  }
);

export const updateProjectImage = createAsyncThunk(
  'projectImage/updateProjectImage',
  async (data: IRenderProjectImage[]) => {
    await ProjectImageApi.post(data);
    SnakeBar.success(t('updateSuccess'));
  }
);

export const updateWebBanner = createAsyncThunk(
  'projectImage/updateProjectImage',
  async (data: IRenderProjectImage[]) => {
    await ProjectImageApi.post(data);
    SnakeBar.success(t('updateSuccess'));
  }
);

export const deleteProjectImage = createAsyncThunk(
  'projectImage/deleteProjectImage',
  async (id: number) => {
    await ProjectImageApi.delete(id);
    SnakeBar.success(t('deleteSuccess'));
  }
);
type IInitialState = {
  listProjectImage: IRenderProjectImage[];
  listPageImage: IRenderProjectImage[];
  listBannerImage: IRenderProjectImage[];
  listHomePageImage: IRenderProjectImage[];
  listAboutUsPageImage: IRenderProjectImage[];
  listStorePageImage: IRenderProjectImage[];
  listServicePageImage: IRenderProjectImage[];
  listContactPageImage: IRenderProjectImage[];
  editorWebsiteAndSystem?: IRenderProjectImage;
};
const initialState: IInitialState = {
  listProjectImage: [],
  listPageImage: [],
  listBannerImage: [],
  listHomePageImage: [],
  listAboutUsPageImage: [],
  listServicePageImage: [],
  listStorePageImage: [],
  listContactPageImage: [],
  editorWebsiteAndSystem: undefined,
};

const slice = createSlice({
  name: 'ProjectImage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListProjectImage.fulfilled, (state, action) => {
        // slice to 6 array
        // 1: listProjectImage
        // 2: listHomePageImage
        // 3: list

        const listProjectImage: IRenderProjectImage[] = action.payload.filter(
          (item: IRenderProjectImage) => !item.type
        );
        const listPageImage: IRenderProjectImage[] = action.payload.filter(
          (item: IRenderProjectImage) => item.type
        );
        state.listProjectImage = listProjectImage;
        state.listPageImage = listPageImage;
        // -----------handle listHomePageImage--------------------
        const listHomePageImage: IRenderProjectImage[] = [];
        const listHomeAboutUsImage = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'homeAboutUs'
        );
        const listHomePartnerImage = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'homePartner'
        );
        if (listHomeAboutUsImage && listHomePartnerImage) {
          listHomePageImage.push(listHomeAboutUsImage);
          listHomePageImage.push(listHomePartnerImage);
        }
        state.listHomePageImage = listHomePageImage;
        // -----------handle listBannerImage--------------------

        // -----------handle listAboutUsPageImage--------------------
        const listAboutUsPageImage: IRenderProjectImage[] = [];
        const listcompanyAboutUsImage = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'aboutUsCompany'
        );
        const backgroundAboutUsImage = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'aboutUsBackground'
        );
        const listActivityPartnerImage = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'aboutUsActivity'
        );
        if (listcompanyAboutUsImage && listActivityPartnerImage && backgroundAboutUsImage) {
          listAboutUsPageImage.push(backgroundAboutUsImage);
          listAboutUsPageImage.push(listcompanyAboutUsImage);
          listAboutUsPageImage.push(listActivityPartnerImage);
        }
        state.listAboutUsPageImage = listAboutUsPageImage;
        // -----------handle listAboutUsPageImage--------------------

        // -----------handle listServicePageImage--------------------
        const listServicePageImage: IRenderProjectImage[] = [];
        const serviceHouseBg = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'serviceHouseBg'
        );
        const serviceAdvertiseBg = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'serviceAdvertiseBg'
        );
        const serviceWebsiteBg = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'serviceWebsiteBg'
        );
        const serviceOtherBg = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'serviceOtherBg'
        );
        if (serviceHouseBg && serviceAdvertiseBg && serviceWebsiteBg && serviceOtherBg) {
          listServicePageImage.push(serviceHouseBg);
          listServicePageImage.push(serviceAdvertiseBg);
          listServicePageImage.push(serviceWebsiteBg);
          listServicePageImage.push(serviceOtherBg);
        }
        state.listServicePageImage = listServicePageImage;
        // -----------handle listServicePageImage--------------------

        // -----------handle listStorePageImage--------------------
        const listStorePageImage: IRenderProjectImage[] = [];
        const storeBanner = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'storeBanner'
        );
        const storeBackground = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'storeBackground'
        );
        const storeSale = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'storeSale'
        );

        if (storeBanner && storeBackground && storeSale) {
          listStorePageImage.push(storeBanner);
          listStorePageImage.push(storeBackground);
          listStorePageImage.push(storeSale);
        }
        state.listStorePageImage = listStorePageImage;
        // -----------handle listServicePageImage--------------------

        // -----------handle listContactPageImage--------------------
        const listContactPageImage: IRenderProjectImage[] = [];
        const contactBackground = listPageImage.find(
          (item: IRenderProjectImage) => item.type === 'contactBackground'
        );

        if (contactBackground) {
          listContactPageImage.push(contactBackground);
        }
        state.listContactPageImage = listContactPageImage;
        // -----------handle listServicePageImage--------------------
      })
      .addCase(getEditorWebsiteAndSystem.fulfilled, (state, action) => {
        const listBannerImage = action.payload[0] || [];
        state.editorWebsiteAndSystem = listBannerImage;
      })
      .addCase(getListBannerImage.fulfilled, (state, action) => {
        const listBannerImage = action.payload || [];
        state.listBannerImage = listBannerImage;
      });
  },
});

export default slice.reducer;
