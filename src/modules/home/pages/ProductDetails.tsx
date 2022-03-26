import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router';
import '../scss/home.scss';
import DetailProductForm from '../components/DetailProductForm';

function ProductDetails() {
  const { id } = useParams<{id:string}>();
  
  return (
    <>
      <Header />
      <div className='container-fluid main-wrap'>
        <div className='main-container row justify-content-end'>
          <Sidebar />
          <DetailProductForm id={id}/>
        </div>
      </div>
    </>
  )
}

export default ProductDetails