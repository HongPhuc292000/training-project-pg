import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IProduct } from '../models/productModal';
import { ISellerDelete } from '../models/userModals';

const initState = {
    filterProducts:{
        search: '',
        category: 'all',
        stock: 'all',
        status: 'all',
        searchType: [],
    },
    productList: [],
    deleteProducts: []
}

export interface IFilterProduct{
    search: string,
    category: string,
    stock: string,
    status: string
    searchType: Array<string>
}

export interface IProductList{
    filterProducts: IFilterProduct,
    productList: Array<IProduct>,
    deleteProducts: Array<ISellerDelete>
}

export const setInitListProducts = createCustomAction('product/setInitListProducts', (data:Array<IProduct>) => ({
    data,
}));

export const filterProducts = createCustomAction('product/filterProducts', (data:IFilterProduct) => ({
    data,
}));

export const setDeleteProducts = createCustomAction('product/setDeleteProducts', (data:Array<ISellerDelete> | undefined) => ({
    data,
}));

const actions = { setInitListProducts, filterProducts, setDeleteProducts};

type Action = ActionType<typeof actions>;

export default function reducerProduct(state: IProductList = initState , action: Action) {
    switch (action.type) {
        case getType(setInitListProducts):
            return {...state, productList: action.data}
        case getType(filterProducts):
            return {...state, filterProducts: action.data};
        case getType(setDeleteProducts):
            return {...state, deleteProducts: action.data};
        default:
          return state;
    }
}