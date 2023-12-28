import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden
} from '@mui/x-data-grid-premium';
import axios from 'axios';
import AddSubscribeUserModal from './addmodel';


const ManageSubscribeUserTable = () => {
  const [subscribeUserList, setSubscribeUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddSubscribeUserModal, setOpenAddSubscribeUserModal] = useState(false);

  const apiRef = useGridApiRef();

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

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      sorting: {
        sortModel: [{ field: 'createdAt', sort: 'desc' }],
      },
    },
  });

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
    { field: 'NewsLetterId', headerName: 'NewsLetter ID', flex: 1 }, // Add this line
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleDeleteSubscribeUser(params.row.id)} style={{ backgroundColor: '#94DD8B', color: 'white', important: 'true' }}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: 520, width: '80%', margin: 'auto', backgroundColor: '#14B86E' }}>
      <button style={{ backgroundColor: '#94DD8B', color: 'white', important: 'true' }} onClick={handleOpenAddSubscribeUserModal}>Add Subscribe User</button>

      <AddSubscribeUserModal
        open={openAddSubscribeUserModal}
        handleClose={handleCloseAddSubscribeUserModal}
        handleAddSubscribeUser={handleAddSubscribeUser}
      />

      <DataGridPremium
        rows={subscribeUserList}
        columns={columns}
        apiRef={apiRef}
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