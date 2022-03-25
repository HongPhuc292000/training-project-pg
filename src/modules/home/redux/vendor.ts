import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ISellerDelete } from '../models/userModals';

const initState = {
    deleteVendors: []
}

export interface IVendorList{
    deleteVendors: Array<ISellerDelete>
}

export const setDeleteVendors = createCustomAction('product/setDeleteVendors', (data:Array<ISellerDelete> | undefined) => ({
    data,
}));

const actions = { setDeleteVendors };

type Action = ActionType<typeof actions>;

export default function reducerVendor(state: IVendorList = initState , action: Action) {
    switch (action.type) {
        case getType(setDeleteVendors):
            return {...state, deleteVendors: action.data}
        default:
          return state;
    }
}