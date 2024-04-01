import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import i18next from 'i18next';
import SnakeBar from 'utils/snackbar';

import { IEventCreated, IEventParams, IEventState } from '../../../@types/event';
import EventApi from '../../../apis/event.api';
import objectTypeApi from '../../../apis/objecType.api';

type IEventCreatedAction = {
  data: IEventCreated;
  navigate: (path: string) => void;
};
type IEventDelete = {
  ids: number[] | string[];
  params: IEventParams;
};
// ----------------------------------------------------------------------

export const getObjectTypeEvent = createAsyncThunk(
  'event/getListObjectType',
  async (params: any, { dispatch }) => {
    const { data } = await objectTypeApi.get({objectType: params});
    return data;
  }
);

export const getListEvent = createAsyncThunk(
  'event/getListEvent',
  async (params: IEventParams, { dispatch }) => {
    const { data } = await EventApi.get(params);
    return data;
  }
);

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (submitData: IEventCreatedAction, { dispatch }) => {
    const { data } = await EventApi.create(submitData.data);

    if (submitData.data.id > 0) {
      SnakeBar.success(i18next.t('updateSuccess'));
    } else {
      SnakeBar.success(i18next.t('createSuccess'));
    }
    submitData?.navigate(data?.toString());
  }
);

export const getEventDetail = createAsyncThunk(
  'event/getEventDetail',
  async (id: number, { dispatch }) => {
    const { data } = await EventApi.getDetail(id);
    return data;
  }
);

export const deleteEvent = createAsyncThunk(
  'event/deleteEvent',
  async (data: IEventDelete, { dispatch }) => {
    try {
      await EventApi.delete(data.ids);
      await dispatch(getListEvent(data.params));
      SnakeBar.success(i18next.t('deleteSuccess'));
    } catch (error) {
      SnakeBar.error(i18next.t('deleteError'));

    }
  }
);

const initialState: IEventState = {
  eventList: [],
  eventCount: 0,
  eventDetail: {
    id: 0,
  },
  eventType: [],
};

const slice = createSlice({
  name: 'Event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListEvent.fulfilled, (state, action) => {
        state.eventList = action.payload.items;
        state.eventCount = action.payload.totalRow;
      })
      .addCase(getObjectTypeEvent.fulfilled, (state, action) => {
        state.eventType = action.payload;
      })
      .addCase(getEventDetail.fulfilled, (state, action) => {
        state.eventDetail = action.payload;
      });
  },
});
export default slice.reducer;
