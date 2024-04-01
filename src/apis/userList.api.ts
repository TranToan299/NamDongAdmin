import { deleteAsync, getAsync, postAsync } from './http-client';

const UserApi = {
  get: (params: any) => {
    return getAsync(`/account`, params);
  },
  getRole: () => {
    return getAsync(`/role/getrolelist`);
  },
  postAssignRole: (employeeId: string | number, data: any) => {
    return postAsync(`/account/assign-roles?employeeId=${employeeId}`, data);
  },
};

export default UserApi;
