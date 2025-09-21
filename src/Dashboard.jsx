import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Card = ({ title, link, arrowText }) => {
  return (
    <div className="card">
      <a href={link} target="_blank" rel="noopener noreferrer" className="card-link">
        {title}
      </a>
      {arrowText && <span className="arrow">{arrowText} ➡️</span>}
    </div>
  );
};

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>

        {/* Toggle Switch */}
        <div
          className={`toggle ${darkMode ? 'active' : ''}`}
          onClick={() => setDarkMode(!darkMode)}
        ></div>
      </header>

      <main className="dashboard-grid">
        <Card title="Zhapix site" link="https://www.zhapix.com/" />
        <Card title="Email" link="https://www.zoho.com/mail" />
        <Card title="Docs" link="https://workdrive.zoho.in/" />
        <Card title="GitHub" link="https://github.com/zhapix-coe/" />
        <Card title="People" link="https://people.zoho.in/" />
        <Card title="Chat" link="https://cliq.zoho.in/" />
        <Card title="Learn" link="https://learn.zoho.in/" />
        <Card title="Creator" link="https://creator.zoho.in/" />
        <Card title="Sites" link="https://sites.zoho.in/" />
        <Card title="Forms" link="https://forms.zoho.in/" />
      </main>
    </div>
  );
};

export default Dashboard;
