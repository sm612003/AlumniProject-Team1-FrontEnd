import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import "../ManageUser/addmodal.css"
import { color } from '@mui/system';

const AddUserModal = ({ open, handleClose, handleAddUser, modalAction, initialUserData }) => {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
    role: 'user',
    Link: '',
    description: "SOFTWARE_DEVELOPMENT",
    image: null,
  });

  useEffect(() => {
    if (modalAction === 'edit' && initialUserData) {
      setNewUser(initialUserData);
    }
  }, [modalAction, initialUserData]);

  const handleInputChange = (field, value) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      [field]: field === 'dob' ? value.toString() : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewUser((prevUser) => ({
      ...prevUser,
      image: file,
    }));
  };
  const [descriptionOptions, setDescriptionOptions] = useState([
    "SOFTWARE_DEVELOPMENT",
    "DATA_ANALYTICS",
    "USER_INTERFACE_DESIGN",
    "NETWORK_INFRASTRUCTURE",
    "DEVOPS",
  ]);

  const handleAddButtonClick = () => {
    console.log(newUser);
    setNewUser(newUser)
    handleAddUser(newUser);
    setNewUser({
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      password: '',
      role: 'user',
      Link: '',
      description: "SOFTWARE_DEVELOPMENT",
      image: null,
    })
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ p: 2, width: 400 }}>
        <h2 style={{ color: '#14B86E' }}>{modalAction === 'edit' ? 'Edit User' : 'Add New User'} </h2>
        <TextField
          label="First Name"
          value={newUser.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          fullWidth
          margin="normal"

        />
        <TextField
          label="Last Name"
          value={newUser.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={newUser.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={newUser.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Link"
          value={newUser.Link}
          onChange={(e) => handleInputChange('Link', e.target.value)}
          fullWidth
          margin="normal"
        />
        {/* <TextField
          label="Description"
          value={newUser.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          fullWidth
          margin="normal"
        /> */}
        <label htmlFor="description">Description</label>
        <select
          id="description"
          name="description"
          value={newUser.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        >
          <option value="" disabled>
            Select a description
          </option>
          {descriptionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FormControl fullWidth margin="normal">
          <InputLabel
            htmlFor="date-of-birth"
            style={{
              transform: 'translate(0, 1.5px) scale(0.80)',
              transformOrigin: 'top left',
              padding: '0.20px',
            }}
          >
            Date of Birth
          </InputLabel>
          <TextField
            id="date-of-birth"
            type="date"
            value={newUser.dob}
            onChange={(e) => handleInputChange('dob', e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: Boolean(newUser.dob) }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={newUser.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            input={<Input />}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <input type="file"  onChange={handleImageChange} />
        <Button variant="contained" onClick={handleAddButtonClick} style={{ backgroundColor: '#14B86E', color: 'white', important: 'true' }}>
          {modalAction === 'edit' ? 'Update User' : 'Add User'}
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddUserModal;
