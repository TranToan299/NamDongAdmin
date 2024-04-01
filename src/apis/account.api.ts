import { postAsync } from './http-client';

const AccountApi = {
  login: (data: any) => {
    return postAsync(`/account/login`, data);
  },


};

export default AccountApi;
