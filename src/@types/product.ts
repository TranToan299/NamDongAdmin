export type ProductType = {
  id?: number | string;
  name?: string;
  images?: any;
  thumbnail?: string;
  description?: string;
  price?: number | string;
  content?: any;
  type?: number | string;
  typeName?: string;
  isActive?: boolean;
  tags?: any;
  categories?: any;
  material?: string;
  salePrice?: number | string;
  isLiquid?: boolean;
  isSale?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  typeDetailId?: number | string;
  info?: string;
  specifications?: string;
};

export type IProductCreated = {
  id?: number | string;
  name?: string;
  images?: any;
  thumbnail?: string | null;
  description?: string;
  price?: number | string;
  content?: any;
  type?: number | string;
  isActive?: boolean;
  tags?: any;
  categories?: any;
  material?: string;
  salePrice?: number | string;
  isLiquid?: boolean;
  isSale?: boolean;
  typeDetailId?: number | string;
  info?: string | null;
  specifications?: string;
};

export type ProductState = {
  listProduct: ProductType[];
  productCount: number;
  productDetail: ProductType;
};

export type IProductParams = {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  type?: string;
};

export type IProductDefaultValue = {
  productName?: string;
  productImages?: string[];
  thumbnail?: string | null;
  description?: string;
  price?: number | string;
  content?: string;
  productType?: number | string;
  isActive?: boolean;
  productTags?: string[];
  productCategories?: string[];
  material?: string;
  salePrice?: number | string;
  isLiquid?: boolean;
  isSale?: boolean;
  typeDetailId?: number | string;
  infoList: IInfoList[];
  specifications?: string;
};

type IInfoList = {
  id: number | string;
  value: string;
};
