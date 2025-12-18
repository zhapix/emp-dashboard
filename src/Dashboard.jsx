import React, { useEffect, useState, useMemo } from 'react';
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

// --- MAPPING DATA FOR DASHBOARD (Keys are Emails, includes Emp ID) ---
// Note: This mapping structure (keyed by email) must remain because we use it to construct the Emp ID map.
const profileInfoMappingByEmail = {
    'aarthi.g@zhapix.com': { name: 'Aarthi Gopal', avatarUrl: './Aarthig.jpeg', empId: '1004' },
    'yogesh.b@zhapix.com': { name: 'Yogesh Kumar B', avatarUrl: './yogesh.jpg', empId: '1003' },
    'sunitha.c@zhapix.com': { name: 'Sunitha Chanda', avatarUrl: './Sunitha.jpeg', empId: '1005' },
    'vijayan.t@zhapix.com': { name: 'Vijayan Thanigaivelu', avatarUrl: './vijayan.jpg', empId: '1001' },
    'samruthha.l@coe.zhapix.com': { name: 'Samruthha Lakshmi', avatarUrl: './Samruthha.png', empId: 'INT0017' },
    'ronald.k@coe.zhapix.com': { name: 'Ronald Kevin', avatarUrl: './Kevin.png', empId: 'INT0016' },
    'rudra.l@coe.zhapix.com': { name: 'Rudramoorthy', avatarUrl: './Rudra.png', empId: 'INT0015' },
    'ashwathi.p@coe.zhapix.com': { name: 'Ashwathi Palaniraj', avatarUrl: './Ashwathi.png', empId: 'INT006' },
    'deepika.j@coe.zhapix.com': { name: 'Deepika Jaikumar', avatarUrl: './Deepika.jpg', empId: 'INT0014' },
    'testing@zhapix.com': { name: 'TestingMale', avatarUrl: './malegrayscale.jpg', empId: 'TES001' },
    'testing@2zhapix.com': { name: 'Testingfemale', avatarUrl: './female grayscale.png', empId: 'TES002' },
};


const Dashboard = () => {
    // Stores the ID (now expecting Emp ID from URL)
    const [userId, setUserId] = useState(''); 
    
    // State tracks the selected Emp ID
    const [selectedProfileEmpId, setSelectedProfileEmpId] = useState(null); 
    
    const [showProgramStatusPage, setShowProgramStatusPage] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);


    // Create a map keyed by Emp ID for quick lookup 
    const profilesByEmpId = useMemo(() => {
        const map = {};
        Object.values(profileInfoMappingByEmail).forEach(profile => {
            if (profile.empId) {
                // Ensure Emp ID keys are consistently capitalized if necessary (or just store them as is)
                map[profile.empId] = profile;
            }
        });
        return map;
    }, []);


    useEffect(() => {
        const searchParamVals = new URLSearchParams(window.location.search);
        
        // **STRICT CHANGE:** Only check for the 'userid' parameter
        const idFromUrl = searchParamVals.get('userid');
        
        setUserId(idFromUrl || '');
    }, []);


    // Determine the profile based on the Emp ID (userId state)
    const currentUserProfile = useMemo(() => {
        if (!userId) {
            return profileInfoMappingByEmail.default;
        }

        const normalizedId = userId.toUpperCase(); // Assuming Emp IDs might be case-sensitive or uppercase

        // Try lookup by Emp ID
        let profile = profilesByEmpId[normalizedId];
        
        // Fallback check: If the user mistakenly passed an email under 'userid', try to look it up.
        // This is a safety measure, but the primary lookup is by Emp ID.
        if (!profile) {
            profile = profileInfoMappingByEmail[userId.toLowerCase()];
        }
        
        return profile || profileInfoMappingByEmail.default;
    }, [userId, profilesByEmpId]); 

    
    const displayName = currentUserProfile?.name || userId; 
    const avatarImage = currentUserProfile?.avatarUrl;
    const currentEmpId = currentUserProfile?.empId; 


    const cards = [
        { title: 'Chat', link: 'https://cliq.zoho.in/', icon: <ChatBubbleOutline fontSize="large" /> },
        { title: 'Email', link: 'https://mail.zoho.in/zm/#mail/folder/inbox', icon: <EmailOutlined fontSize="large" /> },
        { title: 'Drive', link: 'https://workdrive.zoho.in/', icon: <CloudUploadOutlined fontSize="large" /> },
        { title: 'GitHub', link: 'https://github.com/zhapix-coe/', icon: <GitHub fontSize="large" /> },
        { title: 'People', link: 'https://people.zoho.in/', icon: <PeopleOutline fontSize="large" /> },
        { title: 'Learn', link: 'https://irp.zhapix.com', icon: <MenuBookOutlined fontSize="large" /> },
    ];

    const getInitials = (id) => {
        const profile = currentUserProfile;

        // 1. PREFERENCE: Use Emp ID's first letter
        if (profile.empId) {
            return profile.empId.charAt(0).toUpperCase(); 
        }

        // 2. FALLBACK: Use the Name initials 
        const nameToUse = profile.name || id; 
        
        if (nameToUse) {
            const names = nameToUse.split(' ');
            if (names.length > 1) {
                return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
            }
            return names[0].charAt(0).toUpperCase();
        }

        return id ? id.charAt(0).toUpperCase() : '';
    };


    const handleProfileClick = (event) => {
        setShowProgramStatusPage(false);
        setShowMobileMenu(false);
        
        // Toggle the selected Emp ID (profile opens only if a valid Emp ID was found)
        setSelectedProfileEmpId(prevId => (prevId ? null : currentEmpId)); 

        if (event && event.currentTarget) {
            event.currentTarget.blur();
        }
    };

    const handleProgramStatusClick = () => {
        setSelectedProfileEmpId(null); 
        setShowMobileMenu(false);
        setShowProgramStatusPage(true);
    };

    const handleBackFromProgramStatus = () => {
        setShowProgramStatusPage(false);
    };

    const handleHamburgerClick = () => {
        setSelectedProfileEmpId(null); 
        setShowProgramStatusPage(false);
        setShowMobileMenu(prev => !prev);
    };

    // --- Conditional Rendering for Profile and Status Pages ---

    if (selectedProfileEmpId) { 
        return (
            <EmployeeProfile
                // Pass the Emp ID as the 'id' prop
                id={selectedProfileEmpId} 
                onBack={() => setSelectedProfileEmpId(null)} 
                avatarUrl={avatarImage} 
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
                {/* 1. Left Side: Logo and Title */}
                <div
                    className="dashboard-logo"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexShrink: 1
                    }}
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
                    {/* Program Status Button - Desktop Only */}
                    <Box
                        className="program-status-desktop"
                        sx={{ display: { xs: 'none', md: 'block' } }}
                    >
                        <ProgramStatusBanner onClick={handleProgramStatusClick} />
                    </Box>

                    {/* User Profile/Avatar Section - Desktop ONLY (Username + Avatar) */}
                    {userId && (
                        <Box
                            className="profile-avatar-desktop"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                            }}
                            onClick={handleProfileClick}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleProfileClick(e);
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
                                {getInitials(userId)} 
                            </Avatar>
                        </Box>
                    )}

                    {/* --- Mobile Profile Block (Avatar ONLY) --- */}
                    {userId && (
                        <Box
                            className="header-mobile-profile"
                            onClick={handleProfileClick}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleProfileClick(e);
                            }}
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                            }}
                        >
                            <Avatar
                                src={avatarImage || ''}
                            >
                                {getInitials(userId)} 
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