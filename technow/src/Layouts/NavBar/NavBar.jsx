import React, { useEffect, useState } from 'react'
import style from "../../Layouts/NavBar/NavBar.module.css";
import { Weather } from "../../Components/Weather/Weather.jsx";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../Components/Logo/Logo";
import Email from '@mui/icons-material/Email'
import Drafts from '@mui/icons-material/Drafts'
import { AccountPopover } from '../TopNav/AccountPopover';
import { usePopover } from '../TopNav/usePopover';
import { Avatar } from '@mui/material';
const NavBar = () => {
  const accountPopover = usePopover();
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsOpen(false); // Close the navbar when resizing
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <nav className={style.container}>
      <Logo color={"green"} />


      {(windowWidth < 900) ?
      //mobile View
      <label class={style.menuButtonWrapper} for="">
        <input type="checkbox" class={style.menuButton} />
        <div class={style.iconWrapper}>
          <label class={style.hamburger}>
            <input class={style.hamburgerInput} type="checkbox" />
            <span class={`${style.hamburgerLine} ${style.first}`}></span>
            <span class={`${style.hamburgerLine} ${style.second}`}></span>
            <span class={`${style.hamburgerLine} ${style.third}`}></span>
          </label>
        </div>
        <ul class={style.itemList}>
          <Link to="/newsletter">
            <li>
              <p className={style.navLinks}>News</p>
            </li>
          </Link>
          <Link to='/blogs'>
            <li>
              <p className={style.navLinks}>Blog</p>
            </li>
          </Link>
          <Link to="/users">
            <li>
              <p className={style.navLinks}>users</p>
            </li>
          </Link>
          <Link to="/profile">
            <li>
              <p className={style.navLinks}>Profile</p>
            </li>
          </Link>
          <Link to="/contact">
            <li>
              <p className={style.navLinks}>Contact us</p>
            </li>
          </Link>
          <Link to="/subscribe">
            <li>
              <p className={style.navLinks}>Subscribe</p>
            </li>
          </Link>
          <Link to="/login">
            <li>
              <p className={style.navLinks}>LogIn</p>
            </li>
          </Link>
        </ul>
      </label>

        : <>

         <div className={`${style.navbar}`}>
          <ul className={`${style.navbarLinks} ${isOpen ? style.open : ''}`}>
            <Link to="/newsletter">
              <li>
                <p className={style.navLinks}>News</p>
              </li>
            </Link>
            <Link to='/blogs'>
              <li>
                <p className={style.navLinks}>Blog</p>
              </li>
            </Link>
            <Link to="/users">
              <li>
                <p className={style.navLinks}>users</p>
              </li>
            </Link>
            <Link to="/contact">
              <li>
                <p className={style.navLinks}>Contact us</p>
              </li>
            </Link>
          </ul>
        </div>
          <div className={style.containerRight}>
            <NavLink to='/subscribe'>
              {({ isActive }) => (
                <button className={style.subscribe}>{isActive ? <Drafts sx={{ color: "white", marginRight: 0.5 }} /> : <Email sx={{ color: "white", marginRight: 0.5 }} />} Subscribe</button>
              )}
            </NavLink>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40,
                marginLeft: 1.5
              }}
              src=""
            />
          </div>
         {(windowWidth>900 && windowWidth<1000)?'':<Weather />}
        </>}

      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />

    </nav>
  )
}

export default NavBar
