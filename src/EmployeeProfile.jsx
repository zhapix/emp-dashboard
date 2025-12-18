import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./EmployeeProfile.css"; // Ensure this file contains the new CSS rules

// --- MOCK EMPLOYEE DATA (RESTRUCTURED TO USE EMP ID AS KEY) ---
const mockEmployeeData = {
    // Key: Emp ID
    "1004": {
        name: "Aarthi Gopal",
        empId: "1004",
        designation: "Software Developer",
        joiningDate: "1/7/2025",
        lastDate: "NA",
        status: "Active",
        primarySkills: "Frontend Development, ReactJS, Javascript, HTML, CSS",
        secondarySkills: "Postman, Zoho Platform, Canva, Draw.io",
    },
    "INT006": {
        name: "Ashwathi Palaniraj",
        empId: "INT006",
        designation: "Software Testing Intern",
        joiningDate: "1 Aug, 2025",
        lastDate: "NA",
        status: "Active",
        primarySkills: "Software Testing, Playwright, Javascript, Cypress, Postman",
        secondarySkills: "",
    },
    "INT0017": {
        name: "Samruthha Lakshmi",
        empId: "INT0017",
        designation: "Fullstack Developer Intern",
        joiningDate: "1 Aug, 2025",
        lastDate: "NA",
        status: "Active",
        primarySkills:
            "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman",
        secondarySkills: "GCP-Firebase, JEST",
    },
    "INT0014": {
        name: "Deepika Jaikumar",
        empId: "INT0014",
        designation: "Software Testing Intern",
        joiningDate: "1 Aug, 2025",
        lastDate: "NA",
        status: "Active",
        primarySkills: "Software Testing, Playwright, Javascript, Cypress, Postman",
        secondarySkills: "",
    },
    "1003": {
        name: "Yogesh Kumar B",
        empId: "1003",
        designation: "QA Engineer",
        joiningDate: "1 Jun, 2025",
        lastDate: "NA",
        status: "Active",
        primarySkills:
            "Software Testing, Playwright, Javascript, Cypress, Postman, Github",
        secondarySkills: "Zoho Tools",
    },
    "1005": {
        name: "Sunitha Chanda",
        empId: "1005",
        designation: "Technical Support Engineer",
        joiningDate: "1 Sep, 2025",
        lastDate: "NA",
        status: "Active",
        primarySkills:
            "UI/UX Design, Figma, Canva, Draw.io, CorelDraw, HTML, CSS, Javascript, React",
        secondarySkills: "Zoho Platform",
    },
    "1001": {
        name: "Vijayan Thanigaivelu",
        empId: "1001",
        designation: "N/A",
        joiningDate: "N/A",
        lastDate: "NA",
        status: "Active",
        primarySkills: "zhapix",
        secondarySkills: "",
    },
    "INT0016": {
        name: "Ronald Kevin",
        empId: "INT0016",
        designation: "Fullstack Developer Intern",
        joiningDate: "1 Aug, 2025",
        lastDate: "NA",
        status: "Active",
        primarySkills:
            "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman",
        secondarySkills: "GCP-Firebase, JEST",
    },
    "INT0015": {
        name: "Rudramoorthy",
        empId: "INT0015",
        designation: "Fullstack Developer",
        joiningDate: "1 Aug, 2025",
        lastDate: "NA",
        status: "Active",
        primarySkills:
            "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman",
        secondarySkills: "JEST",
    },
    "TES001": {
        name: "TestingMale",
        empId: "TES001",
        designation: "Fullstack Developer",
        joiningDate: "1 Aug, 2025",
        lastDate: "NA",
        status: "Active",
        primarySkills:
            "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman",
        secondarySkills: "JEST",
    },
    "TES002": {
        name: "Testingfemale",
        empId: "TES002",
        designation: "Fullstack Developer",
        joiningDate: "1 Aug, 2025",
        lastDate: "NA",
        status: "Active",
        primarySkills:
            "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman",
        secondarySkills: "JEST",
    }
};
// --- END MOCK EMPLOYEE DATA ---

/**
 * Helper component to display a single row of profile information.
 * Renders null if the value is null, empty string, or "N/A" (case-insensitive).
 */
const ProfileRow = ({ label, value }) => {
    // Check if the trimmed value is null/undefined, an empty string, or case-insensitive 'n/a'.
    const isEmpty =
        !value ||
        value.toString().trim() === "" ||
        value.toString().toLowerCase() === "n/a";
    if (isEmpty) {
        return null;
    }

    return (
        <div className="profile-row">
            <div className="profile-label">{label}</div>
            <div className="profile-value">
                <Typography variant="body1" sx={{ color: "inherit" }}>
                    {value}
                </Typography>
            </div>
        </div>
    );
};

/**
 * Main component to display the employee's profile.
 */
// CHANGE: The 'id' prop is now explicitly the Emp ID.
const EmployeeProfile = ({ id, onBack, avatarUrl }) => {
    // id is now the Emp ID (e.g., '1004', 'INT006')
    const empId = (id || "").toUpperCase();
    const [profile, setProfile] = useState({
        name: "Profile Not Found",
        empId: "N/A",
        designation: "N/A",
        joiningDate: "N/A",
        lastDate: "N/A",
        status: "N/A",
        primarySkills: "N/A",
        secondarySkills: "N/A",
    });


    useEffect(() => {
        console.log("ëntering..")
        /*
        fetch(
            "https://www.zohoapis.in/creator/custom/zhapix/internList?publickey=hr23DAOTBzVqm608CkT9E4jR5"
        )
            .then((response) => response.json())
            .then((data) => {
                const empData = data.result; // Assuming the root key is "users"
                console.log("empData::", empData);
                // if (empData) {
                //     setProfile(empData[empId]);
                //     console.log(data);
                // }
            })
            .catch((error) => console.error("Error:", error));
            */
        setProfile(mockEmployeeData[empId]);

    }, []);

    // CHANGE: Look up profile data using the Emp ID
    // const profile = mockEmployeeData[empId] ||

    const avatarInitial =
        profile.name && profile.name !== "Profile Not Found"
            ? profile.name.charAt(0).toUpperCase()
            : "NF";

    return (
        <div className="profile-view-wrapper">

            {/* --- Back Button (Text only, large font) --- */}
            <Box sx={{ mb: 1, p: 0 }}>
                <Button
                    onClick={onBack}
                    variant="text" // Ensure no background color
                    startIcon={<ArrowBackIcon sx={{ fontSize: '1.2rem' }} />} // Increase icon size
                    sx={{
                        textTransform: "none",
                        color: "white",
                        fontSize: '1.2rem', // Increase text size
                    }}
                >
                    Back to Dashboard
                </Button>
            </Box>

            {/* --- Employee Profile Heading (Center Aligned) --- */}
            <Box
                className="employee-profile-heading-container"
                sx={{
                    width: '100%',
                    textAlign: 'center', // Centers the text
                    mb: 3,
                    p: 0,
                    color: 'white',
                }}
            >
                <Typography
                    variant="h5" // Use h5 for consistency with Program Status page
                    component="h1"
                    sx={{ fontWeight: 'bold' }}
                >
                    Employee Profile
                </Typography>
            </Box>

            {/* --- Profile Content --- */}
            <div className="profile-view-container">

                <div className="profile-card-container">
                    <ProfileRow label="Name" value={profile.name} />

                    {profile.name !== "Profile Not Found" && (
                        <>
                            <ProfileRow label="Emp ID" value={profile.empId} />
                            <ProfileRow label="Designation" value={profile.designation} />
                            <ProfileRow label="Joining Date" value={profile.joiningDate} />
                            <ProfileRow label="Last Date" value={profile.lastDate} />
                            <ProfileRow label="Status" value={profile.status} />
                            <ProfileRow
                                label="Primary Skills"
                                value={profile.primarySkills}
                            />
                            <ProfileRow
                                label="Secondary Skills"
                                value={profile.secondarySkills}
                            />
                        </>
                    )}
                </div>

                {/* --- Profile Photo Column --- */}
                <div className="profile-photo-column">
                    <Avatar
                        alt={profile.name}
                        src={avatarUrl || ""}
                        sx={{
                            width: 200,
                            height: 200,
                            bgcolor: "rgba(236, 241, 240, 1)",
                            fontSize: "3rem",
                            border: "4px solid white",
                            color: "#324155",
                            "& img": {
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                            },
                        }}
                    >
                        {avatarInitial}
                    </Avatar>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;