// Dashboard.jsx - FINAL CORRECTED CODE
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
// import logo from './logo.png'; // Assuming you handle logo import/path correctly

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

    // Mapping of emails to names (ALL KEYS MUST BE LOWERCASE)
    const profileInfoMapping = {
        'aarthi.g@coe.zhapix.com': { name: 'Aarthi Gopal' }, // Lowercase key
        'yogesh.b@coe.zhapix.com': { name: 'Yogesh Kumar B' },
        'sunitha.c@coe.zhapix.com': { name: 'Sunitha Chanda' },
        'vijayan.t@zhapix.com': { name: 'Vijayan Thanigaivelu' },
        'samruthha.l@coe.zhapix.com': { name: 'Samruthha Lakshmi' },
        'ronald.k@coe.zhapix.com':{ name: 'Ronald Kevin' },
        'rudra.l@coe.zhapix.com':{ name: 'Rudramoorthy' },
        'ashwathi.p@coe.zhapix.com':{ name: 'Ashwathi Palaniraj' },
        'deepika.j@coe.zhapix.com':{ name: 'Deepika Jaikumar' },
    };

    // CRITICAL: Normalize the userEmail for reliable lookups
    const normalizedEmail = userEmail.toLowerCase();
    
    // Use the normalized email for name lookup
    const displayName = profileInfoMapping[normalizedEmail]?.name || userEmail;


    // FIX: Replaced single quotes (') with double quotes (") in fontSize attributes
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
        return email.charAt(0).toUpperCase();
    };

    const handleEmailClick = () => {
        // Use the normalized email for state change
        setSelectedProfileEmail(prevEmail => prevEmail ? null : normalizedEmail);
    };

    // --- Conditional Rendering for Profile View ---
    if (selectedProfileEmail) {
        return (
            <EmployeeProfile 
                // Pass the normalized email to the Profile component
                email={selectedProfileEmail} 
                onBack={() => setSelectedProfileEmail(null)} 
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
                        <Avatar sx={{ bgcolor: '#4caf50' }}>{getInitials(normalizedEmail)}</Avatar>
                        <Typography
                            onClick={handleEmailClick}
                            sx={{
                                cursor: 'pointer',
                                color: '#1976d2',
                                textDecoration: 'underline',
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