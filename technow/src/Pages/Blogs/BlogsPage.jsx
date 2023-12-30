import styles from "./BlogsPage.module.css";
import BlogCard from "../../Components/BlogCard/BlogCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import { Button } from "../../Components/Buttons/Buttons";
import { Link, useNavigate, useParams } from "react-router-dom";
import magnifire from "../../Assets/Images/magnifire.jpeg";
import BlogDetails from "../BlogsDetails/BlogsDetails";
import { margin } from "@mui/system";

const BlogCardLayout = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(screenWidth < 1024 ? "small" : "big");

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
      setWidth(newWidth < 1024 ? "small" : "big");
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [blogData, setBlogData] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //network err
  useEffect(() => {
    const handleOffline = () => {
      setNetworkError(true);
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (blogData.length ===0) {setIsLoading(true)
      setError("No blogs")
        }
        if (!navigator.onLine) {
          setNetworkError(true);
          setError(false);
          setIsLoading(false);
          return;
        }
        const response = await axios.get(`http://localhost:5000/read/blogs`);
        if (response) {
          setBlogData(response.data);
          console.log("blogs " + response.data);
        } else if (!response === 200) {
          setError(true);
          setIsLoading(false);
          setError(false);
          setNetworkError(false);
        }
        if (blogData) {
          setIsLoading(false);
          setError(false);
          setNetworkError(false);
        }
      } catch (error) {
        // console.log("error");
        if (error.message === "Network request failed") {
          setNetworkError(true);
          setIsLoading(false);
        } else {
          setError(true);
        }
        window.addEventListener("offline", () => {
          setNetworkError(true);
          setError(false);
          setIsLoading(false);
        });
        console.error("API Error: ", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const errorStyle = {
    display: "flex",
    color: "red",
    padding: "10px",
    borderRadius: "5px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  };
  // Handles changes in the search input.
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const filterBlogsByTitle = (blogToFilter, searchInput) => {
    if (searchInput) {
      return blogToFilter.filter(
        (ray) =>
          ray.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          ray.author.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    return blogToFilter;
  };
  const filteredBlog = filterBlogsByTitle(blogData, searchInput);
  console.log("filtered blogg :  " + filteredBlog);

  //get blog by ID
  const navigate = useNavigate();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleBlogCardClick = (clickedBlogId) => {
    try {
      // Navigate to the single blog page with the correct URL
      navigate(`/blogDetails/${clickedBlogId}`);
    } catch (error) {
      // Handle navigation error
      console.error("Error navigating to blog details:", error);
    }
  };

  return (
    <>
      <div className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.h1}>Blogs</h1>
          <form className={styles.bookSearch}>
            <input
              id="search"
              className={styles.inputSearch}
              type="text"
              placeholder="   Search For Blog's Title, Or Author's name"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <button type="button" className={styles.searchButton}>
              <img src={magnifire} alt="search img" width="25" height="20" />
            </button>
          </form>
          {isLoading ? (
            <div style={containerStyle}>
              <h1>Loading ...</h1>
            </div>
          ) : networkError ? (
            <div style={containerStyle}>
              <h1 style={errorStyle}>Newtwork Issue</h1>
            </div>
          ) : error ? (
            <div style={containerStyle}>
              <h1 style={errorStyle}>{error}</h1>
            </div>
          ) : (
            <>
              <span>
                <h2 className={styles.pheader}>Blog your news</h2>
                <Link to="/login" className={styles.Link}>
                  <Button
                    color={"green"}
                    text={"Add Blog"}
                    size={width}
                    subscribed={false}
                  />
                </Link>
              </span>

              {filteredBlog.length > 0 ? (
                filteredBlog.map((blog, index) => (
                  // on click go to blogdetail page and pass param id to this page
                  <Link to={`/blogDetails/${blog.id}`} key={blog.id}>
                    <BlogCard
                      key={blog.id}
                      title={blog.title}
                      author={blog.author}
                      image={blog.image}
                      createdAt={blog.createdAt}
                      reversed={index % 2 === 0}
                      id={blog.id}
                      onClick={() => handleBlogCardClick(blog.id)}
                    />
                  </Link>
                ))
              ) : (
                <p style={{ color: "#ff0000", marginTop: "10px" }}>
                  No matching blogs found.
                </p>
              )}
            </>
          )}
        </header>
      </div>
      <ScrollButton />
    </>
  );
};

export default BlogCardLayout;
