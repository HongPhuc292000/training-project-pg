import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import reducerProduct, { IProductList } from '../modules/home/redux/product';
import reducerVendor, { IVendorList } from '../modules/home/redux/vendor';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  product: IProductList;
  vendor: IVendorList
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    product: reducerProduct,
    vendor: reducerVendor,
  });
}
