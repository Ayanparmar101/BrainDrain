import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Award, Save, X } from 'lucide-react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [studentData, setStudentData] = useState({
        name: 'Ayan Parmar',
        id: '2024001',
        email: 'ayan.parmar@student.portal.gov',
        phone: '+91 98765 43210',
        location: 'Mumbai, India',
        department: 'Computer Science & Engineering',
        semester: '6th Semester',
        cgpa: '8.9',
        skills: ['React', 'Node.js', 'Python', 'Data Structures', 'AWS'],
        achievements: [
            'Winner of National Hackathon 2024',
            'Published paper on AI Ethics',
            'Student Representative 2023-24'
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log('Profile saved:', studentData);
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1>Student Profile</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Manage your personal information and academic records.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Left Column - Profile Card */}
                <div style={{
                    background: 'var(--surface-color)',
                    padding: '2rem',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center',
                    height: 'fit-content'
                }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        background: 'var(--surface-hover)',
                        borderRadius: '50%',
                        margin: '0 auto 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)'
                    }}>
                        <User size={64} />
                    </div>

                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={studentData.name}
                            onChange={handleInputChange}
                            style={{
                                marginBottom: '0.5rem',
                                textAlign: 'center',
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-color)',
                                color: 'var(--text-primary)',
                                fontSize: '1.2rem',
                                fontWeight: 'bold'
                            }}
                        />
                    ) : (
                        <h2 style={{ marginBottom: '0.5rem' }}>{studentData.name}</h2>
                    )}

                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{studentData.department}</p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{studentData.cgpa}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>CGPA</div>
                        </div>
                        <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{studentData.semester}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sem</div>
                        </div>
                    </div>

                    {isEditing ? (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={handleSave} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                <Save size={16} /> Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className="btn" style={{ flex: 1, justifyContent: 'center', background: 'var(--surface-hover)' }}>
                                <X size={16} /> Cancel
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Right Column - Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Contact Info */}
                    <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={20} /> Personal Details
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Student ID</div>
                                <div style={{ fontWeight: '500' }}>{studentData.id}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Email</div>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={studentData.email}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
                                    />
                                ) : (
                                    <div style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Mail size={16} /> {studentData.email}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Phone</div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="phone"
                                        value={studentData.phone}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
                                    />
                                ) : (
                                    <div style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Phone size={16} /> {studentData.phone}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Location</div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={studentData.location}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
                                    />
                                ) : (
                                    <div style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <MapPin size={16} /> {studentData.location}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Skills & Achievements */}
                    <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Award size={20} /> Skills & Achievements
                        </h3>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Technical Skills</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {studentData.skills.map((skill, index) => (
                                    <span key={index} style={{
                                        background: 'var(--surface-hover)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-primary)'
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Key Achievements</div>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {studentData.achievements.map((achievement, index) => (
                                    <li key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.95rem'
                                    }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-color)' }}></div>
                                        {achievement}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
