import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';

const ProgramStatusBanner = ({ onClick }) => {
    return (
        <Paper
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            elevation={0}
            className="program-status-header-button"
            sx={{
                p: '8px 12px',
                cursor: 'pointer',
                // REQUIRED: Transparent background and white color
                backgroundColor: 'transparent !important', 
                color: 'white', 
                borderRadius: '4px',
                userSelect: 'none',
                boxShadow: 'none', 
                transition: 'background-color 0.2s',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    boxShadow: 'none', 
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ListAltIcon fontSize="small" sx={{ mr: 1, color: 'inherit' }} />

                <Typography
                    variant="button"
                    component="span"
                    sx={{
                        fontWeight: 'bold',
                        color: 'inherit',
                        lineHeight: 1,
                        // Ensures Title Case: Program Status
                        textTransform: 'capitalize', 
                    }}
                >
                    Program Status 
                </Typography>
            </Box>
        </Paper>
    );
};

export default ProgramStatusBanner;