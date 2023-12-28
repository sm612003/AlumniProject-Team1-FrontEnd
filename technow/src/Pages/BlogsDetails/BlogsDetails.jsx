
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import BlogDetailsComponent from "../../Components/BlogDetails/BlogDetailsComponent";
const BlogsDetails = () => {
  const { id } = useParams();// pass id as param 

  const [blogDetails, setBlogDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/read/blogsById/${id}` //put id in param
        );

        if (response.status === 200) {
          setBlogDetails(response.data);
          console.log("those image   "+response.data.image)
        } else {
          console.error("API Error: ", response);
        }
      } catch (error) {
        console.error("API Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
   
        <BlogDetailsComponent
          title={blogDetails.title}
          author={blogDetails.author}
          image={blogDetails.image}
          createdAt={blogDetails.createdAt}
          content={blogDetails.content}
        />
      )}
      <Link to="/blogs">Back to Blogs</Link>
    </div>
  );

};

export default BlogsDetails;
