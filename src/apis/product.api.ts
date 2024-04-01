import { deleteAsync, getAsync, postAsync } from "apis/http-client";
import { IProductCreated, IProductParams } from "../@types/product";


const ProductApi = {
  create: (data: IProductCreated) => {
    return postAsync(`/product`, data);
  },
  get: (data: IProductParams) => {
    return getAsync(`/product`, data);
  },
  getDetail: (id: number | string) => {
    return getAsync(`/product/${id}`);
  },
  delete: (data: number[] | string[]) => {
    return deleteAsync(`/product`, data);
  }
};

export default ProductApi;
