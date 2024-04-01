import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';
import ProductApi from '../../../apis/product.api';
import { IProductCreated, IProductParams, ProductState } from '../../../@types/product';
import SnakeBar from '../../../utils/snackbar';

// ----------------------------------------------------------------------
type IDataCreated = {
  data: IProductCreated;
  id?: number | string;
  navigate: () => void;
}
type IProductCreatedDelete = {
  ids: number[] | string[];
  params: IProductParams;
}
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (data: IDataCreated, { dispatch }) => {
    await ProductApi.create(data.data);
    if (data.data.id === 0) {
      SnakeBar.success(i18next.t('createSuccess'));
    } else {
      SnakeBar.success(i18next.t('editSuccess'));
    }
    data.navigate();
  }
);

export const getListProduct = createAsyncThunk(
  'product/getListProduct',
  async (params: IProductParams, { dispatch }) => {
    const { data } = await ProductApi.get(params);
    return data;
  }
);
export const getProductDetail = createAsyncThunk(
  'product/getProductDetail',
  async (id: number | string, { dispatch }) => {
    const { data } = await ProductApi.getDetail(id);
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (data: IProductCreatedDelete, { dispatch }) => {
    await ProductApi.delete(data.ids);
    SnakeBar.success(i18next.t('deleteSuccess'));
    await dispatch(getListProduct(data.params));
  }
);

const initialState: ProductState = {
  listProduct: [],
  productCount: 0,
  productDetail: {},
};

const slice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    filterProduct: (state, action) => {
      const idProduct = action.payload;
      state.listProduct.filter((item) => item.id !== idProduct);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getListProduct.fulfilled, (state, action) => {
      state.listProduct = action.payload.items;
      state.productCount = action.payload.totalRow;
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    });
  },
});
export default slice.reducer;
export const { filterProduct } = slice.actions;
