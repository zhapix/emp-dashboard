import React, { useEffect, useState } from 'react';
import {
    Typography,
    Box,
    Avatar,
    IconButton,
} from '@mui/material';
import {
    ChatBubbleOutline,
    EmailOutlined,
    CloudUploadOutlined,
    PeopleOutline,
    MenuBookOutlined,
    GitHub,
    Menu as MenuIcon,
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
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        const searchParamVals = new URLSearchParams(window.location.search);
        setUserEmail(searchParamVals.get('userEmail') || '');
    }, []);

    const profileInfoMapping = {
        'aarthi.g@zhapix.com': { name: 'Aarthi Gopal', avatarUrl: './Aarthig.jpeg' },
        'yogesh.b@zhapix.com': { name: 'Yogesh Kumar B', avatarUrl: './yogesh.jpg' },
        'sunitha.c@zhapix.com': { name: 'Sunitha Chanda', avatarUrl: './Sunitha.jpeg' },
        'vijayan.t@zhapix.com': { name: 'Vijayan Thanigaivelu', avatarUrl: './vijayan.jpg' },
        'samruthha.l@coe.zhapix.com': { name: 'Samruthha Lakshmi', avatarUrl: './Samruthha.png' },
        'ronald.k@coe.zhapix.com': { name: 'Ronald Kevin', avatarUrl: './Kevin.png' },
        'rudra.l@coe.zhapix.com': { name: 'Rudramoorthy', avatarUrl: './Rudra.png' },
        'ashwathi.p@coe.zhapix.com': { name: 'Ashwathi Palaniraj', avatarUrl: './Ashwathi.png' },
        'deepika.j@coe.zhapix.com': { name: 'Deepika Jaikumar', avatarUrl: '' },
        default: { name: 'default', avatarUrl: './avatar.jpg' },
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
            const names = nameToUse.split(' ');
            if (names.length > 1) {
                return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
            }
            return names[0].charAt(0).toUpperCase();
        }

        return email.charAt(0).toUpperCase();
    };

    const handleEmailClick = (event) => {
        setShowProgramStatusPage(false);
        setShowMobileMenu(false);
        setSelectedProfileEmail(prevEmail => prevEmail ? null : normalizedEmail);

        if (event && event.currentTarget) {
            event.currentTarget.blur();
        }
    };

    const handleProgramStatusClick = () => {
        setSelectedProfileEmail(null);
        setShowMobileMenu(false);
        setShowProgramStatusPage(true);
    };

    const handleBackFromProgramStatus = () => {
        setShowProgramStatusPage(false);
    };

    const handleHamburgerClick = () => {
        setSelectedProfileEmail(null);
        setShowProgramStatusPage(false);
        setShowMobileMenu(prev => !prev);
    };

    // --- Conditional Rendering for Profile and Status Pages ---

    if (selectedProfileEmail) {
        const selectedUserProfile = profileInfoMapping[selectedProfileEmail];
        const selectedProfileAvatarUrl = selectedUserProfile?.avatarUrl || profileInfoMapping['default'].avatarUrl;

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
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: { xs: 1, md: 2 }
                }}
            >
                {/* 1. Left Side: Logo and Title - CLEANED for default cursor */}
                <div
                    className="dashboard-logo"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexShrink: 1
                    }}
                    // Removed tabIndex, role="button", onClick, and onKeyPress
                    // Cursor is now controlled purely by Dashboard.css: .dashboard-logo { cursor: default; }
                >
                    <img alt="Zhapix Logo" className="logo-image" src="./logo.png" />
                    <Typography
                        variant="h5"
                        component="h1"
                        className="dashboard-title"
                        sx={{ userSelect: 'none', whiteSpace: 'nowrap' }}
                    >
                        Dashboard
                    </Typography>
                </div>

                {/* 2. Right Side: Actions (Desktop/Mobile) */}
                <Box
                    className="header-actions"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: '10px', md: '20px' },
                        ml: 'auto'
                    }}
                >
                    {/* Program Status Button - Desktop Only (Hidden on mobile via CSS/sx prop) */}
                    <Box
                        className="program-status-desktop"
                        // MUI utility for hiding on small screens
                        sx={{ display: { xs: 'none', md: 'block' } }}
                    >
                        <ProgramStatusBanner onClick={handleProgramStatusClick} />
                    </Box>

                    {/* User Profile/Avatar Section - Desktop ONLY (Username + Avatar) */}
                    {userEmail && (
                        <Box
                            className="profile-avatar-desktop"
                            sx={{
                                // Show on desktop (md and up)
                                display: { xs: 'none', md: 'flex' },
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
                            <Typography
                                variant="subtitle1"
                                component="span"
                                className="username-text"
                                sx={{
                                    color: 'white',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {displayName}
                            </Typography>

                            <Avatar
                                sx={{ bgcolor: '#4caf50' }}
                                src={avatarImage || ''}
                            >
                                {getInitials(normalizedEmail)}
                            </Avatar>
                        </Box>
                    )}

                    {/* --- Mobile Profile Block (Avatar ONLY) --- */}
                    {userEmail && (
                        <Box
                            className="header-mobile-profile"
                            onClick={handleEmailClick}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleEmailClick(e);
                            }}
                            sx={{
                                // Show on mobile screens (xs)
                                display: { xs: 'flex', md: 'none' },
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                            }}
                        >
                            <Avatar
                                src={avatarImage || ''}
                            >
                                {getInitials(normalizedEmail)}
                            </Avatar>
                        </Box>
                    )}
                    {/* --- End Mobile Profile Block --- */}


                    {/* Hamburger Menu Icon - Mobile Only */}
                    <IconButton
                        className="hamburger-menu-mobile"
                        aria-label="menu"
                        onClick={handleHamburgerClick}
                        sx={{
                            color: '#fff',
                            display: { xs: 'block', md: 'none' },
                            p: 0, ml: 1
                        }}
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </Box>
            </header>

            {/* Mobile Menu Dropdown - Contains Program Status Button */}
            {showMobileMenu && (
                <Box className="mobile-menu-dropdown">
                    <Box
                        className="program-status-mobile-item"
                        onClick={handleProgramStatusClick}
                        sx={{ p: 2, textAlign: 'center' }}
                    >
                        {/* This button becomes visible inside the open menu */}
                        <ProgramStatusBanner onClick={handleProgramStatusClick} />
                    </Box>
                </Box>
            )}


            {/* Content Area (Links Grid) */}
            <div className="dashboard-content">
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