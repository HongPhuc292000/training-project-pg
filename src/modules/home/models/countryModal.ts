export interface ICountry{
    code: string,
    currency_id: string,
    id: string,
    code3: string,
    enabled: string,
    active_currency: string,
    is_fraudlent: string,
    country: string
}

export interface IState{
    state_id: string,
    country_code: string,
    region_code: string,
    state: string,
    code: string
}

export interface IRole{
    id: string,
    enabled?: string,
    name: string
}