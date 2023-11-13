import navStyle from "./Navbar.module.css"
import { Weather } from "../Weather/Weather";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { Button } from "../Buttons/Buttons";
import { useState, useEffect } from "react";

const Navbar = () => {

  return (
    <nav className={navStyle.NavbarItems}>
      <div className={navStyle.Left}>
        <Logo color={"green"}/>
      </div>

        <div className={navStyle.Middle}>
      <ul className={navStyle.navMenu}>
      <Link to="./newsletter">
        <li>
          <p className={navStyle.navLinks}>Newsletter</p>
        </li>
      </Link>
      <Link to='/blog'>
        <li>
          <p className={navStyle.navLinks}>Blog</p>
        </li>
      </Link>
      <Link to="./contact">
        <li>
          <p className={navStyle.navLinks}>Contact us</p>
        </li>
      </Link>
        <li>
        <Weather/>
        </li>
      </ul>
      </div>
      <Link to='/subscribe'>
        <Button color={"green"} size={"small"} text={"Subscribe"} subscribed={true}/>
      </Link>
    </nav>
  );
}

export default Navbar;

