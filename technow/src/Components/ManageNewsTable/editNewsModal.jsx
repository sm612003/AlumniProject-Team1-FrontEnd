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

const EditNewsModal = ({ open, handleClose, handleUpdateNews, selectedNews }) => {
  const [editedNews, setEditedNews] = useState({});
  const [categories, setCategories] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedNewsletterId, setSelectedNewsletterId] = useState('');
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/read/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchNewsletters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/read/newsletter');
        setNewsletters(response.data);
      } catch (error) {
        console.error('Error fetching newsletters:', error);
      }
    };

    if (open) {
      fetchCategories();
      fetchNewsletters();
    }
  }, [open]);

  useEffect(() => {
    if (!selectedNews || !categories || !newsletters) {
      return;
    }

    setEditedNews((prevNews) => ({
      ...prevNews,
      ...selectedNews,
      date: selectedNews.date ? new Date(selectedNews.date).toISOString().split('T')[0] : '',
    }));

    setSelectedCategoryId(selectedNews.categoryId || '');
    setSelectedNewsletterId(selectedNews.newsletterId || '');
  }, [selectedNews, categories, newsletters]);


  useEffect(() => {
  
    if (!selectedNews || !categories || !newsletters) {
      return;
    }
  
    setEditedNews((prevNews) => ({
      ...prevNews,
      ...selectedNews,
      date: selectedNews.date ? new Date(selectedNews.date).toISOString().split('T')[0] : '',
    }));
  
    // Set the selected category and newsletter IDs
    setSelectedCategoryId(selectedNews.categoryId || ''); // Ensure selectedCategoryId is a string
    setSelectedNewsletterId(selectedNews.newsletterId || ''); // Ensure selectedNewsletterId is a string
  
  }, [selectedNews, categories, newsletters]);
  
  
  const handleInputChange = (field, value) => {
  
    setEditedNews((prevNews) => ({
      ...prevNews,
      [field]: field === 'date' ? value.toString() : value,
    }));
  
    // If the field is either category or newsletter, update the corresponding state
    if (field === 'categoryId') {
      setSelectedCategoryId(value);
    } else if (field === 'newsletterId') {
      setSelectedNewsletterId(value);
    }
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
  
      // Append the updated fields to formData (excluding image and categoryId)
      Object.entries(editedNews).forEach(([key, value]) => {
        if (key !== 'image' && key !== 'categoryId') {
          // Format date field to ISO-8601 DateTime format
          formData.append(key, key === 'date' ? new Date(value).toISOString() : value);
        }
      });
  
      // Append categoryId as an integer
      formData.append('categoryId', parseInt(editedNews.categoryId) || 0);
  
      // Append the image separately
      formData.append('image', editedNews.image);
  
      // Make a PATCH request to update the specific news post
      await axios.patch(`http://localhost:5000/update/news/${editedNews.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      });
  
      // After updating, fetch the latest news
      handleUpdateNews();
      handleClose();
// console.log('editedNews:', editedNews);

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
  value={editedNews.categoryId || ''}
  onChange={(e) => handleInputChange('categoryId', e.target.value)}
  input={<Input id="category-select" />}
>
  {categories && categories.map((category) => (
    <MenuItem key={category.id} value={String(category.id)}>
      {category.name}
    </MenuItem>
  ))}
</Select>


        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Newsletter ID</InputLabel>
          <Select
            value={selectedNewsletterId}
            onChange={(e) => handleInputChange('newsletterId', e.target.value)}
            input={<Input />}
          >
            {newsletters && newsletters.map((newsletter) => (
              <MenuItem key={newsletter.id} value={newsletter.id}>
                {newsletter.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input type="file" onChange={handleImageChange} />

        <Button
          variant="contained"
          onClick={handleUpdateButtonClick}
          style={{ backgroundColor: '#14B86E', color: 'white', marginTop: '10px' }}
        >
          Update News
        </Button>
      </Box>
    </Dialog>
  );
};

export default EditNewsModal;