// EditNewsModal.js

import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { Input } from '@mui/material';

const EditNewsModal = ({ open, handleClose, selectedNews, fetchAllNews }) => {
    const [editedNews, setEditedNews] = useState({ ...selectedNews });
    const [categories, setCategories] = useState([]); // State to store categories
    const [newsletters, setNewsletters] = useState([]); // State to store newsletters

    useEffect(() => {
        if (selectedNews) {
          setEditedNews((prevNews) => ({
            ...prevNews,
            date: selectedNews.date ? new Date(selectedNews.date).toISOString().split('T')[0] : '',
            categoryId: selectedNews.categoryId,
            newsletterId: selectedNews.newsletterId,
          }));
      
          // Fetch categories and newsletters here
          fetchCategories();
          fetchNewsletters();
        }
      }, [selectedNews]);
      

    const fetchCategories = async () => {
        try {
            // Fetch categories from your API endpoint
            const response = await axios.get('http://localhost:5000/read/category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchNewsletters = async () => {
        try {
            // Fetch newsletters from your API endpoint
            const response = await axios.get('http://localhost:5000/read/newsletter');
            setNewsletters(response.data);
        } catch (error) {
            console.error('Error fetching newsletters:', error);
        }
    };

    const handleInputChange = (field, value) => {
        const formattedDate = field === 'date' ? new Date(value).toLocaleDateString('en-US') : value;

        setEditedNews((prevNews) => ({
            ...prevNews,
            [field]: formattedDate,
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

            // Add the ID of the news post to the FormData
            formData.append('id', editedNews.id);

            // Make a PATCH request to update the news
            await axios.patch('http://localhost:5000/update/news', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // After updating, fetch the latest news
            fetchAllNews();
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
                    <InputLabel>Category ID</InputLabel>
                    <Select
                        value={editedNews.categoryId}
                        onChange={(e) => handleInputChange('categoryId', e.target.value)}
                        input={<Input />}
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
                        value={editedNews.newsletterId}
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
                {/* ... (other input fields) */}
            </Box>
        </Dialog>
    );
};

export default EditNewsModal;