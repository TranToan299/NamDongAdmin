export type IEvent = {
  id: number;
  name?: string;
  thumbnail?: string;
  description?: string;
  content?: string;
  // isActive?: boolean;
  isPublish?: boolean;
  type?: number;
  typeName?: string;
  createdAt?: Date;
};

export type IEventForm = {
  name?: string;
  thumbnail?: string | null;
  description?: string;
  content?: string;
  isActive?: boolean;
  isPublish?: boolean;
  type?: number | string;
};

export type IEventCreated = IEventForm & {
  id: number;
};

export type IEventType = {
  id?: number,
  objectType?: string,
  objectCode?: string,
  objectName?: string,
  createdAt?: Date,
  updatedAt?: Date
}

export type IEventState = {
  eventList: IEvent[];
  eventCount: number;
  eventDetail: IEvent;
  eventType?: IEventType[],
};

export type IEventParams = {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  eventType?: string;
};
