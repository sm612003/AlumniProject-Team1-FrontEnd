import React, { useState, useEffect } from "react";
import HeaderMobile from "../Layouts/HeaderMobile/HeaderMobile.jsx";
import Footer from "../Layouts/Footer/Footer.jsx";
import Header from "../Layouts/Header/Header.jsx";
import NavBar from "../Layouts/NavBar/NavBar.jsx";
function LayoutWithHeaderFooter({ children }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [nav, setNav] = useState(screenWidth < 800 ? true : false);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
      setNav(newWidth < 800 ? true : false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div>
        <NavBar/>
        {/* {nav ? <HeaderMobile /> : <Header />} */}
        {children}
        <Footer />
      </div>
    </>
  );
}

export default LayoutWithHeaderFooter;
