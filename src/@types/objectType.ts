export type objectType = {
  id: number | string;
  objectType: string;
  objectCode: string | number;
  objectName: string;
};
export type objectTypeState = {
  objectTypeProduct: objectType[];
  objectTypeProductTag: objectType[];
  objectTypeProductCategories: objectType[];
  objectTypeProductDetailsType: objectType[];
}

export type IParamsProductDetailsType = {
  objectType: string;
  parentId: number | string;
}