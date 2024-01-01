// AddNewsModal.js

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

const AddNewsModal = ({ open, handleClose, handleAddNews, modalAction, initialNewsData }) => {
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

  const [categories, setCategories] = useState([]);
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    // Fetch categories and newsletters when the modal is opened
    const fetchCategoriesAndNewsletters = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:5000/read/category');
        const newslettersResponse = await axios.get('http://localhost:5000/read/newsletter');

        setCategories(categoriesResponse.data);
        setNewsletters(newslettersResponse.data);
      } catch (error) {
        console.error('Error fetching categories and newsletters:', error);
      }
    };

    if (open) {
      fetchCategoriesAndNewsletters();
    }
  }, [open]);

  const handleInputChange = (field, value) => {
    setNewNews((prevNews) => ({
      ...prevNews,
      [field]: field === 'date' ? value.toString() : value,
    }));
  };

  const handleImageChange = (e) => {
    setNewNews((prevNews) => ({
      ...prevNews,
      image: e.target.files[0],
    }));
  };

  const handleAddButtonClick = async () => {
    try {
      const formData = new FormData();
      Object.entries(newNews).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Make a POST request to add the new news post
      await axios.post('http://localhost:5000/add/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // After adding, fetch the latest news
      const response = await axios.get('http://localhost:5000/read/news');

      // Pass the new news object to the parent component
      handleAddNews(response.data);

      // Reset the form fields
      setNewNews({
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

      handleClose();
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };


  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ p: 2, width: 400 }}>
        <h2 style={{ color: '#14B86E' }}>{modalAction === 'edit' ? 'Edit News' : 'Add New News'} </h2>
        <TextField
          label="Author"
          value={newNews.author}
          onChange={(e) => handleInputChange('author', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Title"
          value={newNews.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          fullWidth
          margin="normal"
        />
        <InputLabel
          htmlFor="date"
          style={{
            transform: 'translate(0, 1.5px) scale(0.80)',
            transformOrigin: 'top left',
            padding: '1px',
          }}
        >
          Date
        </InputLabel>
        <TextField
          type="date"
          value={newNews.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          fullWidth
          margin="normale"
          InputLabelProps={{ shrink: Boolean(newNews.date) }}

        />
        <TextField
          label="Description"
          value={newNews.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Subtitle"
          value={newNews.subtitle}
          onChange={(e) => handleInputChange('subtitle', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Subtitle Description"
          value={newNews.subtitleDescription}
          onChange={(e) => handleInputChange('subtitleDescription', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Link"
          value={newNews.link}
          onChange={(e) => handleInputChange('link', e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="category-select">Category ID</InputLabel>
          <Select
            value={newNews.categoryId}
            onChange={(e) => handleInputChange('categoryId', e.target.value)}
            input={<Input id="category-select" />}
          >

            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Newsletter ID</InputLabel>
          <Select
            value={newNews.newsletterId}
            onChange={(e) => handleInputChange('newsletterId', e.target.value)}
            input={<Input />}
          >
            {newsletters.map((newsletter) => (
              <MenuItem key={newsletter.id} value={newsletter.id}>
                {newsletter.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input type="file" onChange={handleImageChange} />
        <Button
          variant="contained"
          onClick={handleAddButtonClick}
          style={{ backgroundColor: '#14B86E', color: 'white', important: 'true' }}
        >
          {modalAction === 'edit' ? 'Update News' : 'Add News'}
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddNewsModal;
