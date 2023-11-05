import navStyle from "./Navbar.module.css"
import { Weather } from "../Weather/Weather";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { Button } from "../Buttons/Buttons";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [collapesed, setCollapsed] = useState(false);

  useEffect(() => {
      function updateSize() {
          if (window.innerWidth > 600) {
              setCollapsed(false)
          }

      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
  }, []);

  const toggleClasses = [navStyle.linksWrapperMobile, collapesed ? navStyle.activeNav : ''].join(' ');
  const bar1 = [navStyle.line1, collapesed ? navStyle.a : ''].join(' ');
  const bar2 = [navStyle.line2, collapesed ? navStyle.a : ''].join(' ');
  const bar3 = [navStyle.line3, collapesed ? navStyle.a : ''].join(' ');
  const bae4 = [navStyle.line4, collapesed ? navStyle.a : ''].join(' ');
  const bar5 = [navStyle.line5, collapesed ? navStyle.a : ''].join(' ');

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

