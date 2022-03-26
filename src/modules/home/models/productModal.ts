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

export interface IShiping{
  id: string,
  zone_name: string,
  price: string
}

export interface ICategoriesId{
  category_id: string,
  name: string
}

export interface IUpdateEnabled{
  id: string,
  enable: number
}

export interface IImages{
  id: string,
  file: string,
  thumbs: Array<string>
}

export interface IDetailProducts{
  id: string,
  vendor_id: string,
  name: string,
  sku: string,
  sort_description: string,
  description: string,
  enabled: string,
  quantity: string,
  price: string,
  participate_sale: string,
  sale_price: string,
  tax_exempt: string,
  arrival_date: string,
  facebook_marketing_enabled: string,
  google_feed_enabled: string,
  og_tags_type: string,
  meta_desc_type: string,
  meta_keywords: string,
  meta_description: string,
  product_page_title: string,
  code: string,
  weight: string,
  inventory_tracking: string,
  og_tags: string,
  sale_price_type: string,
  cleanURL: string,
  brand_id: string,
  condition_id: string,
  shipping: Array<IShiping>,
  categories: Array<ICategoriesId>,
  images: Array<IImages>,
  memberships: Array<any>
}
