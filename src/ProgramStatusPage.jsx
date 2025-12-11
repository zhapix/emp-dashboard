import React from 'react';
import {
    Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Box, Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Mock data structure remains the same
const mockTasks = [
    { id: 't1', category: 'Pre-Bootcamp', section: 'Preliminary Assessment', status: 'completed', expDate: '2025-01-10', compDate: '2025-01-10', comment: 'Completed on time.' },
    { id: 't2', category: 'Mastery Sessions', section: 'Advanced JavaScript/React', status: 'pending', expDate: '2025-10-11', compDate: '', comment: 'Next session scheduled.' },
    { id: 't3', category: 'Workshops', section: 'Workshop 1: Architecture\nWorkshop 2: Security', status: 'completed', expDate: '2025-10-12', compDate: '2025-10-12', comment: 'All core workshops finished.' },
    { id: 't4', category: 'Value added Training', section: 'Add-on Sessions (Cloud)', status: 'pending', expDate: '2025-10-15', compDate: '', comment: 'Awaiting cloud platform access.' },
    { id: 't5', category: 'Zhapix Internal Projects', section: 'Internship Project Start', status: 'pending', expDate: '2025-10-20', compDate: '', comment: 'Project brief finalized.' },
    { id: 't6', category: 'Project Extension', section: 'Internship and Extension', status: 'pending', expDate: '2025-11-15', compDate: '', comment: 'Not yet started.' },
];

// Utility function to format date from YYYY-MM-DD to DD-MM-YYYY
const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        const [year, month, day] = dateString.split('-');
        if (year && month && day) {
            return `${day}-${month}-${year}`; // DD-MM-YYYY format
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
    const iconClassName = isCompleted ? 'status-icon-completed' : 'status-icon-pending';

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
        <TableRow hover sx={{ cursor: 'pointer' }} className="program-status-table-row">

            {/* 1. CATEGORY: Mobile visibility enabled (width: 20%) */}
            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>
                {task.category}
            </TableCell>

            {/* 2. TASK/SECTION: Reduced default width for mobile */}
            <TableCell sx={{ width: '35%' }}>
                {renderSection(task.section)}
            </TableCell>

            {/* 3. STATUS */}
            <TableCell sx={{ width: '10%' }} align="center">
                <StatusIcon
                    className={iconClassName}
                    fontSize="medium"
                />
            </TableCell>

            {/* 4. DATE */}
            <TableCell
                sx={{
                    width: '15%',
                    color: isCompleted ? 'green' : '#a0a0a0'
                }}
                align="center"
            >
                {displayDate}
            </TableCell>

            {/* 5. COMMENT: Mobile visibility enabled (width: 20%) */}
            <TableCell sx={{ width: '20%' }}>
                {task.comment || ''}
            </TableCell>
        </TableRow>
    );
};

// --- Program Status Page Component ---
export default function ProgramStatusPage({ onBack, tasks = mockTasks }) {
    const PAGE_MAX_WIDTH = '1200px';

    return (
        <div className="program-status-page-container"
            style={{
                maxWidth: PAGE_MAX_WIDTH,
                margin: '0 auto',
                padding: '20px'
            }}>

            {/* Header Section (Back Button) */}
            <Box sx={{ mb: 1, p: 0 }}>
                <Button
                    variant="text" 
                    onClick={onBack}
                    startIcon={<ArrowBackIcon sx={{ fontSize: '1.2rem' }} />} // KEY CHANGE: Increased icon size
                    sx={{
                        textTransform: 'none',
                        color: 'white',
                        fontSize: '1.2rem', // KEY CHANGE: Increased text size
                    }}
                >
                    Back to Dashboard
                </Button>
            </Box>

            {/* Program Status Heading Container - Center Aligned */}
            <Box
                className="program-status-heading-container"
                sx={{
                    width: '100%',
                    textAlign: 'center', // Centers the text
                    mb: 3, 
                    p: 0,
                    color: 'white',
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{ fontWeight: 'bold' }}
                >
                    Program Status
                </Typography>
            </Box>
            
            {/* Program Status Table */}
            <TableContainer
                component={Paper}
                className="program-status-table-container"
                sx={{
                    mb: 4,
                    overflowX: 'auto',
                }}
            >
                <Table
                    size="small"
                    aria-label="Program Status Table"
                    className="program-status-table"
                    sx={{ minWidth: 800 }}
                >
                    <TableHead>
                        {/* Table Header Row: Black background, white text */}
                        <TableRow sx={{ bgcolor: '#0e0d0dff' }} className="program-status-table-header">

                            {/* 1. CATEGORY: Now visible on mobile. Color fixed to white. */}
                            <TableCell sx={{ fontWeight: 'bold', width: '20%', padding: '12px 16px', color: 'white' }}>Category</TableCell>

                            {/* 2. TASK/SECTION: Color fixed to white. */}
                            <TableCell sx={{ fontWeight: 'bold', width: '35%', padding: '12px 16px', color: 'white' }}>Task/Section</TableCell>

                            {/* 3. STATUS: Color fixed to white. */}
                            <TableCell sx={{ fontWeight: 'bold', width: '10%', padding: '12px 16px', color: 'white' }} align="center">Status</TableCell>

                            {/* 4. DATE: Color fixed to white. */}
                            <TableCell sx={{ fontWeight: 'bold', width: '15%', padding: '12px 16px', color: 'white' }} align="center">Date</TableCell>

                            {/* 5. COMMENT: Now visible on mobile. Color fixed to white. */}
                            <TableCell sx={{ fontWeight: 'bold', width: '20%', padding: '12px 16px', color: 'white' }}>Comment</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(tasks || mockTasks).map((task) => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}