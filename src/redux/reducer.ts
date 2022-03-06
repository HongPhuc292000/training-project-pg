import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import reducerPayroll, { IFilter, IPayrollList } from '../modules/home/redux/payroll';
import reducerProduct, { IProductList } from '../modules/home/redux/product';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  payroll: IPayrollList;
  product: IProductList;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    payroll: reducerPayroll,
    product: reducerProduct,
  });
}
