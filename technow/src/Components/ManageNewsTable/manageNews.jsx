import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import AddNewsModal from './addnewsModal';
import EditNewsModal from './editNewsModal';
import handleAddNews from './addnewsModal'

const ManageNewsTable = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddNewsModal, setShowAddNewsModal] = useState(false);
    const [showEditNewsModal, setShowEditNewsModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    const handleOpenAddNewsModal = () => {
        setShowAddNewsModal(true);
    };

    const handleCloseAddNewsModal = () => {
        setShowAddNewsModal(false);
    };

    const handleOpenEditNewsModal = (news) => {
        setSelectedNews(news);
        setShowEditNewsModal(true);
    };

    const handleCloseEditNewsModal = () => {
        setSelectedNews(null);
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

    const columns = [
        { field: 'author', headerName: 'Author', flex: 1 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 2 },
        { field: 'subtitle', headerName: 'Subtitle', flex: 1 },
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
        <Box sx={{ height: 520, width: '80%', margin: '150px' }}>
            <button onClick={handleOpenAddNewsModal} style={{ backgroundColor: '#119C59', color: 'white', important: 'true' }}>Add News</button>

            <AddNewsModal
                open={showAddNewsModal}
                handleClose={handleCloseAddNewsModal}
                handleAddNews={handleAddNews}
                fetchAllNews={fetchAllNews}
            />


            <EditNewsModal
                open={showEditNewsModal}
                handleClose={handleCloseEditNewsModal}
                selectedNews={selectedNews}
                fetchAllNews={fetchAllNews}
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
    );
};

export default ManageNewsTable;
