import React from "react";
import { Typography, Box, Button, Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./EmployeeProfile.css";

// --- MOCK EMPLOYEE DATA (Complete List) ---
const mockEmployeeData = {
    // ... (Employee data remains the same)
    "aarthi.g@coe.zhapix.com": {
        name: "Aarthi g",
        empId: "1004",
        designation: "Software Developer",
        joiningDate: "1/7/2025",
        status: "Active",
        primarySkills: "Frontend Development, ReactJS, Javascript, HTML, CSS",
        secondarySkills: "Postman, Zoho Platform, Canva, Draw.io",
    },
    "ashwathi.p@coe.zhapix.com": {
        name: "Ashwathi Palaniraj",
        empId: "INT006",
        designation: "Software Testing Intern",
        joiningDate: "1 Aug, 2025",
        status: "Active",
        primarySkills: "Software Testing, Playwright, Javascript, Cypress, Postman",
        secondarySkills: "",
    },
    "samruthha.l@coe.zhapix.com": {
        name: "Samruthha Lakshmi",
        empId: "INT0017",
        designation: "Fullstack Developer Intern",
        joiningDate: "1 Aug, 2025",
        status: "Active",
        primarySkills:
            "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman",
        secondarySkills: "GCP-Firebase, JEST",
    },
    "deepika.j@coe.zhapix.com": {
        name: "Deepika Jaikumar",
        empId: "INT0014",
        designation: "Software Testing Intern",
        joiningDate: "1 Aug, 2025",
        status: "Active",
        primarySkills: "Software Testing, Playwright, Javascript, Cypress, Postman",
        secondarySkills: "",
    },
    "yogesh.b@coe.zhapix.com": {
        name: "Yogesh Kumar B",
        empId: "1003",
        designation: "QA Engineer",
        joiningDate: "1 Jun, 2025",
        status: "Active",
        primarySkills:
            "Software Testing, Playwright, Javascript, Cypress, Postman, Github",
        secondarySkills: "Zoho Tools",
    },
    "sunitha.c@coe.zhapix.com": {
        name: "Sunitha Chanda",
        empId: "1005",
        designation: "Technical Support Engineer",
        joiningDate: "1 Sep, 2025",
        status: "Active",
        primarySkills:
            "UI/UX Design, Figma, Canva, Draw.io, CorelDraw, HTML, CSS, Javascript, React",
        secondarySkills: "Zoho Platform",
    },
    "vijayan.t@zhapix.com": {
        name: "Vijayan Thanigaivelu",
        empId: "1001",
        designation: "N/A",
        joiningDate: "N/A",
        status: "Active",
        primarySkills: "zhapix",
        secondarySkills: "",
    },
    "ronald.k@coe.zhapix.com": {
        name: "Ronald Kevin",
        empId: "INT0016",
        designation: "Fullstack Developer Intern",
        joiningDate: "1 Aug, 2025",
        status: "Active",
        primarySkills:
            "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman",
        secondarySkills: "GCP-Firebase, JEST",
    },
    "rudra.l@coe.zhapix.com": {
        name: "Rudramoorthy",
        empId: "INT0015",
        designation: "Fullstack Developer",
        joiningDate: "1 Aug, 2025",
        status: "Active",
        primarySkills:
            "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman",
        secondarySkills: "JEST",
    },
};
// --- END MOCK EMPLOYEE DATA ---

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
            <div className="profile-label">{label}</div>           {" "}
            <div className="profile-value">
                {" "}
                <Typography variant="body1" sx={{ color: "inherit" }}>
                    {value}               {" "}
                </Typography>
                {" "}
            </div>
            {" "}
        </div>
    );
};

const EmployeeProfile = ({ email, onBack, avatarUrl }) => {
    const normalizedEmail = (email || "").toLowerCase();

    const profile = mockEmployeeData[normalizedEmail] || {
        name: "Profile Not Found",
        empId: "N/A",
        designation: "N/A",
        joiningDate: "N/A",
        status: "N/A",
        primarySkills: "N/A",
        secondarySkills: "N/A",
    }; // Logic for fallback text if image is missing/failing

    const avatarInitial =
        profile.name && profile.name !== "Profile Not Found"
            ? profile.name.charAt(0).toUpperCase()
            : "NF";

    return (
        <div className="profile-view-wrapper">
            {" "}
            <Box sx={{ p: 0, mb: 3 }}>
                {" "}
                <Button
                    onClick={onBack}
                    startIcon={<ArrowBackIcon />}
                    sx={{ color: "rgba(241, 247, 242, 1)", textTransform: "none" }}
                >
                    BACK TO DASHBOARD                {" "}
                </Button>
                {" "}
            </Box>
            {" "}
            <div className="profile-view-container">
                {" "}
                <div className="profile-card-container">
                    <ProfileRow label="Name" value={profile.name} />
                    {" "}
                    {profile.name !== "Profile Not Found" && (
                        <>
                            {" "}
                            <ProfileRow label="Emp ID" value={profile.empId} />
                            {" "}
                            <ProfileRow label="Designation" value={profile.designation} />
                            {" "}
                            <ProfileRow label="Joining Date" value={profile.joiningDate} />
                            {" "}
                            <ProfileRow label="Status" value={profile.status} />
                            {" "}
                            <ProfileRow
                                label="Primary Skills"
                                value={profile.primarySkills}
                            />
                            {" "}
                            <ProfileRow
                                label="Secondary Skills"
                                value={profile.secondarySkills}
                            />
                            {" "}
                        </>
                    )}
                    {" "}
                </div>
                {" "}
                <div className="profile-photo-column">
                    {" "}
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
                        {avatarInitial}                   {" "}
                    </Avatar>
                    {" "}
                </div>
                {" "}
            </div>
            {" "}
        </div>
    );
};

export default EmployeeProfile;
