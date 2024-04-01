import { IOrderParams, IOrderCreated } from '../@types/order';
import { deleteAsync, getAsync, postAsync } from './http-client';

const url = 'order';
const OrderApi = {
  create: (data: IOrderCreated[]) => {
    return postAsync(`/${url}`, data);
  },
  get: (data: IOrderParams) => {
    return getAsync(`/${url}`, data);
  },
  getDetail: (id: number) => {
    return getAsync(`/${url}/${id}`);
  },
  delete: (ids: number[] | string[]) => {
    return deleteAsync(`/${url}`, ids);
  }
};

export default OrderApi;
