import React, { useEffect } from 'react';
import '../scss/home.scss';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { IDetailProducts } from '../models/productModal';
import ButtonOnOff from '../common/ButtonOnOff';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AroundButton from '../common/AroundButton';
import Button from '@mui/material/Button';

interface Props{
  id: string
}

function DetailProductForm(props: Props) {
  const { id } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [loading, setLoading] = React.useState(false);
  const [productData, setProductData] = React.useState<IDetailProducts | undefined>()


  const getProductData = React.useCallback(async()=>{
    setLoading(true)
    const json = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/products/detail', 'post', {id: id}),
    );
    setProductData(json.data);
    setLoading(false);
  },[id]);

  useEffect(()=>{
    getProductData()
  },[id]);

  return (
    <div className="col-10 form-wrap">
      <div className="row form-create__wrap">
        <AroundButton linkto="/listProducts"/>
        <p className='form__header mb-5 pb-4 border-bottom'>{productData?.name}</p>
        <div className="col-8 ">
          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="vendor__value" className='input__label'>Vendor <span className='input__required' style={{color: 'red'}}>*</span></label>
            </div>
            <div className="col-9">
              <input id='vendor__value' className='input__value wd-60' type="text" placeholder='Type vendor name to select'/>
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="title__value" className='input__label'>Product Title <span className='input__required' style={{color: 'red'}}>*</span></label>
            </div>
            <div className="col-9">
              <input id='title__value' className='input__value wd-60' type="text" value={productData?.name}/>  
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="brand-select" className='input__label'>Brand <span className='input__required' style={{color: 'red'}}>*</span></label>
            </div>
            <div className="col-9">
              <select className='input__value wd-60' name="brand-select" id="brand-select"></select>
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="condition-select" className='input__label'>Condition <span className='input__required' style={{color: 'red'}}>*</span></label>
            </div>
            <div className="col-9">
              <select className='input__value wd-60' name="condition-select" id="condition-select"></select>
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="sku-value" className='input__label'>SKU</label>
            </div>
            <div className="col-9">
              <input id='sku-value' className='input__value wd-60' type="text"/>  
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="image-value" className='input__label'>Images <span className='input__required' style={{color: 'red'}}>*</span></label>
            </div>
            <div className="col-9">
              <div className='input__image-wrap'>
                <span><CameraAltIcon /></span>
                <input className='input__image' id='image-value' type="file" />
              </div>
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="category-select" className='input__label'>Category <span className='input__required' style={{color: 'red'}}>*</span></label>
            </div>
            <div className="col-9">
              <select className='input__value wd-100' name="category-select" id="category-select"></select>  
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="des-value" className='input__label'>Description <span className='input__required' style={{color: 'red'}}>*</span></label> 
            </div>
            <div className="col-9">
              <input id='des-value' className='input__value wd-100' type="text"/>  
            </div>

          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="" className='input__label'>Available for sale</label>
            </div>
            <div className="col-9">
              <ButtonOnOff />
            </div>
          </div>
        </div>
      </div>
      <div className="seperate-space"></div>
      <div className="row form-create__wrap">
        <p className='form__header mb-5'>{`Prices & Inventory`}</p>
        <div className="col-8">
          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="" className='input__label'>Memberships</label>
            </div>
            <div className="col-9">
              <select className='input__value wd-60' name="" id=""></select>  
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="" className='input__label'>Tax class</label>
            </div>
            <div className="col-3" style={{color: '#fff'}}>
              Default
            </div>
            <div className="col-3">
              <input type="checkbox" name="tax-value" id="tax-value" />
              <label htmlFor="tax-value" className='ms-2' style={{color: '#fff'}}>Tax Exempt</label>
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="" className='input__label'>Price <span className='input__required' style={{color: 'red'}}>*</span></label>
            </div>
            <div className="col-9">
              <input id='price-value' className='input__value wd-30' type="text"/>  
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="" className='input__label'>Arrival date</label>  
            </div>
            <div className="col-9">
              <input type="date" className='input__value' name="" id="" />
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="" className='input__label'>Quantity in stock <span className='input__required' style={{color: 'red'}}>*</span></label>
            </div>
            <div className="col-9">
              <input id='quantity__value' className='input__value wd-30' type="text"/>
            </div>
          </div>
        </div>
      </div>
      <div className="seperate-space"></div>
      <div className="row form-create__wrap">
        <p className='form__header mb-5'>Shipping</p>
        <div className="col-8">
          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="" className='input__label'>Continental U.S</label>
            </div>
            <div className="col-9">
              <input id='continental-value' className='input__value wd-60' type="text"/>    
            </div>
          </div>
          <div className="row form__item">
            <div className="col-3">
            
            </div>
            <div className="col-4">
              <select className='input__value wd-100' name="shippingLocation-select" id="shippingLocation-select"></select>
            </div>
            <div className="col-3 text-end">
              <label htmlFor="" className='input__label'>Add Shipping location</label>  
            </div>
          </div>
        </div>
      </div>
      <div className="seperate-space"></div>
      <div className="row form-create__wrap">
        <p className='form__header mb-5'>Marketing</p>
        <div className="col-8">
          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="graph-select" className='input__label'>Open Graph meta tags</label>
            </div>
            <div className="col-9">
              <select className='input__value wd-60' name="graph-select" id="graph-select"></select>
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="metades-select" className='input__label'>Meta description</label>
            </div>
            <div className="col-9">
              <select className='input__value wd-60' name="metades-select" id="metades-select"></select>
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="metakey__value" className='input__label'>Meta key word</label>
            </div>
            <div className="col-9">
              <input id='metakey__value' className='input__value wd-60' type="text"/>
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="pagetitle__value" className='input__label'>Product page title</label>  
            </div>
            <div className="col-9">
              <input id='pagetitle__value' className='input__value wd-60' type="text"/>
              <p className='input-note'>Leave blank to use product name as Page Title.</p>
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="" className='input__label'>Add to Facebook product feed</label>  
            </div>
            <div className="col-9">
              <ButtonOnOff />
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="" className='input__label'>Add to Google product feed</label>
            </div>
            <div className="col-9">
              <ButtonOnOff />
            </div>
          </div>
        </div>
      </div>
      <div className='fixed-action d-flex'>
        <Button className="rdbtn rdbtn--orange ps-5 pe-5" variant="contained">
          Update
        </Button>
      </div>
    </div>
  )
}

export default DetailProductForm