import React, { useEffect, useState } from 'react';
import {
    MessageSquare, Mail, UploadCloud, Users, BookOpen, Github, ArrowLeft, CheckCircle, Clock, X, Phone, Key, Calendar, Zap, Dribbble, Heart
} from 'lucide-react';

// --- Global Data and Utility Functions ---

// 1. Comprehensive Employee Data (Incorporating all details from user input)
const comprehensiveEmployeeData = {
    'aarthi.g@coe.zhapix.com': { name: "Aarthi g", empId: "1004", designation: "Software Developer", joiningDate: "1/7/2025", status: "Active", primarySkills: "Frontend Development, ReactJS, Javascript, HTML, CSS", secondarySkills: "Postman, Zoho Platform, Canva, Draw.io", team: 'UI/UX', role: 'Lead Designer', phone: '+91 98765 43210' },
    'ashwathi.p@coe.zhapix.com': { name: "Ashwathi Palaniraj", empId: "INT006", designation: "Software Testing Intern", joiningDate: "1 Aug, 2025", status: "Active", primarySkills: "Software Testing, Playwright, Javascript, Cypress, Postman", secondarySkills: "N/A", team: 'QA', role: 'Test Intern', phone: '+91 90000 00000' },
    'samruthha.l@coe.zhapix.com': { name: "Samruthha Lakshmi", empId: "INT0017", designation: "Fullstack Developer Intern", joiningDate: "1 Aug, 2025", status: "Active", primarySkills: "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman", secondarySkills: "GCP-Firebase, JEST", team: 'Development', role: 'Fullstack Intern', phone: '+91 90000 00000' },
    'deepika.j@coe.zhapix.com': { name: "Deepika Jaikumar", empId: "INT0014", designation: "Software Testing Intern", joiningDate: "1 Aug, 2025", status: "Active", primarySkills: "Software Testing, Playwright, Javascript, Cypress, Postman", secondarySkills: "N/A", team: 'QA', role: 'Test Intern', phone: '+91 90000 00000' },
    'yogesh.b@coe.zhapix.com': { name: "Yogesh Kumar B", empId: "1003", designation: "QA Engineer", joiningDate: "1 Jun, 2025", status: "Active", primarySkills: "Software Testing, Playwright, Javascript, Cypress, Postman, Github", secondarySkills: "Zoho Tools", team: 'Backend', role: 'Senior Developer', phone: '+91 99887 76655' },
    'sunitha.c@coe.zhapix.com': { name: "Sunitha Chanda", empId: "1005", designation: "Technical Support Engineer", joiningDate: "1 Sep, 2025", status: "Active", primarySkills: "UI/UX Design, Figma, Canva, Draw.io, CorelDraw, HTML, CSS, Javascript, React", secondarySkills: "Zoho Platform", team: 'Support', role: 'Tech Support Engineer', phone: '+91 90000 11111' },
    'vijayan.t@zhapix.com': { name: "Vijayan Thanigaivelu", empId: "1001", designation: "Director", joiningDate: "N/A", status: "Active", primarySkills: "zhapix", secondarySkills: "N/A", team: 'Management', role: 'Director', phone: '+91 97654 12345' },
    'ronald.k@coe.zhapix.com': { name: "Ronald Kevin", empId: "INT0016", designation: "Fullstack Developer Intern", joiningDate: "1 Aug, 2025", status: "Active", primarySkills: "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman", secondarySkills: "GCP-Firebase, JEST", team: 'Development', role: 'Fullstack Intern', phone: '+91 90000 00000' },
    'rudra.l@coe.zhapix.com': { name: "Rudramoorthy", empId: "INT0015", designation: "Fullstack Developer", joiningDate: "1 Aug, 2025", status: "Active", primarySkills: "Web Development, Javascript, ReactJS, NodeJS, MongoDB, HTML, CSS, Postman", secondarySkills: "JEST", team: 'Development', role: 'Software Developer', phone: '+91 90000 00000' },
};

/**
 * Generates initials from a full name or email for avatar fallback/placeholder.
 */
const getInitials = (email) => {
    const profile = comprehensiveEmployeeData[email.toLowerCase()];
    const nameToUse = profile?.name;

    if (nameToUse && nameToUse !== 'N/A' && nameToUse !== 'Profile Not Found') {
        // Use first two initials from the full name
        return nameToUse.split(' ')
            .filter(n => n) // Filter out empty strings
            .filter((_, index) => index < 2)
            .map(n => n.charAt(0))
            .join('')
            .toUpperCase();
    }
    
    // Fallback to the first letter of the email if name is missing
    return email.charAt(0).toUpperCase();
};

/**
 * Utility function to create a placeholder URL with initials.
 */
const getAvatarPlaceholder = (email) => {
    const initials = getInitials(email);
    // Using a green/white color scheme for the placeholder
    return `https://placehold.co/96x96/10B981/ffffff?text=${initials}`; // Increased size to 96x96
};


// Utility function to format date from YYYY-MM-DD to DD-MM-YYYY (From user input)
const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        const [year, month, day] = dateString.split('-');
        if (year && month && day) {
            return `${day}-${month}-${year}`; // DD-MM-YYYY format
        }
        return dateString;
    } catch (error) {
        return dateString; // Return original if parsing fails
    }
};

// Mock data for Program Status
const mockData = [
    { id: 1, category: 'Pre-Bootcamp', section: 'Preliminary', status: 'completed', expDate: '2025-01-10', compDate: '2025-01-10', comment: 'All modules completed successfully.' },
    { id: 2, category: 'Mastery Sessions', section: 'Bootcamp', status: 'pending', expDate: '2025-10-11', compDate: '', comment: 'Scheduled to start next month.' },
    { id: 3, category: 'Workshops', section: 'Workshop 1\nWorkshop 2', status: 'completed', expDate: '2025-10-12', compDate: '2025-10-12', comment: 'Hands-on sessions finalized.' },
    { id: 4, category: 'Value added Training', section: 'Add-on Sessions', status: 'pending', expDate: '2025-10-15', compDate: '', comment: 'Awaiting scheduling confirmation.' }, 
    { id: 5, category: 'Zhapix Internal Projects', section: 'Internship', status: 'pending', expDate: '2025-10-20', compDate: '', comment: 'Project assignment pending.' },
    { id: 6, category: 'Project Extension', section: 'Internship and Extension', status: 'pending', expDate: '2025-11-15', compDate: '', comment: 'Optional phase, scheduled later.' },
];


// --- Component Definitions ---

// Helper component for EmployeeProfile
const ProfileDetailRow = ({ label, value, IconComponent }) => {
    const isEmpty = !value || value.toString().trim() === '' || value.toString().toLowerCase() === 'n/a';
    
    if (isEmpty) {
        return null;
    }

    return (
        <div className="flex items-start p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-2 bg-indigo-50 rounded-full mr-4">
                <IconComponent className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
                <p className="text-xs font-medium uppercase text-gray-500">{label}</p>
                <p className="text-sm font-semibold text-gray-800 whitespace-pre-wrap">{value}</p>
            </div>
        </div>
    );
};


// 1. EmployeeProfile Component (Updated to use comprehensive data and new design)
const EmployeeProfile = ({ email, onBack }) => {
    const normalizedEmail = (email || '').toLowerCase();
    
    const profile = comprehensiveEmployeeData[normalizedEmail] || {
        name: "Profile Not Found",
        empId: "N/A",
        designation: "N/A",
        joiningDate: "N/A",
        status: "N/A",
        primarySkills: "N/A",
        secondarySkills: "N/A",
        team: "N/A",
        role: "N/A",
        phone: "N/A"
    };

    const userId = normalizedEmail.split('@')[0].replace('.', ' ');
    const userDomain = normalizedEmail.split('@')[1];

    const hasSkills = profile.primarySkills && profile.primarySkills.toLowerCase() !== 'n/a';
    const hasSecondarySkills = profile.secondarySkills && profile.secondarySkills.toLowerCase() !== 'n/a';

    const getStatusClasses = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-700';
            case 'inactive':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-4 sm:p-8 md:p-12 lg:p-20 bg-gray-50 min-h-screen">
            <button
                onClick={onBack}
                className="mb-8 flex items-center text-gray-700 hover:text-indigo-600 transition duration-150 ease-in-out font-medium p-2 rounded-lg hover:bg-indigo-50"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
            </button>
            
            <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 sm:p-12 text-white flex flex-col items-center">
                    <img 
                        src={getAvatarPlaceholder(normalizedEmail)} 
                        alt={`${profile.name} Avatar`} 
                        className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-2xl"
                    />
                    <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 text-center">{profile.name}</h2>
                    <p className="text-indigo-200 mt-1 text-lg font-medium">{profile.designation}</p>
                    <span className={`mt-3 px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(profile.status)}`}>
                        {profile.status}
                    </span>
                </div>

                {/* Details Grid */}
                <div className="p-4 sm:p-8 space-y-8">
                    {/* General Information Section */}
                    <div className="pt-4 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><Key className="w-5 h-5 mr-2 text-indigo-500" /> Key Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <ProfileDetailRow label="Employee ID" value={profile.empId} IconComponent={Users} />
                            <ProfileDetailRow label="Role" value={profile.role} IconComponent={BookOpen} />
                            <ProfileDetailRow label="Team" value={profile.team} IconComponent={Users} />
                            <ProfileDetailRow label="Joining Date" value={profile.joiningDate} IconComponent={Calendar} />
                            <ProfileDetailRow label="Email" value={normalizedEmail} IconComponent={Mail} />
                            <ProfileDetailRow label="Phone" value={profile.phone} IconComponent={Phone} />
                            <ProfileDetailRow label="Domain" value={userDomain} IconComponent={Dribbble} />
                        </div>
                    </div>

                    {/* Skills Section */}
                    {(hasSkills || hasSecondarySkills) && (
                        <div className="pt-4 border-b border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><Zap className="w-5 h-5 mr-2 text-indigo-500" /> Skills & Competencies</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-indigo-50 rounded-xl shadow-inner">
                                    <h4 className="text-base font-bold text-indigo-700 mb-3">Primary Skills</h4>
                                    <p className="text-sm text-gray-700">{profile.primarySkills}</p>
                                </div>
                                {hasSecondarySkills && (
                                    <div className="p-6 bg-purple-50 rounded-xl shadow-inner">
                                        <h4 className="text-base font-bold text-purple-700 mb-3">Secondary Skills</h4>
                                        <p className="text-sm text-gray-700">{profile.secondarySkills}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* About Section */}
                    <div className="pt-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><Heart className="w-5 h-5 mr-2 text-indigo-500" /> Biography</h3>
                        <p className="text-gray-600 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-inner">
                            Dedicated and result-oriented professional with a strong focus on delivering high-quality solutions. Passionate about continuous learning and contributing effectively to team success. (This is a mock bio, replace with actual data if available.)
                        </p>
                    </div>

                    {profile.name === "Profile Not Found" && (
                        <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
                            <p className="font-semibold">Error:</p>
                            <p>Employee profile data for "{email}" could not be found in the system records.</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};


// 3. ProgramStatusPage Component (Unchanged)
// ... (ProgramStatusPage, TaskRow, formatDate are essentially unchanged, only moved for clarity)
const TaskRow = ({ task }) => {
    const isCompleted = task.status === 'completed';
    // Use completion date if available, otherwise use expected date
    const rawDate = isCompleted && task.compDate ? task.compDate : task.expDate; 
    const displayDate = formatDate(rawDate); 

    const StatusIcon = isCompleted ? CheckCircle : Clock;
    const iconColor = isCompleted ? 'text-green-500' : 'text-yellow-500';
    const dateColor = isCompleted ? 'text-green-600' : 'text-gray-600';

    const renderSection = (section) => {
        if (!section) return <p className="text-sm">-</p>;
        // Handle newlines for multi-line sections
        return section.split('\n').map((line, index) => (
            <p key={index} className="text-sm whitespace-pre-wrap">
                {line}
            </p>
        ));
    };

    return (
        <div className="
            grid grid-cols-5 gap-4 py-3 px-4 border-b border-gray-100 
            hover:bg-indigo-50 transition-colors cursor-pointer text-gray-700
            "
        >
            {/* Category */}
            <div className="font-semibold text-sm col-span-1 min-w-[100px]">{task.category}</div>
            
            {/* Task/Section */}
            <div className="text-sm col-span-1">{renderSection(task.section)}</div>
            
            {/* Status Icon */}
            <div className="flex justify-center col-span-1">
                <StatusIcon className={`w-5 h-5 ${iconColor}`} />
            </div>
            
            {/* Date (Expected or Completed) */}
            <div className={`text-sm font-medium flex justify-center col-span-1 ${dateColor}`}>
                {displayDate}
            </div>
            
            {/* Comment */}
            <div className="text-xs italic text-gray-500 col-span-1">{task.comment || 'No comment provided'}</div>
        </div>
    );
};

const ProgramStatusPage = ({ onBack }) => {
    const tasks = mockData;

    return (
        <div className="p-4 sm:p-8 md:p-12 lg:p-20 bg-gray-50 min-h-screen">
            
            {/* Header Section (Replaces ProgramStatusBanner.jsx) */}
            <div className="max-w-7xl mx-auto mb-6 p-4 rounded-xl bg-indigo-800 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4">
                
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="
                        flex items-center text-sm font-semibold p-2 px-4 rounded-lg 
                        bg-indigo-600 hover:bg-indigo-500 text-white transition-colors
                    "
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    BACK TO DASHBOARD
                </button>
                
                {/* Title */}
                <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                    Program Status & Tasks
                </h2>
            </div>

            {/* Program Status Table/Grid Container */}
            <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl overflow-x-auto">
                
                {/* Table Header (Grid Row) */}
                <div className="
                    grid grid-cols-5 gap-4 p-4 font-bold text-xs sm:text-sm uppercase tracking-wider 
                    bg-gray-200 text-gray-700 border-b-2 border-gray-300 min-w-[700px]
                    "
                >
                    <div className="col-span-1">Category</div>
                    <div className="col-span-1">Task/Section</div>
                    <div className="col-span-1 flex justify-center">Status</div>
                    <div className="col-span-1 flex justify-center">Date</div>
                    <div className="col-span-1">Comment</div>
                </div>
                
                {/* Table Body (Task Rows) */}
                <div className="divide-y divide-gray-100 min-w-[700px]">
                    {tasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </div>
            </div>

            {/* Summary */}
            <div className="max-w-7xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-xl border-t-4 border-indigo-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Program Overview</h3>
                <p className="text-gray-600">
                    The training program is on track. All preliminary phases are complete. The team is currently focusing on the core Mastery Sessions and Zhapix Internal Projects, with expected completion in Q4 2025.
                </p>
            </div>
        </div>
    );
};


// 4. Card Component (Unchanged)
const Card = ({ title, link, IconComponent }) => {
    const handleClick = () => {
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            className="
                bg-white p-6 rounded-xl shadow-md 
                hover:shadow-xl hover:bg-indigo-50 
                transform transition-all duration-200 
                cursor-pointer flex flex-col items-center justify-center space-y-3
                group
            "
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleClick();
            }}
        >
            <div className="p-3 bg-indigo-100 rounded-full group-hover:bg-indigo-500 transition-colors">
                <IconComponent className="w-8 h-8 text-indigo-500 group-hover:text-white" />
            </div>
            <p className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700">
                {title}
            </p>
        </div>
    );
};


// 5. App Component (Main Dashboard - Unchanged logic, using the new data structure)
const App = () => {
    const [userEmail, setUserEmail] = useState('');
    const [selectedProfileEmail, setSelectedProfileEmail] = useState(null); 
    const [showProgramStatusPage, setShowProgramStatusPage] = useState(false); 

    useEffect(() => {
        // Mocking user email retrieval from environment/URL search params
        const searchParamVals = new URLSearchParams(window.location.search);
        // Defaulting to a known email for demonstration if not found
        setUserEmail(searchParamVals.get('userEmail') || 'aarthi.g@coe.zhapix.com'); 
    }, []);

    const normalizedEmail = userEmail.toLowerCase();
    const currentUserProfile = comprehensiveEmployeeData[normalizedEmail];
    const displayName = currentUserProfile?.name || userEmail;
    
    // Using the utility function to get the avatar placeholder URL
    const avatarImageUrl = getAvatarPlaceholder(normalizedEmail);

    const cards = [
        { title: 'Chat', link: 'https://cliq.zoho.in/', IconComponent: MessageSquare },
        { title: 'Email', link: 'https://mail.zoho.in/zm/#mail/folder/inbox', IconComponent: Mail },
        { title: 'Drive', link: 'https://workdrive.zoho.in/', IconComponent: UploadCloud },
        { title: 'GitHub', link: 'https://github.com/zhapix-coe/', IconComponent: Github },
        { title: 'People', link: 'https://people.zoho.in/', IconComponent: Users },
        { title: 'Learn', link: 'https://irp.zhapix.com', IconComponent: BookOpen },
    ];
    
    const handleEmailClick = (event) => {
        // Close other views before toggling profile view
        setShowProgramStatusPage(false); 
        // Toggles the EmployeeProfile view
        setSelectedProfileEmail(prevEmail => prevEmail ? null : normalizedEmail);
        
        // Remove focus from the button after click
        if (event && event.currentTarget) {
            event.currentTarget.blur();
        }
    };

    const handleProgramStatusClick = () => {
        // Close profile view
        setSelectedProfileEmail(null); 
        // Open Program Status view
        setShowProgramStatusPage(true);
    };

    const handleBackFromProgramStatus = () => {
        setShowProgramStatusPage(false);
    };

    // --- Conditional Rendering for Profile and Status Pages ---

    if (selectedProfileEmail) {
        return (
            <EmployeeProfile 
                email={selectedProfileEmail} 
                onBack={() => setSelectedProfileEmail(null)}
            />
        );
    }

    if (showProgramStatusPage) {
        return (
            <ProgramStatusPage onBack={handleBackFromProgramStatus} />
        );
    }
    
    // --- Main Dashboard Rendering ---

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            {/* Header */}
            <header
                className="
                    flex justify-between items-center p-4 sm:p-6 
                    bg-indigo-700 text-white shadow-xl 
                    sticky top-0 z-10
                "
            >
                {/* Logo and Title */}
                <div 
                    className="flex items-center gap-2 sm:gap-4"
                >
                    <div className="text-2xl font-black bg-white text-indigo-700 p-1 rounded-md">Z</div>
                    <h1 
                        className="text-xl sm:text-2xl font-extrabold tracking-tight select-none"
                    >
                        CoE Dashboard
                    </h1>
                </div>

                {/* Program Status Button in Header (New Location) */}
                <button
                    onClick={handleProgramStatusClick}
                    className="
                        hidden sm:flex items-center gap-2 
                        text-sm font-semibold p-2 px-3 rounded-full 
                        bg-indigo-600 hover:bg-teal-400 text-white transition-colors
                        shadow-inner ring-1 ring-white/50
                    "
                >
                    <CheckCircle className="w-5 h-5" />
                    <span className="hidden md:inline">Program Status</span>
                    <span className="inline md:hidden">Status</span>
                </button>

                {/* User Profile/Avatar Section */}
                {userEmail && (
                    <div 
                        className="
                            flex items-center gap-2 p-2 rounded-full 
                            bg-indigo-600 hover:bg-indigo-500 transition-colors 
                            cursor-pointer group
                        "
                        onClick={handleEmailClick}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') handleEmailClick(e);
                        }}
                    >
                        <img 
                            src={avatarImageUrl}
                            alt={`${displayName} Avatar`}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        />
                        <p
                            className="text-sm font-medium pr-1 hidden sm:block"
                        >
                            {displayName}
                        </p>
                    </div>
                )}
            </header>

            {/* Content Area (Links Grid) */}
            <div className="p-4 sm:p-8 max-w-7xl mx-auto">
                {/* Links Grid */}
                <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {cards.map((card) => (
                        <Card 
                            key={card.title} 
                            title={card.title} 
                            link={card.link} 
                            IconComponent={card.IconComponent} 
                        />
                    ))}
                </main>
            </div>
        </div>
    );
};

export default App;