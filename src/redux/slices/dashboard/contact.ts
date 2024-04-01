import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


import { IContactParams, IContactState } from '../../../@types/contact';
import ContactApi from '../../../apis/contact.api';


// ----------------------------------------------------------------------

export const getListContact = createAsyncThunk(
  'order/getListContact',
  async (params: IContactParams, { dispatch }) => {
    const { data } = await ContactApi.get(params);
    return data;
  }
);

const initialState: IContactState = {
  contactList: [],
  contactCount: 0,

};

const slice = createSlice({
  name: 'Contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListContact.fulfilled, (state, action) => {
      state.contactList = action.payload.items;
      state.contactCount = action.payload.totalRow;
    })

  },
});
export default slice.reducer;
