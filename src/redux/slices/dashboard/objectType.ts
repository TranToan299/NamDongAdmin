import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import objectTypeApi from '../../../apis/objecType.api';
import { IParamsProductDetailsType, objectTypeState } from '../../../@types/objectType';

// ----------------------------------------------------------------------

export const getObjectTypeProduct = createAsyncThunk(
  'objectType/getListObjectType',
  async (params: any, { dispatch }) => {
    const { data } = await objectTypeApi.get({ objectType: params });
    return data;
  }
);

export const getObjectTypeProductDetailsType = createAsyncThunk(
  'objectType/getObjectTypeProductDetailsType',
  async (params: IParamsProductDetailsType, { dispatch }) => {
    const { objectType, parentId } = params;
    const { data } = await objectTypeApi.get({ objectType, parentId });
    return data;
  }
);

export const getObjectTypeProductTag = createAsyncThunk(
  'objectType/getListObjectTypeTag',
  async (params: string, { dispatch }) => {
    const { data } = await objectTypeApi.get({ objectType: params });
    return data;
  }
);
export const getObjectTypeProductCategories = createAsyncThunk(
  'objectType/getListObjectTypeCategories',
  async (params: string, { dispatch }) => {
    const { data } = await objectTypeApi.get({ objectType: params });
    return data;
  }
);

const initialState: objectTypeState = {
  objectTypeProduct: [],
  objectTypeProductTag: [],
  objectTypeProductCategories: [],
  objectTypeProductDetailsType: [],
};

const slice = createSlice({
  name: 'Product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getObjectTypeProduct.fulfilled, (state, action) => {
      state.objectTypeProduct = action.payload;
    });
    builder.addCase(getObjectTypeProductTag.fulfilled, (state, action) => {
      state.objectTypeProductTag = action.payload;
    });
    builder.addCase(getObjectTypeProductCategories.fulfilled, (state, action) => {
      state.objectTypeProductCategories = action.payload;
    });
    builder.addCase(getObjectTypeProductDetailsType.fulfilled, (state, action) => {
      state.objectTypeProductDetailsType = action.payload;
    });
  },
});
export default slice.reducer;
