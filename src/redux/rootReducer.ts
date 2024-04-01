import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import eventReducer from './slices/dashboard/event';
import objectTypeReducer from './slices/dashboard/objectType';
import orderReducer from './slices/dashboard/order';
import productReducer from './slices/dashboard/product';
import contactReducer from './slices/dashboard/contact';
import projectImageReducer from './slices/dashboard/projectImage';
// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({

  order: orderReducer,
  objectType: objectTypeReducer,
  product: productReducer,
  event: eventReducer,
  contact: contactReducer,
  projectImage: projectImageReducer,
});

export default rootReducer;
