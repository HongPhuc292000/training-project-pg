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

export interface IPagination{
  page: number,
  limit: number,
  startpage: number,
  endpage: number,
  totalRows: number
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