import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserApi from 'apis/userList.api';
import i18next from 'i18next';
import { IUserState } from '../../../@types/userSetting';
import SnakeBar from '../../../utils/snackbar';

// ----------------------------------------------------------------------

export const getListUser = createAsyncThunk(
  'user/getListUser',
  async (params: any, { dispatch }) => {
    const { data } = await UserApi.get(params);
    return data;
  }
);

export const getRoleList = createAsyncThunk('user/getRoleList', async () => {
  const { data } = await UserApi.getRole();
  return data;
});

export const assignRole = createAsyncThunk('user/assignRole', async (data: any, { dispatch }) => {
  await UserApi.postAssignRole(data.employeeId, {
    roles: data.roles,
  });
  SnakeBar.success(i18next.t('updateSuccess'));
});

const initialState: IUserState = {
  userList: [],
  userCount: 0,
  roleList: [],
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListUser.fulfilled, (state, action) => {
        state.userList = action.payload.items;
        state.userCount = action.payload.totalRow;
      })
      .addCase(getRoleList.fulfilled, (state, action) => {
        state.roleList = action.payload;
      });
  },
});
export default slice.reducer;
