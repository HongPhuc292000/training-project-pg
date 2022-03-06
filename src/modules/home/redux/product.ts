import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IProduct } from '../models/productModal';

const initState = {
    filterProducts:{
        search: '',
        category: 'all',
        stock: 'all',
        searchType: [],
    },
    productList: [],
}

export interface IFilterProduct{
    search: string,
    category: string,
    stock: string,
    searchType: Array<string>
}

export interface IProductList{
    filterProducts: IFilterProduct,
    productList: Array<IProduct>,
}

export const setInitListProducts = createCustomAction('product/setInitListProducts', (data:Array<IProduct>) => ({
    data,
}));

export const filterProducts = createCustomAction('product/filterProducts', (data:IFilterProduct) => ({
    data,
}));

const actions = { setInitListProducts, filterProducts};

type Action = ActionType<typeof actions>;

export default function reducerProduct(state: IProductList = initState , action: Action) {
    switch (action.type) {
        case getType(setInitListProducts):
            return {...state, productList: action.data}
        case getType(filterProducts):
            return {...state, filterProducts: action.data};
        default:
          return state;
    }
}