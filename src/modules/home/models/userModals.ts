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

export interface ISellerDelete{
    id: string,
    delete: number
}

export interface IInfoUser{
    income: string,
    expense: string,
    earning: 0,
    order_as_buyer: 0,
    order_as_buyer_total: 0,
    products_total: string,
    profile_id: 9,
    default_card_id: string,
    taxExempt: string,
    paymentRailsType: string,
    paymentRailsId: string,
    firstName: string,
    lastName: string,
    email: string,
    access_level: string,
    joined: string,
    first_login: string,
    last_login: string,
    status: string,
    membership_id: string,
    pending_membership_id: string,
    language: string,
    forceChangePassword: string,
    referer: string,
    statusComment: string,
    roles: Array<string>,
    companyName: string,
    vendor_id: string
}

export interface IAccountStatus{
    E: string,
    D: string,
    U: string
}

export interface IAccountRole{
    id: string,
    name: string
}

export interface IDetailProfile{
    info: IInfoUser,
    account_status: IAccountStatus,
    account_roles: Array<IAccountRole>
}