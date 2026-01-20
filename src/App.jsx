import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CoursePlayer from './pages/CoursePlayer';
import Internships from './pages/Internships';
import Resources from './pages/Resources';
import Certificates from './pages/Certificates';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import NutraCoach from './pages/NutraCoach';

function AppRoutes() {
    const { currentUser, logout, loading } = useAuth();

    // Show loading screen while checking auth state
    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-gradient)',
                color: 'var(--text-primary)',
                fontSize: '18px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        border: '4px solid rgba(15, 23, 42, 0.15)', 
                        borderTop: '4px solid var(--accent-color)', 
                        borderRadius: '50%', 
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px'
                    }}></div>
                    <p>Loading...</p>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            </div>
        );
    }

    return (
        <Layout isAuthenticated={!!currentUser} onLogout={logout}>
            <Routes>
                <Route path="/" element={!currentUser ? <Login /> : <Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/" replace />} />
                <Route path="/courses" element={currentUser ? <Courses /> : <Navigate to="/" replace />} />
                <Route path="/course/:courseId" element={currentUser ? <CoursePlayer /> : <Navigate to="/" replace />} />
                <Route path="/internships" element={currentUser ? <Internships /> : <Navigate to="/" replace />} />
                <Route path="/resources" element={currentUser ? <Resources /> : <Navigate to="/" replace />} />
                <Route path="/certificates" element={currentUser ? <Certificates /> : <Navigate to="/" replace />} />
                <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/" replace />} />
                <Route path="/notifications" element={currentUser ? <Notifications /> : <Navigate to="/" replace />} />
                <Route path="/nutracoach" element={currentUser ? <NutraCoach /> : <Navigate to="/" replace />} />
            </Routes>
        </Layout>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;
