// EmployeeProfile.jsx
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './EmployeeProfile.css'; // <-- Correct CSS import

// --- COMPLETE MOCK EMPLOYEE DATA (KEYS ARE LOWERCASE FOR ROBUSTNESS) ---
const mockEmployeeData = {
    'aarthi.g@coe.zhapix.com': {
        name: "Aarthi g",
        empId: "1004",
        designation: "Software Developer",
        joiningDate: "1/7/2025",
        status: "Active",
        primarySkills: "Frontend Development, ReactJS, Javascript, HTML, CSS",
        secondarySkills: "Postman, Zoho Platform, Canva, Draw.io",
    },
    'ashwathi.p@coe.zhapix.com': {
        name: "Ashwathi Palaniraj",
        empId: "INT006",
        designation: "Software Testing Intern",
        joiningDate: "1 Aug, 2025",
        status: "Active",
        primarySkills: "Software Testing, Playwright, Javascript, Cypress, Postman",
        secondarySkills: "", // Empty string if no secondary skills
    },
    'samruthha.l@coe.zhapix.com': { 
        name: "Samruthha Lakshmi",
        empId: "INT0017",
        designation: "Fullstack Developer Intern",
        joiningDate: "1 Aug, 2025",
        status: "Active",
        primarySkills: "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman",
        secondarySkills: "GCP-Firebase, JEST",
    },
    'ronald.k@coe.zhapix.com':{ 
        name: "Ronald Kevin",
        empId: "INT0016",
        designation: "Fullstack Developer Intern",
        joiningDate: "1 Aug, 2025",
        status: "Active",
        primarySkills: "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman",
        secondarySkills: "GCP-Firebase, JEST",
    },
    'rudra.l@coe.zhapix.com':{ 
        name: "Rudramoorthy",
        empId: "INT0015",
        designation: "Fullstack Developer",
        joiningDate: "1 Aug, 2025",
        status: "Active",
        primarySkills: "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman",
        secondarySkills: "JEST",
    },
    'deepika.j@coe.zhapix.com':{ 
        name: "Deepika Jaikumar",
        empId: "INT0014",
        designation: "Software Testing Intern",
        joiningDate: "1 Aug, 2025",
        status: "Active",
        primarySkills: "Software Testing, Playwright, Javascript, Cypress, Postman",
        secondarySkills: "",
    },
    'yogesh.b@coe.zhapix.com': {
        name: "Yogesh Kumar B",
        empId: "1003",
        designation: "QA Engineer",
        joiningDate: "1 Jun, 2025",
        status: "Active",
        primarySkills: "Software Testing, Playwright, Javascript, Cypress, Postman, Github",
        secondarySkills: "Zoho Tools",
    },
    'sunitha.c@coe.zhapix.com': {
        name: "Sunitha Chanda",
        empId: "1005",
        designation: "Technical Support Engineer",
        joiningDate: "1 Sep, 2025",
        status: "Active",
        primarySkills: "UI/UX Design, Figma, Canva, Draw.io, CorelDraw, HTML, CSS, Javascript, ReactJS",
        secondarySkills: "Zoho Platform",
    },
    'vijayan.t@zhapix.com': {
        name: "Vijayan Thanigaivelu",
        empId: "1001",
        designation: "N/A", 
        joiningDate: "N/A", 
        status: "Active",
        primarySkills: "zhapix",
        secondarySkills: "",
    },


    
    
};
// --- END COMPLETE MOCK EMPLOYEE DATA ---

/**
 * Component for a single row in the profile table.
 * It handles rendering "Profile Not Found" if the email is invalid.
 */
const ProfileRow = ({ label, value }) => {
    // Only render the row if the value is not an empty string or 'N/A'
    // This allows us to hide rows like Secondary Skills if not applicable, 
    // but keeps the "Name: Profile Not Found" visible.
    if (label !== "Name" && (!value || value.toLowerCase() === 'n/a' || value.trim() === '')) {
        return null; 
    }
    
    return (
        <div className="profile-row">
            <div className="profile-label">{label}</div>
            <div className="profile-value">{value}</div>
        </div>
    );
};

const EmployeeProfile = ({ email, onBack }) => {
    // Retrieve profile data based on the email prop (which should be lowercase)
    const profile = mockEmployeeData[email] || {
        name: "Profile Not Found",
        empId: "N/A",
        designation: "N/A",
        joiningDate: "N/A",
        status: "N/A",
        primarySkills: "N/A",
        secondarySkills: "N/A",
    };

    return (
        <div className="profile-view-container">
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
                <Button onClick={onBack} startIcon={<ArrowBackIcon />}>
                    Back to Dashboard
                </Button>
                {/* Only show the name in the header if the profile was found */}
                {profile.name !== "Profile Not Found" && (
                    <Typography variant="h4" component="h2" sx={{ ml: 2 }}>
                        {profile.name}'s Profile
                    </Typography>
                )}
            </Box>

            <div className="profile-card-container">
                {/* Always show the Name row, even if Profile Not Found */}
                <ProfileRow label="Name" value={profile.name} />
                
                {/* Conditionally show other rows only if the profile was found */}
                {profile.name !== "Profile Not Found" && (
                    <>
                        <ProfileRow label="Emp ID" value={profile.empId} />
                        <ProfileRow label="Designation" value={profile.designation} />
                        <ProfileRow label="Joining Date" value={profile.joiningDate} />
                        <ProfileRow label="Status" value={profile.status} />
                        <ProfileRow label="Primary Skills" value={profile.primarySkills} />
                        <ProfileRow label="Secondary Skills" value={profile.secondarySkills} />
                    </>
                )}
            </div>
        </div>
    );
};

export default EmployeeProfile;