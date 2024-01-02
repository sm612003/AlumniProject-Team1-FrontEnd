import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import AddBlogModal from './AddBLogModal'; // Import the modal for adding/editing blogs
import { Helmet } from 'react-helmet';

const ManageBlogTable = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddBlogModal, setOpenAddBlogModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openEditBlogModal, setOpenEditBlogModal] = useState(false);
  const [userList, setUserList] = useState([]); // State for user list

  const handleOpenEditBlogModal = (blog) => {
    setSelectedBlog(blog);
    setOpenEditBlogModal(true);
  };

  const handleCloseEditBlogModal = () => {
    setSelectedBlog(null);
    setOpenEditBlogModal(false);
  };

  const handleOpenAddBlogModal = () => {
    setOpenAddBlogModal(true);
  };

  const handleCloseAddBlogModal = () => {
    setOpenAddBlogModal(false);
  };

  // Fetch user list
  const fetchUserList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/view-all');
      setUserList(response.data.Users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUserList(); // Fetch user list on component mount
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/read/blogs');
      setBlogList(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  useEffect(() => {
  }, [blogList]);

  const handleAddBlog = async (blogData) => {
    try {
      const response = await axios.post('http://localhost:5000/add/blogs', blogData);

      if (response.status === 200) {
        fetchAllBlogs();
        handleCloseAddBlogModal();
      } else {
        console.error('Failed to add blog');
      }
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  const handleEditBlog = async (blogId, updatedBlogData) => {
    try {
      const formData = new FormData();

      // Iterate through entries of updatedBlogData and append to formData
      for (const [key, value] of updatedBlogData.entries()) {
        formData.append(key, value);
      }

      // Log the formData for debugging

      const response = await axios.patch(`http://localhost:5000/update/blogs/${blogId}`, formData);

      if (response.status === 200) {
        fetchAllBlogs();
        handleCloseEditBlogModal();
      } else {
        console.error('Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };





  const handleDeleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/blogs/${blogId}`);

      if (response.status === 200) {
        fetchAllBlogs();
      } else {
        console.error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'author', headerName: 'Author', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'content', headerName: 'Content', flex: 2 },
    { field: 'image', headerName: 'Image', flex: 1 },
    { field: 'userId', headerName: 'User ID', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleOpenEditBlogModal(params.row)}
            style={{ backgroundColor: '#1E90FF', color: 'white', margin: '4px' }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteBlog(params.row.id)}
            style={{ backgroundColor: '#e32751', color: 'white', margin: '4px' }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
    <Helmet>
      <title>Manage Blogs</title>
      <meta name="description" content="Manage blog entries in your application with ease." />
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Manage Blogs",
            "description": "Manage blog entries in your application with ease.",
            "url": "http://localhost:3000/dashboard/blogs",
          }
        `}
      </script>
    </Helmet>
  
    <main>
      <section>
        <Box sx={{ height: 520, width: '80%', margin: '150px' }}>
          <button
            onClick={handleOpenAddBlogModal}
            style={{ backgroundColor: '#119C59', color: 'white', margin: '4px' }}
          >
            Add Blog
          </button>
  
          <AddBlogModal
            open={openEditBlogModal || openAddBlogModal}
            handleClose={handleCloseEditBlogModal}
            handleAddBlog={handleAddBlog}
            handleEditBlog={handleEditBlog}
            selectedBlog={selectedBlog}
            userList={userList}
          />
  
          <DataGrid
            rows={blogList}
            columns={columns}
            loading={loading}
            disableRowSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Box>
      </section>
    </main>
  </>
  
  );
};

export default ManageBlogTable;