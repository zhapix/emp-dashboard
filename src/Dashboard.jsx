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
    AssignmentOutlined, // Changed from PeopleOutline
    MenuBookOutlined,
    GitHub,
    Menu as MenuIcon,
} from '@mui/icons-material';

// Styles
import './Dashboard.css';
import './EmployeeProfile.css';
import './ProgramStatusStyles.css';

// Components
import EmployeeProfile from './EmployeeProfile';
import ProgramStatusBanner from './ProgramStatusBanner';
import ProgramStatusPage from './ProgramStatusPage';

/**
 * Sub-component for the individual dashboard cards
 */
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
            onKeyDown={(e) => {
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

// Profile Data Mapping
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
    'default': { name: 'Guest', avatarUrl: '', empId: null }
};

const Dashboard = () => {
    const [userId, setUserId] = useState(''); 
    const [selectedProfileEmpId, setSelectedProfileEmpId] = useState(null); 
    const [showProgramStatusPage, setShowProgramStatusPage] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Create a lookup map for Employee IDs
    const profilesByEmpId = useMemo(() => {
        const map = {};
        Object.values(profileInfoMappingByEmail).forEach(profile => {
            if (profile.empId) map[profile.empId.toUpperCase()] = profile;
        });
        return map;
    }, []);

    // Get UserID from URL on mount
    useEffect(() => {
        const searchParamVals = new URLSearchParams(window.location.search);
        const idFromUrl = searchParamVals.get('userid');
        setUserId(idFromUrl || '');
    }, []);

    // Memoize the current user's profile info
    const currentUserProfile = useMemo(() => {
        if (!userId) return profileInfoMappingByEmail.default;
        
        const normalizedId = userId.toUpperCase();
        // Check Emp ID first, then Email
        let profile = profilesByEmpId[normalizedId];
        if (!profile) profile = profileInfoMappingByEmail[userId.toLowerCase()];
        
        return profile || profileInfoMappingByEmail.default;
    }, [userId, profilesByEmpId]); 

    const displayName = currentUserProfile?.name || userId; 
    const avatarImage = currentUserProfile?.avatarUrl;
    const currentEmpId = currentUserProfile?.empId; 

    const handleLogoClick = (e) => {
        e.preventDefault();
        window.location.reload(); 
    };

    const handleProfileClick = () => {
        setShowProgramStatusPage(false);
        setShowMobileMenu(false);
        // Toggle profile view
        setSelectedProfileEmpId(prevId => (prevId ? null : currentEmpId)); 
    };

    // View Switching Logic
    if (selectedProfileEmpId) { 
        return (
            <EmployeeProfile 
                id={selectedProfileEmpId} 
                onBack={() => setSelectedProfileEmpId(null)} 
                avatarUrl={avatarImage} 
            />
        );
    }

    if (showProgramStatusPage) {
        return <ProgramStatusPage onBack={() => setShowProgramStatusPage(false)} />;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <a href="/" className="logo-anchor" onClick={handleLogoClick}>
                    <div className="dashboard-logo">
                        <img alt="Zhapix Logo" className="logo-image" src="./logo.png" />
                        <Typography variant="h5" component="h1" className="dashboard-title">
                            Dashboard
                        </Typography>
                    </div>
                </a>

                <Box className="header-actions">
                    {/* Desktop Status Banner */}
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <ProgramStatusBanner onClick={() => setShowProgramStatusPage(true)} />
                    </Box>

                    {userId && (
                        <Box className="profile-avatar-desktop" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
                            <Typography variant="subtitle1" sx={{ color: 'white' }}>{displayName}</Typography>
                            <Avatar sx={{ bgcolor: '#fff', color: '#1976d2' }} src={avatarImage}>
                                {displayName.charAt(0)}
                            </Avatar>
                        </Box>
                    )}

                    <IconButton
                        className="hamburger-menu-mobile"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        sx={{ color: '#fff', display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </Box>
            </header>

            {/* Mobile Dropdown Menu */}
            {showMobileMenu && (
                <Box className="mobile-menu-dropdown">
                    <ProgramStatusBanner onClick={() => { setShowProgramStatusPage(true); setShowMobileMenu(false); }} />
                </Box>
            )}

            <div className="dashboard-content">
                <main className="dashboard-grid">
                    {[
                        { title: 'Chat', link: 'https://cliq.zoho.in/', icon: <ChatBubbleOutline fontSize="large" /> },
                        { title: 'Email', link: 'https://mail.zoho.in/zm/#mail/folder/inbox', icon: <EmailOutlined fontSize="large" /> },
                        { title: 'Drive', link: 'https://workdrive.zoho.in/', icon: <CloudUploadOutlined fontSize="large" /> },
                        { title: 'GitHub', link: 'https://github.com/zhapix-coe/', icon: <GitHub fontSize="large" /> },
                        { title: 'Projects', link: 'https://projects.zhapix.com/', icon: <AssignmentOutlined fontSize="large" /> }, // Icon Changed
                        { title: 'Learn', link: 'https://irp.zhapix.com', icon: <MenuBookOutlined fontSize="large" /> },
                    ].map((card) => (
                        <Card key={card.title} {...card} />
                    ))}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;