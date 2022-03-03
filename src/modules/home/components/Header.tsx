import React from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../scss/home.scss';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header-wrap container-fluid'>
      <div className='header-container'>
        <div className='menu-btn'>
          <MenuIcon />
        </div>
        <Link to={'/listProduct'} className="logo-btn">Gear Focus Admin</Link>
        <div className='noti-btn'>
          <NotificationsNoneIcon />
        </div>
      </div>
      <div className='header-container'>
        <AccountCircleIcon className='user-btn'/>
      </div>
    </div>
  )
}

export default Header