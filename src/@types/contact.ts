export type IContact = {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  note?: string;
  attach_url?: string;
  createdAt?: Date;
};

export type IContactForm = {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  note?: string;
};
export type IContactState = {
  contactList: IContact[];
  contactCount: number;
};

export type IContactParams = {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
};
