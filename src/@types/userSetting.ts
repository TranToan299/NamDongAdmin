export type IUser = {
  Id?: number | string;
  EmployeeId?: number;
  UserName?: any;
  Email?: string;
  EmailConfirmed?: boolean;
  PasswordHash?: any;
  PhoneNumber?: any;
  PhoneNumberConfirmed?: boolean;
  TwoFactorEnabled?: boolean;
  LockoutEndDateUtc?: any;
  LockoutEnabled?: boolean;
  AccessFailedCount?: number;
  Active?: any;
  NormalizedUserName?: any;
  FullName?: any;
  Address?: any;
  NormalizedEmail?: any;
  Avatar?: any;
  Roles?: any;
};
export type IRole = {
  Name?: string;
  Id?: string | number;
};

export type IUserState = {
  userList: IUser[];
  userCount: number;
  roleList: IRole[];
};
