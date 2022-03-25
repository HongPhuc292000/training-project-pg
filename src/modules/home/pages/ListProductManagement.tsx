import React from 'react';
import Header from '../components/Header';
import ListProductForm1 from '../components/ListProductForm1';
import Sidebar from '../components/Sidebar';
import '../scss/home.scss';

function ListProductManagement() {
  return (
    <>
      <Header />
      <div className='container-fluid main-wrap'>
        <div className='main-container row justify-content-end'>
          <Sidebar />
          <ListProductForm1 />
        </div>
      </div>
    </>
  )
}

export default ListProductManagement