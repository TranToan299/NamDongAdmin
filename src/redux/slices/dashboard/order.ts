import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import i18next from 'i18next';

import SnakeBar from '../../../utils/snackbar';
import OrderApi from '../../../apis/order.api';
import { IOrderParams, IOrderCreated, IOrderState } from '../../../@types/order';

type IOrderCreatedAction = {
  data: IOrderCreated[];
  navigate: (path: string) => void;
}
type IOrderCreatedDelete = {
  ids: number[] | string[];
  params: IOrderParams;
}
// ----------------------------------------------------------------------

export const getListOrder = createAsyncThunk(
  'order/getListOrder',
  async (params: IOrderParams, { dispatch }) => {
    const { data } = await OrderApi.get(params);
    return data;
  }
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (submitData: IOrderCreatedAction, { dispatch }) => {
    const { data } = await OrderApi.create(submitData.data);

    if (submitData.data[0].id > 0) {
      SnakeBar.success(i18next.t('updateSuccess'));
    } else {
      SnakeBar.success(i18next.t('createSuccess'));
    }
    submitData?.navigate(data?.toString());
  }
);
export const getOrderDetail = createAsyncThunk(
  'order/getOrderDetail',
  async (id: number, { dispatch }) => {
    const { data } = await OrderApi.getDetail(id);
    return data;
  }
);

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (data: IOrderCreatedDelete, { dispatch }) => {
    try {
      await OrderApi.delete(data.ids);
      await dispatch(getListOrder(data.params));
      SnakeBar.success(i18next.t('deleteSuccess'));
    } catch (error) {
      SnakeBar.error(i18next.t('deleteError'));

    }
  }
);

const initialState: IOrderState = {
  orderList: [],
  orderCount: 0,
  orderDetail: {
    id: 0,
    productList: []
  },
};

const slice = createSlice({
  name: 'Order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListOrder.fulfilled, (state, action) => {
      state.orderList = action.payload.items;
      state.orderCount = action.payload.totalRow;
    })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.orderDetail = action.payload;
      });
  },
});
export default slice.reducer;
