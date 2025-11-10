import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';

const ProgramStatusBanner = ({ onClick }) => {
    return (
        <Paper 
            onClick={onClick}
            elevation={3}
            className="program-status-banner-container"
            sx={{
                p: 3,
                mb: 3,
                cursor: 'pointer',
                textAlign: 'center',
                
                // Base Blue background color (Prevents the white box bug when idle)
                backgroundColor: '#1976d2', 
                color: 'white',
                
                // Centering styles
                maxWidth: '300px', 
                margin: '24px auto', 
                
                // Hover effect uses a darker blue, NOT white
                '&:hover': {
                    backgroundColor: '#1565c0', // Darker blue for feedback
                    color: 'white', 
                    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.3)',
                },
                transition: '0.2s', 
            }}
        >
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                }}
            >
                <ListAltIcon fontSize="large" sx={{ mr: 1, color: 'inherit' }} />
                <Typography variant="h5" component="h5" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                    Program Status 
                </Typography>
            </Box>
        </Paper>
    );
};

export default ProgramStatusBanner;