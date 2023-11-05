import { Link } from "react-router-dom";
import styles from "./Category.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
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
  );
};

export default Category;