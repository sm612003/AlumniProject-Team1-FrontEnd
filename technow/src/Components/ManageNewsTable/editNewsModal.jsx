// EditNewsModal.js

import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Input } from '@mui/material';
import axios from 'axios';

const EditNewsModal = ({ open, handleClose, handleUpdateNews, selectedNews, categories, newsletters }) => {
    const [editedNews, setEditedNews] = useState({});
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedNewsletterId, setSelectedNewsletterId] = useState('');
  
    useEffect(() => {
      if (!selectedNews) {
        return;
      }
  
      setEditedNews((prevNews) => ({
        ...prevNews,
        ...selectedNews,
        date: selectedNews.date ? new Date(selectedNews.date).toISOString().split('T')[0] : '',
      }));
  
      // Set the selected category and newsletter IDs
      setSelectedCategoryId(selectedNews.categoryId || '');
      setSelectedNewsletterId(selectedNews.newsletterId || '');
    }, [selectedNews]);
  
    const handleInputChange = (field, value) => {
      setEditedNews((prevNews) => ({
        ...prevNews,
        [field]: field === 'date' ? value.toString() : value,
      }));
    };
  
    const handleImageChange = (e) => {
      setEditedNews((prevNews) => ({
        ...prevNews,
        image: e.target.files[0],
      }));
    };
  
    const handleUpdateButtonClick = async () => {
      try {
        const formData = new FormData();
        Object.entries(editedNews).forEach(([key, value]) => {
          formData.append(key, value);
        });
  
        // Make a PATCH request to update the news post
        await axios.patch(`http://localhost:5000/update/news/${editedNews.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // After updating, fetch the latest news
        handleUpdateNews();
        handleClose();
      } catch (error) {
        console.error('Error updating news:', error);
      }
    };
  
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ p: 2, width: 400 }}>
        <h2 style={{ color: '#14B86E' }}>Edit News</h2>
        <TextField
          label="Author"
          value={editedNews.author}
          onChange={(e) => handleInputChange('author', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Title"
          value={editedNews.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          value={editedNews.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: Boolean(editedNews.date) }}
        />
        <TextField
          label="Description"
          value={editedNews.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Subtitle"
          value={editedNews.subtitle}
          onChange={(e) => handleInputChange('subtitle', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Subtitle Description"
          value={editedNews.subtitleDescription}
          onChange={(e) => handleInputChange('subtitleDescription', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Link"
          value={editedNews.link}
          onChange={(e) => handleInputChange('link', e.target.value)}
          fullWidth
          margin="normal"
        />
       <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="category-select">Category ID</InputLabel>
          <Select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            input={<Input id="category-select" />}
          >
            {categories && categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Newsletter ID</InputLabel>
          <Select
            value={selectedNewsletterId}
            onChange={(e) => setSelectedNewsletterId(e.target.value)}
            input={<Input />}
          >
            {newsletters && newsletters.map((newsletter) => (
              <MenuItem key={newsletter.id} value={newsletter.id}>
                {newsletter.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* ... other fields ... */}
        <input type="file" onChange={handleImageChange} />
        <Button
          variant="contained"
          onClick={handleUpdateButtonClick}
          style={{ backgroundColor: '#14B86E', color: 'white', important: 'true' }}
        >
          Update News
        </Button>
      </Box>
    </Dialog>
  );
};

export default EditNewsModal;