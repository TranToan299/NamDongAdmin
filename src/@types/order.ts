export type IOrder = {
  id: number;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  productId?: string;
  note?: string;
  createdAt?: Date;
  productList: IProductOfOrder[];
};

export type IOrderForm = {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  productList?: IProductOfOrder[];
  note?: string;
};
type IProductOfOrder = {
  id: number | string;
  order_id?: number | string;
  product_id?: number | string;
  qty?: number;
  submitId: number | string;
};

export type IOrderCreated = IOrderForm & {
  id: number;
  status: number;
};

export type IOrderState = {
  orderList: IOrder[];
  orderCount: number;
  orderDetail: IOrder;
};

export type IOrderParams = {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
};
