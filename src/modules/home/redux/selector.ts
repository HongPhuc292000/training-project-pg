import { createSelector } from "reselect";
import { IPayroll } from "../models/payrollModel";

//Home Selector 
export const homeListSelector = (state:any) => state.home.listItems;

//Payroll Selector 
export const payrollListSelector = (state:any) => state.payroll.payrollList;
export const filterStatusSelector = (state:any) => state.payroll.filters.status;
export const filterDateFromSelector = (state:any) => state.payroll.filters.from;
export const filterDateToSelector = (state:any) => state.payroll.filters.to;
export const filterInvoiceSelector = (state:any) => state.payroll.filters.invoice;

export const filterInvoiceDateSelector = createSelector(payrollListSelector,filterDateFromSelector,filterDateToSelector,filterInvoiceSelector,(payrollListWrap,from,to,invoice)=>{
    return(
        payrollListWrap.filter((item:IPayroll)=>{
            if(from){
                if(to){
                    return ((Date.parse(item.time_created) >= from && Date.parse(item.time_created) <= to) && item.payroll_id.includes(invoice));
                }else{
                    return (Date.parse(item.time_created) >= from  && item.payroll_id.includes(invoice));
                }
            }else if(to){
                return (Date.parse(item.time_created) <= to  && item.payroll_id.includes(invoice));
            }else{
                return (item.payroll_id.includes(invoice))
            }
        })
    )
})

export const filterAllSelector = createSelector(filterInvoiceDateSelector,filterStatusSelector,(payrollListWrap,status)=>{
    return(payrollListWrap.filter((item:IPayroll) => {
        switch (status){
            case 'receive':
                return item.received;
            case 'processing':
                return item.matched || item.approved;
            case 'fulfill':
                return item.fulfilled;
            case 'cancel':
                return item.canceled;
            case 'pending':
                return !item.received && !item.matched && !item.approved && !item.fulfilled && !item.canceled;
            default:
                return item;
            }
    }))
})