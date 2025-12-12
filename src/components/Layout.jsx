import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Briefcase, FileText, Award, Search, Bell, User, LogOut, X, Cpu } from 'lucide-react';

const Layout = ({ children, isAuthenticated, onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New Course Available', message: 'Introduction to AI Ethics has been added.', time: '2 hrs ago', read: false },
        { id: 2, title: 'Internship Application Update', message: 'Your application for ISRO Internship is under review.', time: '1 day ago', read: false },
        { id: 3, title: 'Certificate Earned', message: 'Congratulations! You completed "Orbital Mechanics".', time: '2 days ago', read: true },
        { id: 4, title: 'System Maintenance', message: 'Scheduled maintenance on Sunday 2 AM - 4 AM.', time: '3 days ago', read: true },
    ]);

    // Search data
    const searchableContent = [
        // Courses
        { type: 'course', title: 'Machine Learning Fundamentals', path: '/courses', category: 'AI & ML' },
        { type: 'course', title: 'Deep Learning & Neural Networks', path: '/courses', category: 'AI & ML' },
        { type: 'course', title: 'Natural Language Processing', path: '/courses', category: 'AI & ML' },
        { type: 'course', title: 'Full Stack Web Development', path: '/courses', category: 'Web Development' },
        { type: 'course', title: 'React & Modern JavaScript', path: '/courses', category: 'Web Development' },
        { type: 'course', title: 'Backend Development with Node.js', path: '/courses', category: 'Web Development' },
        { type: 'course', title: 'Data Science with Python', path: '/courses', category: 'Data Science' },
        { type: 'course', title: 'Data Visualization & Analytics', path: '/courses', category: 'Data Science' },
        { type: 'course', title: 'Big Data & Hadoop', path: '/courses', category: 'Data Science' },
        { type: 'course', title: 'Cloud Computing with AWS', path: '/courses', category: 'Cloud & DevOps' },
        { type: 'course', title: 'Docker & Kubernetes', path: '/courses', category: 'Cloud & DevOps' },
        { type: 'course', title: 'Cybersecurity Essentials', path: '/courses', category: 'Security' },
        { type: 'course', title: 'Blockchain Technology', path: '/courses', category: 'Emerging Tech' },
        { type: 'course', title: 'VLSI Design & Verification', path: '/courses', category: 'Hardware' },
        // Internships
        { type: 'internship', title: 'ISRO - Satellite Systems', path: '/internships', category: 'Space Technology' },
        { type: 'internship', title: 'Google - Software Engineering', path: '/internships', category: 'Tech' },
        { type: 'internship', title: 'Microsoft - Cloud Solutions', path: '/internships', category: 'Tech' },
        { type: 'internship', title: 'Amazon - ML Research', path: '/internships', category: 'AI/ML' },
        // Pages
        { type: 'page', title: 'Dashboard', path: '/dashboard', category: 'Navigation' },
        { type: 'page', title: 'Profile', path: '/profile', category: 'Navigation' },
        { type: 'page', title: 'Certificates', path: '/certificates', category: 'Navigation' },
        { type: 'page', title: 'Resources', path: '/resources', category: 'Navigation' },
        { type: 'page', title: 'Simulations', path: '/simulations', category: 'Navigation' },
        // Simulations
        { type: 'simulation', title: '3D CNC Machine Simulator', path: '/simulations', category: 'Manufacturing' },
        { type: 'simulation', title: 'Digital Circuit Designer', path: '/simulations', category: 'Electronics' },
        { type: 'simulation', title: 'Projectile Motion Lab', path: '/simulations', category: 'Physics' },
    ];

    // If not authenticated, just render the children (Login page) without the layout
    if (!isAuthenticated) {
        return <>{children}</>;
    }

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/courses', label: 'Learning Portal', icon: <BookOpen size={20} /> },
        { path: '/simulations', label: 'Simulations', icon: <Cpu size={20} /> },
        { path: '/internships', label: 'Internships', icon: <Briefcase size={20} /> },
        { path: '/resources', label: 'Resources', icon: <FileText size={20} /> },
        { path: '/certificates', label: 'Certificates', icon: <Award size={20} /> },
    ];

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        setShowSearchResults(false);
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setShowSearchResults(query.length > 0);
        setShowNotifications(false);
    };

    const handleSearchResultClick = (path) => {
        navigate(path);
        setSearchQuery('');
        setShowSearchResults(false);
    };

    const filteredResults = searchableContent.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="logo-container">
                    <div className="logo-text">UDYOG<span>WORK</span></div>
                </div>

                <nav className="nav-menu">
                    {navItems.map((item) => (
                        <Link to={item.path} key={item.path}>
                            <div className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
                                {item.icon}
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    ))}
                </nav>

                <div className="user-profile">
                    <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                        <div style={{ fontWeight: 'bold' }}>Ayan Parmar</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Student ID: 2024001</div>
                    </div>
                    <LogOut size={18} color="var(--text-secondary)" style={{ cursor: 'pointer' }} onClick={onLogout} />
                </div>
            </aside>

            <main className="main-content">
                <header className="topbar">
                    <div className="search-bar" style={{ position: 'relative' }}>
                        <Search size={18} color="var(--text-secondary)" />
                        <input
                            type="text"
                            placeholder="Search courses, internships, pages..."
                            value={searchQuery}
                            onChange={handleSearch}
                            onFocus={() => searchQuery && setShowSearchResults(true)}
                        />

                        {/* Search Results Dropdown */}
                        {showSearchResults && filteredResults.length > 0 && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                marginTop: '0.5rem',
                                background: 'var(--surface-color)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                zIndex: 1000,
                                maxHeight: '400px',
                                overflowY: 'auto'
                            }}>
                                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                                    Search Results ({filteredResults.length})
                                </div>
                                {filteredResults.map((result, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSearchResultClick(result.path)}
                                        style={{
                                            padding: '1rem',
                                            borderBottom: index < filteredResults.length - 1 ? '1px solid var(--border-color)' : 'none',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{result.title}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                    {result.type.charAt(0).toUpperCase() + result.type.slice(1)} • {result.category}
                                                </div>
                                            </div>
                                            <div style={{
                                                padding: '0.25rem 0.75rem',
                                                background: 'var(--primary-color)',
                                                color: 'white',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600'
                                            }}>
                                                {result.type}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {showSearchResults && filteredResults.length === 0 && searchQuery && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                marginTop: '0.5rem',
                                background: 'var(--surface-color)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                zIndex: 1000,
                                padding: '2rem',
                                textAlign: 'center',
                                color: 'var(--text-secondary)'
                            }}>
                                No results found for "{searchQuery}"
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', position: 'relative' }}>
                        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={toggleNotifications}>
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    background: 'var(--accent-color)',
                                    color: 'white',
                                    fontSize: '0.6rem',
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {unreadCount}
                                </div>
                            )}
                        </div>

                        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                            <User size={20} />
                        </div>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div style={{
                                position: 'absolute',
                                top: '40px',
                                right: '0',
                                width: '320px',
                                background: 'var(--surface-color)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                zIndex: 1000,
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid var(--border-color)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <h3 style={{ fontSize: '1rem', margin: 0 }}>Notifications</h3>
                                    <X size={16} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => setShowNotifications(false)} />
                                </div>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                onClick={() => markAsRead(notification.id)}
                                                style={{
                                                    padding: '1rem',
                                                    borderBottom: '1px solid var(--border-color)',
                                                    background: notification.read ? 'transparent' : 'var(--surface-hover)',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{notification.title}</span>
                                                    {!notification.read && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-color)' }}></div>}
                                                </div>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>{notification.message}</p>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{notification.time}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                            No notifications
                                        </div>
                                    )}
                                </div>
                                <div style={{
                                    padding: '0.75rem',
                                    textAlign: 'center',
                                    borderTop: '1px solid var(--border-color)',
                                    fontSize: '0.85rem',
                                    color: 'var(--primary-color)',
                                    cursor: 'pointer',
                                    fontWeight: '500'
                                }} onClick={() => { setShowNotifications(false); navigate('/notifications'); }}>
                                    View All Notifications
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <div className="page-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
