import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbar
} from '@mui/x-data-grid';
import axios from 'axios';
import AddSubscribeUserModal from './addmodel';

const ManageSubscribeUserTable = () => {
  const [subscribeUserList, setSubscribeUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddSubscribeUserModal, setOpenAddSubscribeUserModal] = useState(false);

  const handleOpenAddSubscribeUserModal = () => {
    setOpenAddSubscribeUserModal(true);
  };

  const handleCloseAddSubscribeUserModal = () => {
    setOpenAddSubscribeUserModal(false);
  };

  const fetchAllSubscribeUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getall/subscribedUsers');
      setSubscribeUserList(response.data);
    } catch (error) {
      console.error('Error fetching subscribed users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSubscribeUsers();
  }, []);

  const handleAddSubscribeUser = async (newSubscribeUser) => {
    try {
      const response = await axios.post('http://localhost:5000/add/subscribedUsers', newSubscribeUser);

      if (response.status === 201) {
        fetchAllSubscribeUsers();
        handleCloseAddSubscribeUserModal();
      } else {
        console.error('Failed to add subscribed user');
      }
    } catch (error) {
      console.error('Error adding subscribed user:', error);
    }
  };

  const handleDeleteSubscribeUser = async (userId) => {
    try {
      const response = await axios.delete('http://localhost:5000/delete/subscribedUsers/' + userId);

      if (response.status === 200) {
        fetchAllSubscribeUsers();
      } else {
        console.error('Failed to delete subscribed user');
      }
    } catch (error) {
      console.error('Error deleting subscribed user:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'NewsLetterId', headerName: 'NewsLetter ID', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleDeleteSubscribeUser(params.row.id)} style={{ backgroundColor: '#e32751', color: 'white', important: 'true' }}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    
    <Box sx={{ height: 520, width: '80%', margin: '150px' }}>
      <button style={{ backgroundColor: '#119C59', color: 'white', important: 'true' }} onClick={handleOpenAddSubscribeUserModal}>Add Subscribe User</button>

      <AddSubscribeUserModal
        open={openAddSubscribeUserModal}
        handleClose={handleCloseAddSubscribeUserModal}
        handleAddSubscribeUser={handleAddSubscribeUser}
      />
      <DataGrid
        rows={subscribeUserList}
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

export default ManageSubscribeUserTable;
