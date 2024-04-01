import { IEventCreated, IEventParams } from '../@types/event';
import { deleteAsync, getAsync, postAsync } from './http-client';

const url = 'event';
const EventApi = {
  get: (data: IEventParams) => {
    return getAsync(`/${url}`, data);
  },
  getDetail: (id: number) => {
    return getAsync(`/${url}/${id}`);
  },
  create: (data: IEventCreated) => {
    return postAsync(`/${url}`, data);
  },
  delete: (ids: number[] | string[]) => {
    return deleteAsync(`/${url}`, ids);
  }
};

export default EventApi;
