import React from 'react';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const Notifications = () => {
    const allNotifications = [
        { id: 1, title: 'New Course Available', message: 'Introduction to AI Ethics has been added.', time: '2 hrs ago', type: 'info', read: false },
        { id: 2, title: 'Internship Application Update', message: 'Your application for ISRO Internship is under review.', time: '1 day ago', type: 'info', read: false },
        { id: 3, title: 'Certificate Earned', message: 'Congratulations! You completed "Orbital Mechanics".', time: '2 days ago', type: 'success', read: true },
        { id: 4, title: 'System Maintenance', message: 'Scheduled maintenance on Sunday 2 AM - 4 AM.', time: '3 days ago', type: 'warning', read: true },
        { id: 5, title: 'Welcome to the Portal', message: 'Get started by exploring courses.', time: '1 week ago', type: 'info', read: true },
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle size={20} color="#4CAF50" />;
            case 'warning': return <AlertTriangle size={20} color="#FFC107" />;
            default: return <Info size={20} color="var(--primary-color)" />;
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1>Notifications</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Stay updated with course announcements and application status.</p>
            </div>

            <div style={{ background: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                {allNotifications.map((notification) => (
                    <div
                        key={notification.id}
                        style={{
                            padding: '1.5rem',
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            gap: '1rem',
                            background: notification.read ? 'transparent' : 'var(--surface-hover)'
                        }}
                    >
                        <div style={{ marginTop: '2px' }}>
                            {getIcon(notification.type)}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1rem', margin: 0 }}>{notification.title}</h3>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{notification.time}</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{notification.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
