
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden
} from '@mui/x-data-grid-premium';
import  '../tablenews/recentNews.css'; // Import your CSS file


const RecentNewsGrid = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiRef = useGridApiRef();

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/latest');
        const data = await response.json();
        setLatestNews(data);
      } catch (error) {
        console.error('Error fetching latest news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      sorting: {
        sortModel: [{ field: 'date', sort: 'desc' }],
      },
    },
  });

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'author', headerName: 'Author', flex: 1 },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      type: 'date',
      valueGetter: (params) => new Date(params.row.date),
    },
    { field: 'description', headerName: 'Description', flex: 2 },
    { field: 'categoryId', headerName: 'Category ID', flex: 1 },
    { field: 'subtitle', headerName: 'Subtitle', flex: 1 },
    { field: 'subtitleDescription', headerName: 'Subtitle Description', flex: 2 },
    // Add more columns as needed
  ];


  

  return (
      <Box sx={{ height: 520, width: '60%', '& .MuiDataGrid-root': { backgroundColor: '#14B86E' } }}>
        <DataGridPremium
          rows={latestNews}
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

export default RecentNewsGrid;