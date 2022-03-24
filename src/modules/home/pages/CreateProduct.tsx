import React from 'react'
import CreateProductForm from '../components/CreateProductForm'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function CreateProduct() {
  return (
    <>
      <Header />
      <div className='container-fluid main-wrap'>
        <div className='main-container row justify-content-end'>
          <Sidebar />
          <CreateProductForm />
        </div>
      </div>
    </>
  )
}

export default CreateProduct