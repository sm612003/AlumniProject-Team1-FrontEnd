import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import AddUserModal from './addmodel';

const ManageUserTable = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    dob: new Date(),
    email: '',
    password: '',
    role: 'user',
    Link: '',
    description: '',
    image: null,
  });
  const [openAddUserModal, setOpenAddUserModal] = useState(false);

  const handleOpenAddUserModal = () => {
    setOpenAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/view-all');
      setUserList(response.data.Users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleNewUserChange = (field, value) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      const formData = new FormData();
      Object.entries(newUser).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post('http://localhost:5000/user/create', formData);

      if (response.status === 200) {
        fetchAllUsers();
        setShowUserForm(false);
        setNewUser({
          firstName: '',
          lastName: '',
          dob: new Date(),
          email: '',
          password: '',
          role: 'user',
          Link: '',
          description: '',
          image: null,
        });
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete('http://localhost:5000/user/delete', {
        data: { id: userId },
      });

      if (response.status === 200) {
        fetchAllUsers();
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'dob',
      headerName: 'Date of Birth',
      flex: 1,
      type: 'date',
      valueGetter: (params) => new Date(params.row.dob),
    },
    { field: 'Link', headerName: 'Link', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleDeleteUser(params.row.id)} style={{ backgroundColor: '#94DD8B', color: 'white', important: 'true' }}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: 520, width: '80%', margin: 'auto', backgroundColor: '#14B86E' }}>
      <button onClick={handleOpenAddUserModal} style={{ backgroundColor: '#94DD8B', color: 'white', important: 'true' }}>Add User</button>

      <AddUserModal
        open={openAddUserModal}
        handleClose={handleCloseAddUserModal}
        handleAddUser={handleAddUser}
      />

      <DataGrid
        rows={userList}
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

export default ManageUserTable;