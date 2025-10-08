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

// Added accessibility props for keyboard navigation
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

  useEffect(() => {
    const searchParamVals = new URLSearchParams(window.location.search);
    setUserEmail(searchParamVals.get('userEmail') || '');
  }, []);

  //  Mapping of emails to names and sheet links
  const profileInfoMapping = {
    'Aarthi.g@coe.zhapix.com': {
      name: 'Aarthi g',
      link: 'https://sheet.zoho.in/sheet/open/wky7w275e74c01506431db2edfe3deabd2b66?sheetid=0&range=A1',
    },
    'yogesh.b@coe.zhapix.com': {
      name: 'Yogesh b',
      link: 'https://sheet.zoho.in/sheet/open/290yl2cfcf54e646c4cf680ebf1de3c361290?sheetid=0&range=A1',
    },
    'sunitha.c@coe.zhapix.com': {
      name: 'sunitha',
      link: 'https://sheet.zoho.in/sheet/open/cxs7mfbfe3cbda739423cbcf5e8a529a6e872?sheetid=0&range=I8',
    },
    'vijayan.t@zhapix.com': {
      name: 'Vijayan Thanigavelu',
      link: 'https://sheet.zoho.in/sheet/open/cxs7mfa1b2f3844d849bbbfbcd3e299c4e090?sheetid=0&range=C16',
    },
    'samruthha.l@coe.zhapix.com': {
      name: 'Samruthha ',
      link: 'https://sheet.zoho.in/sheet/open/cxs7m420bef6ad3214d5fa9099da7df6a0e8d?sheetid=0&range=D5:H19',
    },
    'ronald.k@coe.zhapix.com':{
      name: 'Ronald k',
      link: 'https://sheet.zoho.in/sheet/open/cxs7m50e2e579e6c94209a60de195a86d4cf6?sheetid=0&range=F8',
    },
    'rudra.l@coe.zhapix.com':{
      name: 'Rudra',
      link: 'https://sheet.zoho.in/sheet/open/cxs7mcca28befe6f74e9d8733348fc8705a68?sheetid=0&range=C7',
    },
    'ashwathi.p@coe.zhapix.com':{
      name: 'Ashwathi',
      link: 'https://sheet.zoho.in/sheet/open/cxs7m6a10644dbe4746838d8a94493a7b164d?sheetid=0&range=F3:H18',
    },
    'deepika.j@coe.zhapix.com':{
      name: 'Deepika',
      link: 'https://sheet.zoho.in/sheet/open/cxs7mabcd7503acbf44be9c314f7569cd7f1f?sheetid=0&range=D6',
    },
  };

  // This variable is now correctly used in the cards array
  const zohoMailLink = userEmail
    ? `https://mail.zoho.com/?loginid=${encodeURIComponent(userEmail)}`
    : 'https://www.zoho.com/mail';

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
    const userProfile = profileInfoMapping[userEmail];
    const targetLink =
      userProfile?.link ||
      'https://sheet.zoho.in/sheet/open/wky7w275e74c01506431db2edfe3deabd2b66';
    window.open(targetLink, '_blank', 'noopener,noreferrer');
  };

  const displayName = profileInfoMapping[userEmail]?.name || userEmail;

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
            <Avatar sx={{ bgcolor: '#4caf50' }}>{getInitials(userEmail)}</Avatar>
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