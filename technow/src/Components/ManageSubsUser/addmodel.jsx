import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const AddSubscribeUserModal = ({ open, handleClose, handleAddSubscribeUser }) => {
  const [newSubscribeUser, setNewSubscribeUser] = useState({
    email: '',
    NewsLetterId: '',
  });

  const handleInputChange = (field, value) => {
    setNewSubscribeUser((prevSubscribeUser) => ({
      ...prevSubscribeUser,
      [field]: field === 'NewsLetterId' ? parseInt(value) : value,
    }));
  };

  const handleAddButtonClick = () => {
    handleAddSubscribeUser(newSubscribeUser);
    // Note: Don't close the modal here
  };

  useEffect(() => {
    if (!open) {
      // Reset state when the modal is closed
      setNewSubscribeUser({
        email: '',
        NewsLetterId: '',
      });
    }
  }, [open]);

  const handleModalClose = () => {
    handleClose(); // Close the modal after the state has been updated
  };

  return (
    <Dialog open={open} onClose={handleModalClose} onExited={handleModalClose}>
      <Box sx={{ p: 2, width: 400 }}>
        <h2 style={{ color: '#14B86E' }}>Add New Subscribe User</h2>
        <TextField
          label="Email"
          value={newSubscribeUser.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="NewsLetterId"
          value={newSubscribeUser.NewsLetterId}
          onChange={(e) => handleInputChange('NewsLetterId', e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleAddButtonClick} style={{ backgroundColor: '#14B86E', color: 'white', important: 'true' }}>
          Add Subscribe User
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddSubscribeUserModal;
