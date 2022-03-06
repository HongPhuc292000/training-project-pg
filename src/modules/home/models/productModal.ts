  export interface IPayrollItem{
    approved: boolean,
    canceled: boolean,
    company_id: string,
    confirmed: boolean,
    currency: string,
    date_canceled: string,
    date_confirmed: string,
    date_fulfilled: string,
    date_matched: string,
    date_processed: string,
    date_received: string,
    date_released: string,
    fees: number,
    fulfilled: boolean,
    is_premium: boolean,
    matched: boolean,
    number_of_recipients: number,
    payment_type: string,
    payroll_id: string,
    received: boolean,
    released: boolean,
    subpayroll_ids: Array<string>,
    time_created: string,
    volume_input_in_input_currency: number
} 

export interface IPayroll{
  approved: boolean,
  canceled: boolean,
  company_id: string,
  confirmed: boolean,
  currency: string,
  date_canceled: string,
  date_confirmed: string,
  date_fulfilled: string,
  date_matched: string,
  date_processed: string,
  date_received: string,
  date_released: string,
  fees: number,
  fulfilled: boolean,
  is_premium: boolean,
  matched: boolean,
  number_of_recipients: number,
  payment_type:string,
  payroll_id: string,
  received: boolean,
  released: boolean,
  subpayroll_ids: Array<string>,
  time_created: string,
  volume_input_in_input_currency: number
}

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
