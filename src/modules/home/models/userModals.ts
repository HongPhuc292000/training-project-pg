export interface ISeller{
    access_level: string,
    created: string,
    fistName: string,
    lastName: string,
    last_login: string,
    order: {order_as_buyer: number, order_as_buyer_total: number},
    product: number,
    profile_id: string,
    storeName: string,
    vendor: string,
    vendor_id: string,
    wishlist: string
}