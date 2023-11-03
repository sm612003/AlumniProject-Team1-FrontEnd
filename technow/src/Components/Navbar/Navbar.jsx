import navStyle from "./Navbar.module.css"
import { Weather } from "../Weather/Weather";
// import Logo 

const Navbar = () => {
  

  return (
    <nav className={navStyle.NavbarItems}>
      <div className={navStyle.Left}>
      <h1 className={navStyle.navbarlogo}>TechNow</h1>
      </div>

        <div className={navStyle.Middle}>
      <ul className={navStyle.navMenu}>
      <li><a className={navStyle.navLinks} href='#'>Newsletter</a></li>
        <li><a className={navStyle.navLinks} href='#'>Blog</a></li>
        <li ><a className={navStyle.navLinks} href='#'>Contact us</a></li>
        <li ><a className={navStyle.navLinks} href='#'></a><Weather/></li>
      </ul>
      </div>
      <button>Subscribe</button>
    </nav>
  );
}

export default Navbar;

