import React from 'react';
import { 
    Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Box, Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Utility function to format date from YYYY-MM-DD to DD-MM-YYYY
const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        const [year, month, day] = dateString.split('-');
        // Check for valid format before restructuring
        if (year && month && day) {
            return `${day}-${month}-${year}`; // DD-MM-YYYY format
        }
        return dateString;
    } catch (error) {
        return dateString; // Return original if parsing fails
    }
};

// --- Final Mock Data ---
const mockData = [
    { id: 1, category: 'Pre-Bootcamp', section: 'Preliminary', status: 'completed', expDate: '2025-01-10', compDate: '2025-01-10', comment: '' },
    { id: 2, category: 'Mastery Sessions', section: 'Bootcamp', status: 'pending', expDate: '2025-10-11', compDate: '', comment: '' },
    { id: 3, category: 'Workshops', section: 'Workshop 1\nWorkshop 2', status: 'completed', expDate: '2025-10-12', compDate: '2025-10-12', comment: '' },
    { id: 4, category: 'Value added Training', section: 'Add-on Sessions', status: 'pending', expDate: '2025-10-15', compDate: '', comment: '' }, 
    { id: 5, category: 'Zhapix Internal Projects', section: 'Internship', status: 'pending', expDate: '2025-10-20', compDate: '', comment: '' },
    { id: 6, category: 'Project Extension', section: 'Internship and Extension', status: 'pending', expDate: '2025-11-15', compDate: '', comment: '' },
];
// -----------------------------------------------------------

// --- INLINE TASK ROW LOGIC ---
const TaskRow = ({ task }) => {
    const isCompleted = task.status === 'completed';
    const rawDate = isCompleted ? task.compDate : task.expDate;
    
    // Apply date formatting
    const displayDate = formatDate(rawDate); 

    const StatusIcon = isCompleted ? CheckCircleIcon : CancelIcon;
    const iconColor = isCompleted ? 'success' : 'error';

    const renderSection = (section) => {
        if (!section) return null;
        
        return section.split('\n').map((line, index) => (
            <Typography 
                key={index} 
                variant="body2" 
                component="div" 
                sx={{ whiteSpace: 'pre-wrap' }} 
            >
                {line}
            </Typography>
        ));
    };

    return (
        <TableRow 
            hover
            // 🛠️ FINAL FIX: Added cursor pointer to indicate the row is interactive
            sx={{ cursor: 'pointer' }}
        >
            <TableCell sx={{ fontWeight: 'bold' }}>{task.category}</TableCell>
            <TableCell>{renderSection(task.section)}</TableCell>
            <TableCell align="center">
                <StatusIcon color={iconColor} fontSize="medium" />
            </TableCell>
            <TableCell align="center" sx={{ color: isCompleted ? 'green' : 'red' }}>
                {displayDate}
            </TableCell>
            <TableCell>
                {task.comment || ''}
            </TableCell>
        </TableRow>
    );
};
// -----------------------------------------------------------

function ProgramStatusPage({ onBack }) {
    const tasks = mockData;
    const PAGE_MAX_WIDTH = '95%'; 

    return (
        <div className="program-status-page-container">
            
            {/* Header Section: Stacked vertically and left-aligned */}
            <Box 
                className="program-status-header"
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    justifyContent: 'flex-start', 
                    
                    mb: 3, 
                    p: 2,
                    bgcolor: '#2c3e50', 
                    color: 'white',
                    maxWidth: PAGE_MAX_WIDTH, 
                    margin: '0 auto', 
                }}
            >
                <Button 
                    variant="contained" 
                    onClick={onBack} 
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 1.5, bgcolor: '#3498db', '&:hover': { bgcolor: '#2980b9' } }} 
                >
                    BACK TO DASHBOARD
                </Button>
                
                <Typography 
                    variant="h5" 
                    component="h1" 
                    sx={{ fontWeight: 'bold' }}
                >
                    Program Status
                </Typography>
            </Box>

            {/* Program Status Table (With adjusted column widths) */}
            <TableContainer 
                component={Paper} 
                className="program-status-table-container"
                sx={{ 
                    mb: 4,
                    boxShadow: 3,
                    maxWidth: PAGE_MAX_WIDTH, 
                    margin: '20px auto', 
                }}
            > 
                <Table size="small" aria-label="Program Status Table" className="program-status-table">
                    
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#e8e8e8' }}>
                            {/* Final Column Widths: 20% | 37% | 8% | 15% | 20% */}
                            <TableCell sx={{ fontWeight: 'bold', width: '5%', padding: '12px 16px' }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '5%', padding: '12px 16px' }}>Task/Section</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '5%', padding: '12px 16px' }} align="center">Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '5%', padding: '12px 16px' }} align="center">Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '5%', padding: '12px 16px' }}>Comment</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {tasks.map((task) => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ProgramStatusPage;