import { IRenderProjectImage } from '../@types/projectImage';
import { deleteAsync, getAsync, postAsync } from './http-client';

const url = 'projectimages';
const ProjectImageApi = {
  get: (params?: { type: string }) => {
    return getAsync(`/${url}`, params);
  },
  getBanners: (params: any) => {
    return getAsync(`/${url}`, params);
  },
  post: (data: IRenderProjectImage[]) => {
    return postAsync(`/${url}`, data);
  },
  delete: (id: number) => {
    return deleteAsync(`/${url}`, [id]);
  },
};

export default ProjectImageApi;
