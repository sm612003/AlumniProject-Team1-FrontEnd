import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import AddNewsModal from './addnewsModal';
import EditNewsModal from './editNewsModal';
import { Helmet } from 'react-helmet';

const ManageNewsTable = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddNewsModal, setShowAddNewsModal] = useState(false);
    const [selectedNewsForEdit, setSelectedNewsForEdit] = useState(null);
    const [showEditNewsModal, setShowEditNewsModal] = useState(false);
      
    // Declare newNews state here
    const [newNews, setNewNews] = useState({
      author: '',
      title: '',
      date: '',
      description: '',
      subtitle: '',
      subtitleDescription: '',
      link: '',
      categoryId: '',
      newsletterId: '',
      image: null,
    });
  
    const handleOpenAddNewsModal = () => {
      setShowAddNewsModal(true);
    };
  
    const handleCloseAddNewsModal = () => {
      setShowAddNewsModal(false);
    };
  
    const handleOpenEditNewsModal = (news) => {
      setSelectedNewsForEdit(news);
      setShowEditNewsModal(true);
    };
    
  
    const handleCloseEditNewsModal = () => {
      setSelectedNewsForEdit(null);
      setShowEditNewsModal(false);
    };
    
  
    const fetchAllNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/read/news');
        setNewsList(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchAllNews();
    }, []);
  
    const handleDeleteNews = async (newsId) => {
      try {
        const response = await axios.delete('http://localhost:5000/delete/news', {
          data: { id: newsId },
        });
  
        if (response.status === 200) {
          fetchAllNews();
        } else {
          console.error('Failed to delete news');
        }
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    };
  
    const handleAddButtonClick = () => {
        handleOpenAddNewsModal();
      };
  
    const columns = [
        { field: 'author', headerName: 'Author', flex: 1 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 2 },
        { field: 'subtitle', headerName: 'Subtitle', flex: 1 },
        { field: 'subtitleDescription', headerName: 'Subtitle Description', flex: 2 },
        { field: 'link', headerName: 'Link', flex: 1 },
        { field: 'categoryId', headerName: 'Category ID', flex: 1 },
        { field: 'newsletterId', headerName: 'Newsletter ID', flex: 1 },
        {
          field: 'actions',
          headerName: 'Actions',
          flex: 2,
          renderCell: (params) => (
            <div>
              <button onClick={() => handleDeleteNews(params.row.id)} style={{ backgroundColor: '#e32751', color: 'white', important: 'true' }}>Delete</button>
              <button onClick={() => handleOpenEditNewsModal(params.row)} style={{ backgroundColor: '#119C59', color: 'white', important: 'true' }}>Edit</button>
            </div>
          ),
        },
      ];

    return (
      <>
  <Helmet>
    <title>Manage News</title>
    <meta name="description" content="Manage news articles in your application with ease." />
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Manage News",
          "description": "Manage news articles in your application with ease.",
          "url": "http://localhost:3000/dashboard/news",
        }
      `}
    </script>
  </Helmet>

  <main>
    <section>
      <Box sx={{ height: 520, width: '80%', margin: '150px' }}>
        <button
          onClick={handleAddButtonClick}
          style={{ backgroundColor: '#119C59', color: 'white', important: 'true' }}
        >
          Add News
        </button>

        <AddNewsModal
          open={showAddNewsModal}
          handleClose={handleCloseAddNewsModal}
          handleAddNews={fetchAllNews}
          newNews={newNews}
          setNewNews={setNewNews}
        />

        <EditNewsModal
          open={showEditNewsModal}
          handleClose={handleCloseEditNewsModal}
          handleUpdateNews={fetchAllNews}
          selectedNews={selectedNewsForEdit}
        />

        <DataGrid
          rows={newsList}
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
    
    export default ManageNewsTable;