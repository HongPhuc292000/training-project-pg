import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router';
import '../scss/home.scss';
import DetailVendorForm from '../components/DetailVendorForm';

function UserDetails() {
  const { id, vendor } = useParams<{id:string, vendor: string}>();

  return (
    <>
      <Header />
      <div className='container-fluid main-wrap'>
        <div className='main-container row justify-content-end'>
          <Sidebar />
          <DetailVendorForm id={id} vendor={vendor}/>
        </div>
      </div>
    </>
  )
}

export default UserDetails