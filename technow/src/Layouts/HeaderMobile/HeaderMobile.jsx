import styles from './HeaderMobile.module.css'
import { Link } from 'react-router-dom'
import { Logo } from '../../Components/Logo/Logo'
import { useState , useEffect } from 'react'
import axios from 'axios'

const HeaderMobile = () => {
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

    return(
    <div className={styles.Container}>
        <nav className={styles.Navbar}>
            <span><Logo color={"green"}/></span>
            <span className={styles.SpanUl}>
                <ul className={styles.Ul}>
                    <li className={styles.Li}><Link to='/newsletter' className={styles.Link}>News</Link></li>
                    <li className={styles.Li}><Link to='/blog' className={styles.Link}>Blogs</Link></li>
                    <li className={styles.Li}><Link to='/contact' className={styles.Link}>Contact Us</Link></li>
                </ul>
            </span>
        </nav>
        <div className={styles.Category}>
        {networkError? (
                <div>
                    <h1 style={errorStyle}>Newtwork Issue</h1>
                </div> 
                ) :(
                    <>
                      <ul className={styles.CategoryUl}>
                        {categories.map((category) => (
                          <li key={category._id} className={styles.Li}>
                            <Link to={`/newsCategory/${category.name}`} className={styles.Link}>
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

export default HeaderMobile