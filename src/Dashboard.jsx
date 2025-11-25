import React, { useEffect, useState } from 'react';
import {
    Typography,
    Box,
    Avatar,
} from '@mui/material';
import {
    ChatBubbleOutline,
    EmailOutlined,
    CloudUploadOutlined,
    PeopleOutline,
    MenuBookOutlined,
    GitHub,
} from '@mui/icons-material';

import './Dashboard.css';
import EmployeeProfile from './EmployeeProfile';
import './EmployeeProfile.css';
import ProgramStatusBanner from './ProgramStatusBanner';
import ProgramStatusPage from './ProgramStatusPage';
import './ProgramStatusStyles.css';


// Card Component: Renders a single link card in the grid
const Card = ({ title, link, icon }) => {
    const handleClick = () => {
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            className="card"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleClick();
            }}
        >
            <Box className="card-icon">{icon}</Box>
            <Typography variant="body1" className="card-text">
                {title}
            </Typography>
        </div>
    );
};

const Dashboard = () => {
    const [userEmail, setUserEmail] = useState('');
    const [selectedProfileEmail, setSelectedProfileEmail] = useState(null);
    const [showProgramStatusPage, setShowProgramStatusPage] = useState(false);

    useEffect(() => {
        const searchParamVals = new URLSearchParams(window.location.search);
        setUserEmail(searchParamVals.get('userEmail') || '');
    }, []);

    const profileInfoMapping = {
        'aarthi.g@coe.zhapix.com': { name: 'Aarthi Gopal', avatarUrl: './Aarthig.jpeg'},
        'yogesh.b@coe.zhapix.com': { name: 'Yogesh Kumar B', avatarUrl: './yogesh.jpg' },
        'sunitha.c@coe.zhapix.com': { name: 'Sunitha Chanda', avatarUrl: './Sunitha.jpeg'},
        'vijayan.t@zhapix.com': { name: 'Vijayan Thanigaivelu', avatarUrl: './vijayan.jpg' },
        'samruthha.l@coe.zhapix.com': { name: 'Samruthha Lakshmi', avatarUrl: './Samruthha.png'},
        'ronald.k@coe.zhapix.com':{ name: 'Ronald Kevin', avatarUrl: './Kevin.png' },
        'rudra.l@coe.zhapix.com':{ name: 'Rudramoorthy', avatarUrl:'./Rudra.png' },
        'ashwathi.p@coe.zhapix.com':{ name: 'Ashwathi Palaniraj', avatarUrl: './Ashwathi.png'},
        'deepika.j@coe.zhapix.com':{ name: 'Deepika Jaikumar', avatarUrl: './Deepika.jpg' },
    };

    const normalizedEmail = userEmail.toLowerCase();
    const currentUserProfile = profileInfoMapping[normalizedEmail];
    const displayName = currentUserProfile?.name || userEmail;
    const avatarImage = currentUserProfile?.avatarUrl;

    const cards = [
        { title: 'Chat', link: 'https://cliq.zoho.in/', icon: <ChatBubbleOutline fontSize="large" /> },
        { title: 'Email', link: 'https://mail.zoho.in/zm/#mail/folder/inbox', icon: <EmailOutlined fontSize="large" /> },
        { title: 'Drive', link: 'https://workdrive.zoho.in/', icon: <CloudUploadOutlined fontSize="large" /> },
        { title: 'GitHub', link: 'https://github.com/zhapix-coe/', icon: <GitHub fontSize="large" /> },
        { title: 'People', link: 'https://people.zoho.in/', icon: <PeopleOutline fontSize="large" /> },
        { title: 'Learn', link: 'https://irp.zhapix.com', icon: <MenuBookOutlined fontSize="large" /> },
    ];

    const getInitials = (email) => {
        if (!email) return '';

        const nameToUse = currentUserProfile?.name;
        if (nameToUse) {
            return nameToUse.charAt(0).toUpperCase();
        }

        return email.charAt(0).toUpperCase();
    };

    const handleEmailClick = (event) => {
        // Close other views before toggling profile view
        setShowProgramStatusPage(false);
        // Toggles the EmployeeProfile view
        setSelectedProfileEmail(prevEmail => prevEmail ? null : normalizedEmail);

        if (event && event.currentTarget) {
            event.currentTarget.blur();
        }
    };

    const handleProgramStatusClick = () => {
        // Close profile view
        setSelectedProfileEmail(null);
        // Open Program Status view
        setShowProgramStatusPage(true);
    };

    const handleBackFromProgramStatus = () => {
        setShowProgramStatusPage(false);
    };

    // --- Conditional Rendering for Profile and Status Pages ---

    if (selectedProfileEmail) {
        const selectedUserProfile = profileInfoMapping[selectedProfileEmail];
        const selectedProfileAvatarUrl = selectedUserProfile?.avatarUrl || null;

        return (
            <EmployeeProfile
                email={selectedProfileEmail}
                onBack={() => setSelectedProfileEmail(null)}
                avatarUrl={selectedProfileAvatarUrl}
            />
        );
    }

    if (showProgramStatusPage) {
        return (
            <ProgramStatusPage onBack={handleBackFromProgramStatus} />
        );
    }

    // --- Main Dashboard Rendering ---

    return (
        <div className="dashboard-container">
            <header
                className="dashboard-header"
                // Use flex and space-between to push content to the left and right edges
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                {/* 1. Left Side: Logo and Title */}
                <div
                    className="dashboard-logo"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    tabIndex={0}
                    role="button"
                    onClick={(e) => {
                        if (e.currentTarget) e.currentTarget.blur();
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            if (e.currentTarget) e.currentTarget.blur();
                        }
                    }}
                >
                    <img alt="Zhapix Logo" className="logo-image" src="./logo.png" />
                    <Typography
                        variant="h5"
                        component="h1"
                        className="dashboard-title"
                        sx={{ userSelect: 'none' }}
                    >
                        Dashboard
                    </Typography>
                </div>

                {/* 2. Right Side: Program Status and User Profile */}
                <Box
                    className="header-actions"
                    // Group the button and avatar, and align them
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px', // Space between the button and the profile
                    }}
                >
                    {/* Program Status Button */}
                    <ProgramStatusBanner onClick={handleProgramStatusClick} />

                    {/* User Profile/Avatar Section */}
                    {userEmail && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                            }}
                            onClick={handleEmailClick}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleEmailClick(e);
                            }}
                        >
                            <Avatar
                                sx={{ bgcolor: '#4caf50' }}
                                src={avatarImage || ''}
                            >
                                {/* Fallback for Avatar is good practice */}
                                {getInitials(normalizedEmail)}
                            </Avatar>
                            <Typography
                                sx={{
                                    color: 'rgba(245, 245,245)',
                                    userSelect: 'none',
                                }}
                            >
                                {displayName}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </header>

            {/* Content Area (Links Grid) */}
            <div className="dashboard-content">
               
                {/* Links Grid */}
                <main className="dashboard-grid">
                    {cards.map((card) => (
                        <Card key={card.title} {...card} />
                    ))}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
