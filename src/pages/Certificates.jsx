import React, { useState } from 'react';
import { Award, Download, Share2, Eye, Calendar, CheckCircle, X } from 'lucide-react';

const Certificates = () => {
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [filter, setFilter] = useState('all');

    const certificates = [
        {
            id: 1,
            title: 'Machine Learning Fundamentals',
            issuer: 'Udyogwork',
            issueDate: 'November 15, 2024',
            score: '95%',
            grade: 'A+',
            credentialId: 'ML-2024-001-AYN',
            skills: ['Python', 'TensorFlow', 'Neural Networks', 'Data Analysis'],
            verified: true,
            category: 'AI & ML'
        },
        {
            id: 2,
            title: 'Full Stack Web Development',
            issuer: 'Udyogwork',
            issueDate: 'October 28, 2024',
            score: '92%',
            grade: 'A',
            credentialId: 'WD-2024-002-AYN',
            skills: ['React', 'Node.js', 'MongoDB', 'Express'],
            verified: true,
            category: 'Web Development'
        },
        {
            id: 3,
            title: 'Data Science with Python',
            issuer: 'Udyogwork',
            issueDate: 'October 10, 2024',
            score: '88%',
            grade: 'A',
            credentialId: 'DS-2024-003-AYN',
            skills: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
            verified: true,
            category: 'Data Science'
        },
        {
            id: 4,
            title: 'Cloud Computing with AWS',
            issuer: 'Udyogwork',
            issueDate: 'September 22, 2024',
            score: '90%',
            grade: 'A',
            credentialId: 'CC-2024-004-AYN',
            skills: ['AWS', 'EC2', 'S3', 'Lambda'],
            verified: true,
            category: 'Cloud & DevOps'
        },
        {
            id: 5,
            title: 'Cybersecurity Essentials',
            issuer: 'Udyogwork',
            issueDate: 'September 5, 2024',
            score: '94%',
            grade: 'A+',
            credentialId: 'CS-2024-005-AYN',
            skills: ['Network Security', 'Encryption', 'Penetration Testing'],
            verified: true,
            category: 'Security'
        },
    ];

    const stats = {
        total: certificates.length,
        thisMonth: 1,
        avgScore: '91.8%',
        verified: certificates.filter(c => c.verified).length
    };

    const categories = ['all', ...new Set(certificates.map(c => c.category))];

    const filteredCertificates = filter === 'all'
        ? certificates
        : certificates.filter(c => c.category === filter);

    const handleDownload = (cert) => {
        alert(`Downloading certificate: ${cert.title}\nCredential ID: ${cert.credentialId}\n\nThis is a demo - actual PDF download would start here.`);
    };

    const handleShare = (cert) => {
        const shareText = `I just earned a certificate in ${cert.title}! Score: ${cert.score}\nCredential ID: ${cert.credentialId}`;
        if (navigator.share) {
            navigator.share({
                title: cert.title,
                text: shareText,
            });
        } else {
            navigator.clipboard.writeText(shareText);
            alert('Certificate details copied to clipboard!');
        }
    };

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1>My Certificates</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    View, download, and share your earned certificates.
                </p>
            </div>

            {/* Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #0B3D91 0%, #1E5A9A 100%)',
                    color: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px'
                }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {stats.total}
                    </div>
                    <div style={{ opacity: 0.9 }}>Total Certificates</div>
                </div>
                <div style={{
                    background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                    color: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px'
                }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {stats.thisMonth}
                    </div>
                    <div style={{ opacity: 0.9 }}>Earned This Month</div>
                </div>
                <div style={{
                    background: 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)',
                    color: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px'
                }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {stats.avgScore}
                    </div>
                    <div style={{ opacity: 0.9 }}>Average Score</div>
                </div>
                <div style={{
                    background: 'linear-gradient(135deg, #FC3D21 0%, #E63516 100%)',
                    color: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px'
                }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {stats.verified}
                    </div>
                    <div style={{ opacity: 0.9 }}>Verified</div>
                </div>
            </div>

            {/* Filter */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
            }}>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: filter === category ? 'var(--primary-color)' : 'var(--surface-color)',
                            color: filter === category ? 'white' : 'var(--text-primary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            textTransform: 'capitalize',
                            transition: 'all 0.2s'
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Certificates Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '1.5rem'
            }}>
                {filteredCertificates.map(cert => (
                    <div key={cert.id} style={{
                        background: 'var(--surface-color)',
                        border: '2px solid var(--border-color)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                            e.currentTarget.style.borderColor = 'var(--primary-color)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                        }}
                    >
                        {/* Certificate Preview */}
                        <div style={{
                            background: 'linear-gradient(135deg, #0B3D91 0%, #1E5A9A 100%)',
                            padding: '2rem',
                            color: 'white',
                            textAlign: 'center',
                            position: 'relative'
                        }}>
                            {cert.verified && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: '#4CAF50',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}>
                                    <CheckCircle size={12} /> Verified
                                </div>
                            )}
                            <Award size={48} style={{ marginBottom: '1rem', opacity: 0.9 }} />
                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{cert.title}</h3>
                            <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>{cert.issuer}</div>
                        </div>

                        {/* Certificate Details */}
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                        Issue Date
                                    </div>
                                    <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={14} />
                                        {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                        Score
                                    </div>
                                    <div style={{
                                        fontWeight: '600',
                                        color: 'var(--primary-color)',
                                        fontSize: '1.1rem'
                                    }}>
                                        {cert.score} ({cert.grade})
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                    Skills Acquired
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {cert.skills.map((skill, index) => (
                                        <span key={index} style={{
                                            padding: '0.25rem 0.75rem',
                                            background: 'var(--surface-hover)',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            color: 'var(--text-primary)'
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{
                                padding: '0.75rem',
                                background: 'var(--surface-hover)',
                                borderRadius: '8px',
                                marginBottom: '1rem'
                            }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                    Credential ID
                                </div>
                                <div style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: 'var(--primary-color)'
                                }}>
                                    {cert.credentialId}
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => setSelectedCertificate(cert)}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        background: 'var(--surface-hover)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Eye size={16} /> View
                                </button>
                                <button
                                    onClick={() => handleDownload(cert)}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        background: 'var(--primary-color)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Download size={16} /> Download
                                </button>
                                <button
                                    onClick={() => handleShare(cert)}
                                    style={{
                                        padding: '0.75rem',
                                        background: 'var(--surface-hover)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Share2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Certificate Modal */}
            {selectedCertificate && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}
                    onClick={() => setSelectedCertificate(null)}
                >
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        maxWidth: '800px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        position: 'relative'
                    }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedCertificate(null)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                zIndex: 10
                            }}
                        >
                            <X size={20} />
                        </button>

                        {/* Certificate Design */}
                        <div style={{
                            padding: '3rem',
                            background: 'linear-gradient(135deg, #0B3D91 0%, #1E5A9A 100%)',
                            color: 'white',
                            textAlign: 'center',
                            borderBottom: '8px solid #FFC107'
                        }}>
                            <Award size={80} style={{ marginBottom: '1.5rem', opacity: 0.9 }} />
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Certificate of Completion</h1>
                            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
                                This is to certify that
                            </p>
                            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid white', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                Ayan Parmar
                            </h2>
                            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                                has successfully completed
                            </p>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>
                                {selectedCertificate.title}
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginBottom: '2rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>Score</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedCertificate.score}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>Grade</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedCertificate.grade}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>Date</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        {new Date(selectedCertificate.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.8, fontFamily: 'monospace' }}>
                                Credential ID: {selectedCertificate.credentialId}
                            </div>
                        </div>

                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <button
                                    onClick={() => handleDownload(selectedCertificate)}
                                    className="btn btn-primary"
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Download size={18} /> Download PDF
                                </button>
                                <button
                                    onClick={() => handleShare(selectedCertificate)}
                                    className="btn"
                                    style={{ background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Share2 size={18} /> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Certificates;
