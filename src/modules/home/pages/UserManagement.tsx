import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ListUsersForm from '../components/ListUsersForm';
import '../scss/home.scss';

function UserManagement() {
  return (
    <>
      <Header />
      <div className='container-fluid main-wrap'>
        <div className='main-container row justify-content-end'>
          <Sidebar />
          <ListUsersForm />
        </div>
      </div>
    </>
  )
}

export default UserManagement