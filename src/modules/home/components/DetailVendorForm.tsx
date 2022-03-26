import React from 'react';
import '../scss/home.scss';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { IDetailProfile } from '../models/userModals';
import AroundButton from '../common/AroundButton';
import moment from 'moment';
import Button from '@mui/material/Button';

interface Props{
  id: string,
  vendor: string
}

function DetailVendorForm(props: Props) {
  const { id, vendor } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [loading, setLoading] = React.useState(false);
  const [vendorData, setVendorData] = React.useState<IDetailProfile | undefined>()


  const getVendorData = React.useCallback(async()=>{
    setLoading(true)
    const json = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/apiVendor/profile/detail', 'post', {id: id}),
    );
    setVendorData(json.data);
    setLoading(false);
  },[id]);

  const handleConvertDate = (dateString: string | undefined)=>{
    if(dateString == undefined){
      dateString = '0';
    }
    const dateConverted = moment(Number.parseInt(dateString) * 1000).format('lll');
    return dateConverted;
  }

  React.useEffect(()=>{
    getVendorData()
  },[id])

  return (
    <div className="col-10 form-wrap">
      <div className="row form-create__wrap">
        <AroundButton linkto="/listUsers"/>
        <h2 className='col-12 form__header border-bottom pb-4 mb-4' style={{textTransform: 'none'}}>{vendorData?.info.email}</h2>
        <div className="col-12">
          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="#" className='input__label'>Orders placed as a buyer</label>
            </div>
            <div className="col-3">
              <label htmlFor="#" className='input__label'>{vendorData?.info.order_as_buyer}</label>
            </div>
          </div>
          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="#" className='input__label'>Vendor Income</label>
            </div>
            <div className="col-3">
              <label htmlFor="#" className='input__label'>{vendorData?.info.income}</label>
            </div>
          </div>
          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="#" className='input__label'>Vendor Expense</label>
            </div>
            <div className="col-3">
              <label htmlFor="#" className='input__label'>{vendorData?.info.expense}</label>
            </div>
          </div>
          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="#" className='input__label'>View transaction details</label>
            </div>
            <div className="col-3">
              <label htmlFor="#" className='input__label'></label>
            </div>
          </div>
          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="#" className='input__label'>Earning balance</label>
            </div>
            <div className="col-3">
              <label htmlFor="#" className='input__label'>{vendorData?.info.earning}</label>
            </div>
          </div>
          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="#" className='input__label'>Products listed as vendor</label>
            </div>
            <div className="col-3">
              <label htmlFor="#" className='input__label'>{vendorData?.info.products_total}</label>
            </div>
          </div>
          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="#" className='input__label'>Joined</label>
            </div>
            <div className="col-3">
              <label htmlFor="#" className='input__label'>{handleConvertDate(vendorData?.info.joined)}</label>
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="#" className='input__label'>Last login</label>
            </div>
            <div className="col-3">
              <label htmlFor="#" className='input__label'>{handleConvertDate(vendorData?.info.last_login)}</label>
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="#" className='input__label'>Language</label>
            </div>
            <div className="col-3">
              <label htmlFor="#" className='input__label'>{vendorData?.info.language}</label>
            </div>
          </div>

          <div className="row form__item">
            <div className="col-3 text-end">
              <label htmlFor="#" className='input__label'>Referer</label>
            </div>
            <div className="col-3">
              <label htmlFor="#" className='input__label'>{vendorData?.info.referer}</label>
            </div>
          </div>
        </div>
      </div>
      <div className="seperate-space"></div>
      <div className="row form-create__wrap">
        <p className='form__header mb-3 mt-3'>{"Email & password"}</p>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label' >First name <span className='input__required' style={{color: '#fff'}}>*</span></label>
          </div>
          <div className="col-3">
            <input id='firstname__value' className='input__value wd-100' type="text" value={vendorData?.info.firstName} />  
          </div>
        </div>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label' >Last name <span className='input__required' style={{color: '#fff'}}>*</span></label>
          </div>
          <div className="col-3">
            <input id='lastname__value' className='input__value wd-100' type="text" value={vendorData?.info.lastName} />  
          </div>
        </div>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label' >Email <span className='input__required' style={{color: '#fff'}}>*</span></label>
          </div>
          <div className="col-3">
            <input id='email__value' className='input__value wd-100' type="text" value={vendorData?.info.email} />  
          </div>
        </div>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label' >Password</label>
          </div>
          <div className="col-3">
            <input id='email__value' className='input__value wd-100' type="text" />  
          </div>
        </div>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label' >Confirm password</label>
          </div>
          <div className="col-3">
            <input id='email__value' className='input__value wd-100' type="text" />  
          </div>
        </div>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label' >Type</label>
          </div>
          <div className="col-3"> </div>
        </div>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label' >PaymentRails ID</label>
          </div>
          <div className="col-3"> </div>
        </div>
      </div>
      <div className="seperate-space"></div>
      <div className="row form-create__wrap">
        <p className='form__header mb-3 mt-3'>Access information</p>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label'>Access level</label>
          </div>
          <div className="col-3">
            <label htmlFor="#" className='input__label'>{vendorData?.account_roles[0].name}</label>
          </div>
        </div>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label'>Roles</label>
          </div>
          <div className="col-3">
            <select className='input__value wd-100' name="brand-select" id="brand-select"></select>
          </div>
        </div>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label'>Account status <span className='input__required' style={{color: 'red'}}>*</span></label>
          </div>
          <div className="col-3">
            <select className='input__value wd-100' name="brand-select" id="brand-select"></select>
          </div>
        </div>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label'>{"Status comment (reason)"}</label>
          </div>
          <div className="col-6">
            <textarea className='input__value wd-100' name="" id="" cols={60} rows={2}>{vendorData?.info.statusComment}</textarea>
          </div>
        </div>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label'>Membership  </label>
          </div>
          <div className="col-3">
            <select className='input__value wd-100' name="brand-select" id="brand-select"></select>
          </div>
        </div>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="#" className='input__label'>Pending membership</label>
          </div>
          <div className="col-3">
            <label htmlFor="#" className='input__label'>{vendorData?.info.pending_membership_id ? vendorData?.info.pending_membership_id : 'none'}</label>
          </div>
        </div>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="require-changepw" className='input__label'>Require to change password on next log in</label>
          </div>
          <div className="col-3">
            <input type="checkbox" name="require-changepw" id="require-changepw" />
          </div>
        </div>
      </div>
      <div className="seperate-space"></div>
      <div className="row form-create__wrap">
        <p className='form__header mb-3 mt-3'>Tax information</p>
        <div className="row form__item">
          <div className="col-3 text-end">
            <label htmlFor="tax-exempt" className='input__label'>Tax exempt</label>
          </div>
          <div className="col-3">
            <input type="checkbox" name="tax-exempt" id="tax-exempt" />
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

export default DetailVendorForm