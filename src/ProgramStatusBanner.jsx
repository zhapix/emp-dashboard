import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';

const ProgramStatusBanner = ({ onClick }) => {
    return (
        <Paper
            onClick={onClick}
            // Use role="button" and tabIndex for accessibility since we are using Paper for a click action
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                // Allows activation via keyboard (Enter or Space)
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault(); // Prevent default scroll for Spacebar
                    onClick();
                }
            }}
            elevation={0} // Ensures no default shadow
            className="program-status-header-button"
            sx={{
                // === STYLES TO ACHIEVE TRANSPARENT LOOK ===
                p: '8px 12px', // Slightly adjusted padding for header links
                cursor: 'pointer',

                // Set background to transparent and text/icon color to white
                backgroundColor: 'transparent', 
                color: 'white', 
                
                // Ensure no shadows or rounded corners from Paper are visible
                borderRadius: '4px', 
                boxShadow: 'none', 
                userSelect: 'none',

                // CRITICAL: Ensure no centering margins or max-width interfere
                maxWidth: 'unset',
                margin: '0',
                
            }}
        >
            <Box
                sx={{
                    // Ensures icon and text align horizontally
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Icon size small, right margin 1, color inherits from Paper (white) */}
                <ListAltIcon fontSize="small" sx={{ mr: 1, color: 'inherit' }} />

                <Typography
                    // === CRITICAL FIX: Add back typography styling ===
                    variant="button" // Provides default uppercase and font size
                    component="span"
                    sx={{
                        fontWeight: 'bold', // Explicitly make the text bold
                        color: 'inherit', // Ensure it uses the 'white' color from the parent Paper
                        lineHeight: 1,
                    }}
                >
                    program status
                </Typography>
            </Box>
        </Paper>
    );
};

export default ProgramStatusBanner;