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
    // State to control which profile is viewed (null means dashboard view)
    const [selectedProfileEmail, setSelectedProfileEmail] = useState(null); 

    useEffect(() => {
        const searchParamVals = new URLSearchParams(window.location.search);
        // Get the logged-in user's email from URL parameters
        setUserEmail(searchParamVals.get('userEmail') || ''); 
    }, []);

    // Mapping of emails to user profile information (name and photo URL)
    const profileInfoMapping = {
        'aarthi.g@coe.zhapix.com': { name: 'Aarthi Gopal', 
            avatarUrl: './Aarthig.jpeg'},
        'yogesh.b@coe.zhapix.com': { name: 'Yogesh Kumar B', 
            avatarUrl: './yogesh.jpg' },
        'sunitha.c@coe.zhapix.com': { name: 'Sunitha Chanda',
         avatarUrl: './Sunitha.jpeg'}, 
        'vijayan.t@zhapix.com': { name: 'Vijayan Thanigaivelu',
             avatarUrl: './vijayan.jpg' },
        'samruthha.l@coe.zhapix.com': { name: 'Samruthha Lakshmi', 
            avatarUrl: './Samruthha.png'},
        'ronald.k@coe.zhapix.com':{ name: 'Ronald Kevin',
             avatarUrl: './Kevin.png' },
        'rudra.l@coe.zhapix.com':{ name: 'Rudramoorthy',
             avatarUrl:'./Rudra.png' },
        'ashwathi.p@coe.zhapix.com':{ name: 'Ashwathi Palaniraj',
             avatarUrl: './Ashwathi.png'},
        'deepika.j@coe.zhapix.com':{ name: 'Deepika Jaikumar', 
            avatarUrl: './Deepika.jpg' },
    };

    // Normalize the userEmail for reliable lookup
    const normalizedEmail = userEmail.toLowerCase();
    
    // Get current user profile data
    const currentUserProfile = profileInfoMapping[normalizedEmail];
    
    // Use the name from the mapping or fallback to the email
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
        // Toggles between showing the dashboard (null) and the profile (normalizedEmail)
        setSelectedProfileEmail(prevEmail => prevEmail ? null : normalizedEmail);
    };

    // --- Conditional Rendering for Profile View ---
    // If an email is selected, render the EmployeeProfile component instead of the dashboard
    if (selectedProfileEmail) {
        // Get the avatar URL for the selected profile to pass as a prop
        const selectedUserProfile = profileInfoMapping[selectedProfileEmail];
        const selectedProfileAvatarUrl = selectedUserProfile?.avatarUrl || null;

        return (
            <EmployeeProfile 
                email={selectedProfileEmail} 
                onBack={() => setSelectedProfileEmail(null)} // Function to return to dashboard
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
                <div className="dashboard-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img alt="Zhapix Logo" className="logo-image" src="./logo.png" />
                    <Typography variant="h5" component="h1" className="dashboard-title">
                        Dashboard
                    </Typography>
                </div>

                {userEmail && (
                    <Box 
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        onClick={handleEmailClick} // Click on the box (avatar or name)
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') handleEmailClick();
                        }}
                    >
                        {/* Avatar now uses src prop for the photo, or falls back to initials */}
                        <Avatar 
                            sx={{ bgcolor: '#4caf50' }} 
                            src={avatarImage || ''}
                        >
                            {!avatarImage && getInitials(normalizedEmail)}
                        </Avatar>
                        <Typography
                            sx={{
                                cursor: 'pointer',
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