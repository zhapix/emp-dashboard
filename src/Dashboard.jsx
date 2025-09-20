import React from 'react';
import './Dashboard.css';

// The reusable Card component
const Card = ({ title, link, arrowText }) => {
    return (
        <div className="card">
            <a href={link} className="card-link">{title}</a>
            {/* Conditionally renders the arrow and text if the prop exists */}
            {arrowText && <span className="arrow">{arrowText} ➡️</span>}
        </div>
    );
};

// The main Dashboard component that uses the Card component
const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
            </header>
            <main className="dashboard-grid">
                <Card title="Email" link="https://www.zoho.com/mail" />
                <Card title="Chat" link="https://cliq.zoho.in/" />
                <Card title="Docs" link="https://projects.zhapix.com/" />
                <Card title="IRP" link="https://learn.zoho.in/" />
            </main>
        </div>
    );
};

export default Dashboard;