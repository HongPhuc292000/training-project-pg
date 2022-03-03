import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../scss/home.scss';

function UserManagement() {
  return (
    <>
      <Header />
      <div className='container-fluid main-wrap'>
        <div className='main-container row'>
          <Sidebar />
          <div className="col-10 p-0">
            
          </div>
        </div>
      </div>
    </>
  )
}

export default UserManagement