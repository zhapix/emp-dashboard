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
// EmployeeProfile component is assumed to be defined in this file location
import EmployeeProfile from './EmployeeProfile'; 

// Card Component (Unchanged)
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
        const nameToUse = currentUserProfile?.name || email;
        return nameToUse.charAt(0).toUpperCase();
    };

    /**
     * FIX FOR STUCK CURSOR: Calls blur() on the element to remove focus/active state.
     */
    const handleEmailClick = (event) => {
        setSelectedProfileEmail(prevEmail => prevEmail ? null : normalizedEmail);
        
        // This is the core fix for the residual cursor graphic: removes focus after click.
        if (event && event.currentTarget) {
            event.currentTarget.blur();
        }
    };

    // --- Conditional Rendering for Profile View ---
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
    // --- End Conditional Rendering ---

    // --- Main Dashboard View ---
    return (
        <div className="dashboard-container">
            <header
                className="dashboard-header"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                {/* Dashboard Logo and Title Section - MODIFIED FOR POINTER CURSOR AND BLUR FIX */}
                <div 
                    className="dashboard-logo" 
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    // Added tabIndex, role, and blur function for proper clicking behavior
                    tabIndex={0} 
                    role="button"
                    onClick={(e) => { 
                        if (e.currentTarget) e.currentTarget.blur();
                        // Optional: Add logic here to navigate to the home page
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
                        sx={{
                            // Cursor property is now managed by the parent .dashboard-logo CSS for uniformity
                            userSelect: 'none', 
                        }}
                    >
                        Dashboard
                    </Typography>
                </div>

                {/* User Profile Section (Clickable) */}
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
                            {!avatarImage && getInitials(normalizedEmail)}
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
            </header>

            <main className="dashboard-grid">
                {cards.map((card) => (
                    <Card key={card.title} {...card} />
                ))}
            </main>
        </div>
    );
};

export default Dashboard;