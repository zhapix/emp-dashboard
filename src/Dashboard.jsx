import React from 'react';
import { Typography, Box } from '@mui/material';
import {
  ChatBubbleOutline,
  EmailOutlined,
  CloudUploadOutlined,
  PeopleOutline,
  MenuBookOutlined,
  GitHub,
} from '@mui/icons-material';

import './Dashboard.css';

const Card = ({ title, link, icon }) => {
  const handleClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="card" onClick={handleClick}>
      <Box className="card-icon">{icon}</Box>
      <Typography variant="body1" className="card-text">
        {title}
      </Typography>
    </div>
  );
};

const Dashboard = () => {
  const cards = [
    { title: 'Chat', link: 'https://cliq.zoho.in/', icon: <ChatBubbleOutline fontSize="large" /> },
    { title: 'Email', link: 'https://www.zoho.com/mail', icon: <EmailOutlined fontSize="large" /> },
    { title: 'Drive', link: 'https://workdrive.zoho.in/', icon: <CloudUploadOutlined fontSize="large" /> },
    { title: 'GitHub', link: 'https://github.com/zhapix-coe/', icon: <GitHub fontSize="large" /> },
    { title: 'People', link: 'https://people.zoho.in/', icon: <PeopleOutline fontSize="large" /> },
    { title: 'Learn', link: 'https://learn.zoho.in/', icon: <MenuBookOutlined fontSize="large" /> },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <Typography variant="h5" component="h1" className="dashboard-title">
          Dashboard
        </Typography>
        <Box className="dashboard-logo">
          {/* Recommended: Added alt attribute for accessibility */}
          <img src="/logo.png" alt="Zhapix Logo" className="logo-image" />
          <Typography variant="h5" className="logo-text">zhapix</Typography>
        </Box>
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