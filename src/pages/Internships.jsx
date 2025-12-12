import React from 'react';
import { Briefcase, MapPin, Clock, ArrowUpRight } from 'lucide-react';

const Internships = () => {
    const internships = [
        {
            title: 'Aerospace Systems Engineer Intern',
            org: 'National Space Agency',
            location: 'Bangalore, India',
            duration: '6 Months',
            type: 'Full-time',
            stipend: '₹25,000/mo'
        },
        {
            title: 'Satellite Data Analyst',
            org: 'Remote Sensing Centre',
            location: 'Hyderabad, India',
            duration: '3 Months',
            type: 'Remote',
            stipend: '₹15,000/mo'
        },
        {
            title: 'Propulsion Research Fellow',
            org: 'Liquid Propulsion Systems Centre',
            location: 'Trivandrum, India',
            duration: '12 Months',
            type: 'On-site',
            stipend: '₹30,000/mo'
        },
        {
            title: 'AI for Space Robotics',
            org: 'Space Applications Centre',
            location: 'Ahmedabad, India',
            duration: '4 Months',
            type: 'Hybrid',
            stipend: '₹20,000/mo'
        }
    ];

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1>Internship Opportunities</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Find and apply for prestigious government internships in aerospace and technology.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {internships.map((job, index) => (
                    <div key={index} style={{
                        background: 'var(--surface-color)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        transition: 'transform 0.2s',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--primary-color)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'var(--surface-hover)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary-color)'
                            }}>
                                <Briefcase size={24} />
                            </div>
                            <span style={{
                                background: 'rgba(11, 61, 145, 0.1)',
                                color: 'var(--primary-color)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                            }}>
                                {job.type}
                            </span>
                        </div>

                        <h3 style={{ marginBottom: '0.25rem' }}>{job.title}</h3>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{job.org}</div>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <MapPin size={14} /> {job.location}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Clock size={14} /> {job.duration}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{job.stipend}</div>
                            <button className="btn" style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>
                                Apply Now <ArrowUpRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Internships;
