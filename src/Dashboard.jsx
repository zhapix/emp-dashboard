// Dashboard.jsx - FINAL CORRECTED CODE with Photo URLs and Profile URL Passing
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

    // 🌟 MODIFIED MAPPING: Added avatarUrl for profile photos
    // NOTE: '/SunithaChandai.jpeg' assumes the file is in your public folder.
    const profileInfoMapping = {
        'aarthi.g@coe.zhapix.com': { name: 'Aarthi Gopal', 
            avatarUrl: '/Aarthig.jpeg'},
        'yogesh.b@coe.zhapix.com': { name: 'Yogesh Kumar B', 
            avatarUrl: '/yogesh.jpg' },
        'sunitha.c@coe.zhapix.com': { name: 'Sunitha Chanda',
         avatarUrl: '/Sunitha.jpeg'}, 
        'vijayan.t@zhapix.com': { name: 'Vijayan Thanigaivelu',
             avatarUrl: '/vijayan.jpg' },
        'samruthha.l@coe.zhapix.com': { name: 'Samruthha Lakshmi', 
            avatarUrl: '/Samruthha.png'},
        'ronald.k@coe.zhapix.com':{ name: 'Ronald Kevin',
             avatarUrl: '/Kevin.png' },
        'rudra.l@coe.zhapix.com':{ name: 'Rudramoorthy',
             avatarUrl:'/Rudra.png' },
        'ashwathi.p@coe.zhapix.com':{ name: 'Ashwathi Palaniraj',
             avatarUrl: '/Ashwathi.png'},
        'deepika.j@coe.zhapix.com':{ name: 'Deepika Jaikumar', 
            avatarUrl: '/Deepika.jpg' },
    };

    // CRITICAL: Normalize the userEmail for reliable lookups
    const normalizedEmail = userEmail.toLowerCase();
    
    // Get current user profile data
    const currentUserProfile = profileInfoMapping[normalizedEmail];
    
    // Use the normalized email for name lookup
    const displayName = currentUserProfile?.name || userEmail;
    
    // Get the current user's avatar URL
    const avatarImage = currentUserProfile?.avatarUrl;


    const cards = [
        { title: 'Chat', link: 'https://cliq.zoho.in/', icon: <ChatBubbleOutline fontSize="large" /> },
        { title: 'Email', link: 'https://www.zoho.com/mail', icon: <EmailOutlined fontSize="large" /> },
        { title: 'Drive', link: 'https://workdrive.zoho.in/', icon: <CloudUploadOutlined fontSize="large" /> },
        { title: 'GitHub', link: 'https://github.com/zhapix-coe/', icon: <GitHub fontSize="large" /> },
        { title: 'People', link: 'https://people.zoho.in/', icon: <PeopleOutline fontSize="large" /> },
        { title: 'Learn', link: 'https://learn.zoho.in/', icon: <MenuBookOutlined fontSize="large" /> },
    ];

    const getInitials = (email) => {
        if (!email) return '';
        // Use the first letter of the name if available, otherwise fall back to email initial
        const nameToUse = currentUserProfile?.name || email;
        return nameToUse.charAt(0).toUpperCase();
    };

    const handleEmailClick = () => {
        setSelectedProfileEmail(prevEmail => prevEmail ? null : normalizedEmail);
    };

    // --- Conditional Rendering for Profile View ---
    if (selectedProfileEmail) {
        // 🌟 CRITICAL CHANGE: Get the avatar URL for the SELECTED profile and pass it
        const selectedUserProfile = profileInfoMapping[selectedProfileEmail];
        const selectedProfileAvatarUrl = selectedUserProfile?.avatarUrl || null;

        return (
            <EmployeeProfile 
                email={selectedProfileEmail} 
                onBack={() => setSelectedProfileEmail(null)} 
                avatarUrl={selectedProfileAvatarUrl} // <-- Passed to EmployeeProfile
            />
        );
    }
    // --- End Conditional Rendering ---

    return (
        <div className="dashboard-container">
            <header
                className="dashboard-header"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <div className="dashboard-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img alt="Zhapix Logo" className="logo-image" src="./logo.png" />
                    <Typography variant="h5" component="h1" className="dashboard-title">
                        Dashboard
                    </Typography>
                </div>

                {userEmail && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* 🌟 Avatar now uses src prop for the photo, or falls back to initials */}
                        <Avatar 
                            sx={{ bgcolor: '#4caf50' }} 
                            src={avatarImage || ''}
                        >
                            {!avatarImage && getInitials(normalizedEmail)}
                        </Avatar>
                        <Typography
                            onClick={handleEmailClick}
                            sx={{
                                cursor: 'pointer',
                                color: 'rgba(245, 245,245)',
                                userSelect: 'none',
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleEmailClick();
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