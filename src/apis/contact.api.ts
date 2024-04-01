import { IContactParams } from '../@types/contact';
import { getAsync } from './http-client';

const url = 'contact';
const ContactApi = {
  get: (data: IContactParams) => {
    return getAsync(`/${url}`, data);
  },
};

export default ContactApi;
