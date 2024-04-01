import { deleteAsync, getAsync, postAsync } from './http-client';

const ObjectType = {

  get:(params:any) =>{
    return getAsync(`/objecttype`, params);
  },

};

export default ObjectType;
