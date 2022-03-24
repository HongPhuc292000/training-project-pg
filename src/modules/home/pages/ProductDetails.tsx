import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router';
import '../scss/home.scss';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { IProduct } from '../models/productModal';
import DetailVendorForm from '../components/DetailVendorForm';

function ProductDetails() {

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { id } = useParams<{id:string | undefined}>();
  const [data,setData] = React.useState<IProduct>();

  const getData = React.useCallback(async()=>{
    const json = await dispatch(
      fetchThunk(`https://api.gearfocus.div4.pgtest.co/api/products/list`, 'get'),
    );
    setData(json.data.find((item:any)=>{
      item.id == id;
    }))
  },[])
  
  console.log(data);
  
  return (
    <>
      <Header />
      <div className='container-fluid main-wrap'>
        <div className='main-container row justify-content-end'>
          <Sidebar />
          <DetailVendorForm />
        </div>
      </div>
    </>
  )
}

export default ProductDetails