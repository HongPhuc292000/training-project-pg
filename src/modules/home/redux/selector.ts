import { FilterAltSharp } from "@mui/icons-material";
import { createSelector } from "reselect";
import { AppState } from "../../../redux/reducer";
import { IPayroll, IProduct } from "../models/productModal";

//Product Selector

export const productListSelector = (state:AppState) => state.product.productList;
export const productFilters = (state:AppState) => state.product.filterProducts;


export const filterProductSearchSelector = createSelector(productListSelector,productFilters,(productList,filters)=>{
    return(productList.filter((item:IProduct) => {
        if(filters.searchType.includes('name')){
            if(filters.searchType.includes('sku')){
                if(filters.searchType.includes('des')){
                    return (item.sku.includes(filters.search) ||
                        item.name.includes(filters.search) ||
                        item.description.includes(filters.search)
                    )
                }else{
                    return (
                        item.name.includes(filters.search) ||
                        item.sku.includes(filters.search)
                    )
                }
            }else{
                return (
                    item.name.includes(filters.search)
                )
            }
        }else if(filters.searchType.includes('sku')){
            if(filters.searchType.includes('des')){
                return(
                    item.sku.includes(filters.search) ||
                    item.description.includes(filters.search)
                )
            }else{
                return item.sku.includes(filters.search)
            }
        }else if(filters.searchType.includes('des')){
            return item.description.includes(filters.search)
        }else{
            return item
        }
    }))
})

export const filterProductSCSelector = createSelector(filterProductSearchSelector,productFilters,(productSearchFilter,filters)=>{
    return(productSearchFilter.filter(item=>{
        if(filters.category === 'all'){
            return item;
        }return item.category === filters.category;
    }))
})

export const filterProductSCSSelector = createSelector(filterProductSCSelector,productFilters,(productSCFilter,filters)=>{
    return(productSCFilter.filter(item=>{
        if(filters.stock === 'in'){
            return (+item.amount > 10);
        }else if(filters.stock === 'low'){
            return (+item.amount <= 10 && +item.amount >0);
        }else if(filters.stock === 'out'){
            return (+item.amount == 0);
        }else{
            return item;
        }
    }))
})