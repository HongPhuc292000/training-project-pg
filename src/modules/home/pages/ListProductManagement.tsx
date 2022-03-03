import React from 'react';
import Header from '../components/Header';
import ListProductForm from '../components/ListProductForm';
import Sidebar from '../components/Sidebar';
import '../scss/home.scss';

function ListProductManagement() {
  return (
    <>
      <Header />
      <div className='container-fluid main-wrap'>
        <div className='main-container row justify-content-end'>
          <Sidebar />
          <ListProductForm />
        </div>
      </div>
    </>
  )
}

export default ListProductManagement