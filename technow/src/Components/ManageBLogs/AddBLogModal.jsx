import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
import axios from 'axios';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  background-color: white;
  padding: 20px;
  border: 1px solid #000;
  outline: none;
  width: 400px;
`;

const AddBlogModal = ({ open, handleClose, handleAddBlog, handleEditBlog, selectedBlog, userList }) => {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        if (selectedBlog) {
            setAuthor(selectedBlog.author || '');  // Make sure to handle the case where the value is undefined
            setTitle(selectedBlog.title || '');
            setContent(selectedBlog.content || '');
            setUserId(selectedBlog.userId || ''); // Set the user ID for editing
        } else {
            setAuthor('');
            setTitle('');
            setContent('');
            setImage(null);
            setUserId(''); // Clear the user ID for adding
        }
    }, [selectedBlog]);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('author', author);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        formData.append('userId', userId); // Include the selected user ID

        if (selectedBlog) {
            // If editing, call handleEditBlog
            handleEditBlog(selectedBlog.id, formData);
        } else {
            // If adding, call handleAddBlog
            handleAddBlog(formData);
        }

        handleClose();
    };

    useEffect(() => {
    }, [userId]);

    return (
        <StyledModal open={open} onClose={handleClose}>
            <StyledBox>
                <h2>{selectedBlog ? 'Edit Blog' : 'Add Blog'}</h2>
                <TextField
                    label="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                />

                <Select
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{ marginTop: '10px' }}
                >

                    <MenuItem value="" disabled>
                        Select User
                    </MenuItem>
                    {userList.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.firstName} {user.lastName}
                        </MenuItem>
                    ))}
                </Select>



                <input type="file" accept="image/*" onChange={handleFileChange} />
                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
                    {selectedBlog ? 'Update Blog' : 'Add Blog'}
                </Button>
                <Button variant="contained" onClick={handleClose} style={{ marginTop: '10px', marginLeft: '10px' }}>
                    Cancel
                </Button>

            </StyledBox>
        </StyledModal>
    );
};

export default AddBlogModal;
