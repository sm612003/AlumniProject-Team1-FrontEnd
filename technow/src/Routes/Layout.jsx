import Footer from "../Layouts/Footer/Footer.jsx";
import NavBar from "../Layouts/NavBar/NavBar.jsx";
function LayoutWithHeaderFooter({ children }) {
  return (
    <>
      <div>
        <NavBar/>
        {children}
        <Footer />
      </div>
    </>
  );
}

export default LayoutWithHeaderFooter;
