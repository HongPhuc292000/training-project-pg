export interface IProduct{
  amount: string,
  arrivalDate: string,
  category: string,
  condition: string,
  created: string,
  description: string,
  enabled: string,
  id: string,
  name: string,
  participateSale: string,
  price: string,
  sku: string,
  vendor: string,
  vendorID: string,
  weight: string,
}

export interface IListProduct{
  data: Array<IProduct>,
  errors: boolean,
  recordsFiltered: string,
  recordsTotal: string,
  success: boolean,
  user: object
}

export interface ICategory{
  id: string,
  parentId: string,
  name: string,
  path: string,
  pos: string
}

export interface IStock{
  name: string,
  value: string
}

export interface IUpdateEnabled{
  id: string,
  enable: number
}

