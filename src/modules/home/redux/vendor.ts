import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IProduct } from '../models/productModal';
import { ISeller } from '../models/userModals';

const initState = {
    filterProducts:{
        search: '',
        category: 'all',
        stock: 'all',
        status: 'all',
        searchType: [],
    },
    vendorList: [],
}

export interface IFilterProduct{
    search: string,
    category: string,
    stock: string,
    status: string
    searchType: Array<string>
}

export interface IVendorList{
    filterProducts: IFilterProduct,
    vendorList: Array<ISeller>,
}

export const setInitListVendors = createCustomAction('product/setInitListProducts', (data:Array<ISeller>) => ({
    data,
}));

const actions = { setInitListVendors};

type Action = ActionType<typeof actions>;

export default function reducerVendor(state: IVendorList = initState , action: Action) {
    switch (action.type) {
        case getType(setInitListVendors):
            return {...state, productList: action.data}
        default:
          return state;
    }
}