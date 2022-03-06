import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IPayroll } from '../models/productModal';

const initState = {
    filters:{
        status: '',
        invoice: '',
        from: 0,
        to: 0,
    },
    payrollList: [],
}

export interface IFilter{
    status: string,
    invoice: string,
    from: number,
    to: number,
}

export interface IPayrollList{
    filters: IFilter,
    payrollList: Array<IPayroll>,
}

export const filterStatusPayroll = createCustomAction('payroll/filterStatusPayroll', (data:string) => ({
    data,
}));

export const filterDateFromPayroll = createCustomAction('payroll/filterDateFromPayroll', (data:number) => ({
    data,
}));

export const filterDateToPayroll = createCustomAction('payroll/filterDateToPayroll', (data:number) => ({
    data,
}));

export const filterInvoicePayroll = createCustomAction('payroll/filterInvoicePayroll', (data:string) => ({
    data,
}));

export const clearFilterPayroll = createCustomAction('payroll/clearFilterPayroll', (data:boolean) => ({
    data,
}));

export const setDefaultListPayroll = createCustomAction('payroll/setDefaultListPayroll', (data:any) => ({
    data,
}))

export const updatePayrollItem = createCustomAction('payroll/updatePayrollItem', (data:any) => ({
    data,
}))

export const deletePayrollItem = createCustomAction('payroll/deletePayrollItem', (data: string) => ({
    data,
}))

const actions = { setDefaultListPayroll,
    filterStatusPayroll,
    filterDateFromPayroll,
    filterDateToPayroll,
    filterInvoicePayroll,
    clearFilterPayroll,
    updatePayrollItem,
    deletePayrollItem
};

type Action = ActionType<typeof actions>;

export default function reducerPayroll(state: IPayrollList = initState , action: Action) {
    switch (action.type) {
        case getType(setDefaultListPayroll):
            return {...state, payrollList: action.data}
        case getType(filterStatusPayroll):
            return {...state, filters: {...state.filters, status: action.data}};
        case getType(filterDateFromPayroll):
            return {...state, filters: {...state.filters, from: action.data}}
        case getType(filterDateToPayroll):
            return {...state, filters: {...state.filters, to: action.data}}
        case getType(filterInvoicePayroll):
            return {...state, filters: {...state.filters, invoice: action.data}}
        case getType(clearFilterPayroll):
            return {...state, filters: {...initState.filters}}
        case getType(updatePayrollItem):
            return {...state, payrollList: action.data}
        case getType(deletePayrollItem):
            return {...state,
                payrollList: [...state.payrollList].filter(item=>{
                    return item.payroll_id != action.data;
                })}
        default:
          return state;
    }
}