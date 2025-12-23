import React from 'react';
import {
    Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Box, Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Mock data structure
const mockTasks = [
    { id: 't1', category: 'Pre-Bootcamp', section: 'Preliminary Assessment', status: 'completed', expDate: '2025-01-10', compDate: '2025-01-10', comment: 'Completed on time.' },
    { id: 't2', category: 'Mastery Sessions', section: 'Advanced JavaScript/React', status: 'pending', expDate: '2025-10-11', compDate: '', comment: 'Next session scheduled.' },
    { id: 't3', category: 'Workshops', section: 'Workshop 1: Architecture\nWorkshop 2: Security', status: 'completed', expDate: '2025-10-12', compDate: '2025-10-12', comment: 'All core workshops finished.' },
    { id: 't4', category: 'Value added Training', section: 'Add-on Sessions (Cloud)', status: 'pending', expDate: '2025-10-15', compDate: '', comment: 'Awaiting cloud platform access.' },
    { id: 't5', category: 'Zhapix Internal Projects', section: 'Internship Project Start', status: 'pending', expDate: '2025-10-20', compDate: '', comment: 'Project brief finalized.' },
    { id: 't6', category: 'Project Extension', section: 'Internship and Extension', status: 'pending', expDate: '2025-11-15', compDate: '', comment: 'Not yet started.' },
];

// Utility function to format date
const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        const [year, month, day] = dateString.split('-');
        if (year && month && day) {
            return `${day}-${month}-${year}`;
        }
        return dateString;
    } catch (error) {
        return dateString;
    }
};

// --- Table Row Component ---
const TaskRow = ({ task }) => {
    const isCompleted = task.status === 'completed';
    const rawDate = isCompleted ? task.compDate : task.expDate;
    const displayDate = formatDate(rawDate);

    const StatusIcon = isCompleted ? CheckCircleIcon : CancelIcon;
    const iconStyle = { color: isCompleted ? '#4caf50' : '#a0a0a0' }; // Green for check, Red for X

    const renderSection = (section) => {
        if (!section) return null;
        return section.split('\n').map((line, index) => (
            <Typography
                key={index}
                variant="body2"
                component="div"
                sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.4 }}
            >
                {line}
            </Typography>
        ));
    };

    return (
        <TableRow hover sx={{ cursor: 'pointer' }}>
            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>
                {task.category}
            </TableCell>

            <TableCell sx={{ width: '35%' }}>
                {renderSection(task.section)}
            </TableCell>

            <TableCell sx={{ width: '10%' }} align="center">
                <StatusIcon sx={iconStyle} fontSize="medium" />
            </TableCell>

            <TableCell
                sx={{
                    width: '15%',
                    color: isCompleted ? 'green' : '#a0a0a0',
                    fontWeight: isCompleted ? 'bold' : 'normal'
                }}
                align="center"
            >
                {displayDate}
            </TableCell>

            <TableCell sx={{ width: '20%' }}>
                {task.comment || ''}
            </TableCell>
        </TableRow>
    );
};

// --- Program Status Page Component ---
export default function ProgramStatusPage({ onBack, tasks = mockTasks }) {
    const PAGE_MAX_WIDTH = '1200px';
    
    // Logic to open Zoho Sheet
    const handleOpenZoho = () => {
        const zohoSheetUrl = "https://sheet.zohopublic.in/sheet/open/mp0218248fb34dd214f4788b81786e582d475?sheetid=0&range=A1";
        window.open(zohoSheetUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <Box 
            className="program-status-page-container"
            sx={{
                maxWidth: PAGE_MAX_WIDTH,
                margin: '0 auto',
                padding: '20px',
                minHeight: '100vh',
               
            }}
        >
            {/* Header Section */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 2 
            }}>
                <Button
                    variant="text" 
                    onClick={onBack}
                    startIcon={<ArrowBackIcon sx={{ fontSize: '1.2rem' }} />}
                    sx={{
                        textTransform: 'none',
                        color: 'white',
                        fontSize: '1.1rem',
                       
                    }}
                >
                    Back to Dashboard
                </Button>

                <Button
                    variant="contained"
                    onClick={handleOpenZoho}
                    endIcon={<OpenInNewIcon />}
                    sx={{
                        textTransform: 'none',
                        backgroundColor: '#2c3e50',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '6px',
                        '&:hover': { backgroundColor: '#34495e' }
                    }}
                >
                    Zoho Sheet
                </Button>
            </Box>

            {/* Centered Heading */}
            <Box sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                    Program Status
                </Typography>
            </Box>
            
            {/* Table */}
            <TableContainer
                component={Paper}
                sx={{
                    mb: 4,
                    overflowX: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
            >
                <Table size="medium" aria-label="Program Status Table" sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'white' }}>
                            <TableCell sx={{ fontWeight: 'bold', width: '20%', }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '35%',  }}>Task/Section</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '10%',  }} align="center">Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '15%', }} align="center">Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '20%',  }}>Comment</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tasks.map((task) => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}