export interface IVendor{
  id: number,
  name: string
}

export interface IListVendors{
    data: Array<IVendor>,
    errors: boolean,
    recordsTotal: number,
    success: boolean,
    user: object
}