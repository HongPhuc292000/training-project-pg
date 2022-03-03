import React from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import GroupIcon from '@mui/icons-material/Group';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InboxIcon from '@mui/icons-material/Inbox';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '../scss/home.scss';

function Sidebar() {
  return (
    <ul className='sidebar col-2 pe-0'>
      <li className="sidebar-item">
        <a href="" className='sidebar-item__link'>
          <div className='sidebar-item__title'><InboxIcon /><span>Orders</span></div>
          <div className='sidebar-item__show'><ArrowBackIosIcon /></div>
        </a>
      </li>
      <li className="sidebar-item">
        <a href="" className='sidebar-item__link'>
          <div className='sidebar-item__title'><LocalOfferIcon /><span>Catalog</span></div>
          <div className='sidebar-item__show'><ArrowBackIosIcon /></div>
        </a>
        <ul>
          <li className='sidebar-item'>
            <a href="">Products</a>
          </li>
        </ul>
      </li>
      <li className="sidebar-item">
        <a href="" className='sidebar-item__link'>
          <div className='sidebar-item__title'><GroupIcon /><span>User</span></div>
          <div className='sidebar-item__show'><ArrowBackIosIcon /></div>
        </a>
      </li>
      <li className="sidebar-item">
        <a href="" className='sidebar-item__link'>
          <div className='sidebar-item__title'><LanguageIcon /><span>Sales channels</span></div>
          <div className='sidebar-item__show'><ArrowBackIosIcon /></div>
        </a>
      </li>
    </ul>
  )
}

export default Sidebar