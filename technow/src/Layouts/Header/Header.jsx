import navStyle from "../../Components/Navbar/Navbar.module.css"
import { Weather } from "../../Components/Weather/Weather.jsx";
import { Link } from "react-router-dom";
import { Logo } from "../../Components/Logo/Logo";
import { Button } from "../../Components/Buttons/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../Components/CategoryCard/Category.module.css";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/read/category');
        setCategories(response.data);
        setNetworkError(false);
      } catch (error) {
        console.error(error);
        setNetworkError(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleOffline = () => {
      setNetworkError(true);
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const errorStyle = {
    display: "flex",
    color: "red",
    padding: "10px",
    borderRadius: "5px",
  };
  return (
    <div>
       <nav className={navStyle.NavbarItems}>
      <div className={navStyle.Left}>
        <Logo color={"green"}/>
      </div>

        <div className={navStyle.Middle}>
      <ul className={navStyle.navMenu}>
        <li>
          <Link to="./newsletter" className={navStyle.navLinks}>
          Newsletter
          </Link>
        </li>
        <li>
          <Link className={navStyle.navLinks} to='/blog'>
          Blog
          </Link>
        </li>
        <li>
          <Link className={navStyle.navLinks} to="./contact">
          Contact us
          </Link>
        </li>
        <li>
        <Weather/>
        </li>
      </ul>
      </div>
      <Link className={navStyle.navLinks} to='/subscribe'>
        <Button color={"green"} size={"small"} text={"Subscribe"} subscribed={true}/>
      </Link>
    </nav>
    <div className={styles.container}>
      {networkError? (
                <div>
                    <h1 style={errorStyle}>Newtwork Issue</h1>
                </div> 
                ) :(
                    <>
                      <ul className={styles.categ}>
                        {categories.map((category) => (
                          <li key={category._id} className={styles.categMenu}>
                            <Link to={`/newsCategory/${category.name}`} className={styles.categLinks}>
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
        )}
    </div>
    </div>
    
  )
}

export default Header ;