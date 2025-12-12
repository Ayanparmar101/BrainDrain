import React, { useState } from 'react';
import { FileText, Download, Video, Link as LinkIcon, BookOpen, Code, FileCode, Search, Filter } from 'lucide-react';

const Resources = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', label: 'All Resources', icon: <FileText size={16} /> },
        { id: 'documents', label: 'Documents', icon: <FileText size={16} /> },
        { id: 'videos', label: 'Videos', icon: <Video size={16} /> },
        { id: 'code', label: 'Code Samples', icon: <Code size={16} /> },
        { id: 'links', label: 'External Links', icon: <LinkIcon size={16} /> },
    ];

    const resources = [
        // Documents
        {
            id: 1,
            title: 'Machine Learning Cheat Sheet',
            description: 'Comprehensive guide covering all ML algorithms and techniques',
            type: 'documents',
            format: 'PDF',
            size: '2.5 MB',
            downloads: 1234,
            category: 'AI & ML',
            downloadUrl: '#'
        },
        {
            id: 2,
            title: 'Python Programming Guide',
            description: 'Complete Python reference with examples and best practices',
            type: 'documents',
            format: 'PDF',
            size: '3.2 MB',
            downloads: 2156,
            category: 'Programming',
            downloadUrl: '#'
        },
        {
            id: 3,
            title: 'Data Structures Handbook',
            description: 'Visual guide to common data structures and algorithms',
            type: 'documents',
            format: 'PDF',
            size: '4.1 MB',
            downloads: 1876,
            category: 'Computer Science',
            downloadUrl: '#'
        },
        {
            id: 4,
            title: 'Web Development Roadmap 2024',
            description: 'Step-by-step guide to becoming a full-stack developer',
            type: 'documents',
            format: 'PDF',
            size: '1.8 MB',
            downloads: 3421,
            category: 'Web Development',
            downloadUrl: '#'
        },
        // Videos
        {
            id: 5,
            title: 'Neural Networks Explained',
            description: 'Visual explanation of how neural networks work',
            type: 'videos',
            format: 'MP4',
            duration: '45 min',
            views: 5432,
            category: 'AI & ML',
            downloadUrl: '#'
        },
        {
            id: 6,
            title: 'React Hooks Tutorial',
            description: 'Complete guide to React Hooks with practical examples',
            type: 'videos',
            format: 'MP4',
            duration: '1h 20min',
            views: 4321,
            category: 'Web Development',
            downloadUrl: '#'
        },
        {
            id: 7,
            title: 'Database Design Fundamentals',
            description: 'Learn how to design efficient database schemas',
            type: 'videos',
            format: 'MP4',
            duration: '55 min',
            views: 2987,
            category: 'Database',
            downloadUrl: '#'
        },
        // Code Samples
        {
            id: 8,
            title: 'Authentication System (Node.js)',
            description: 'Complete JWT authentication implementation',
            type: 'code',
            format: 'ZIP',
            size: '156 KB',
            downloads: 876,
            category: 'Backend',
            downloadUrl: '#'
        },
        {
            id: 9,
            title: 'React Dashboard Template',
            description: 'Modern dashboard with charts and analytics',
            type: 'code',
            format: 'ZIP',
            size: '2.3 MB',
            downloads: 1543,
            category: 'Frontend',
            downloadUrl: '#'
        },
        {
            id: 10,
            title: 'Machine Learning Models Collection',
            description: 'Pre-trained models for common ML tasks',
            type: 'code',
            format: 'ZIP',
            size: '45 MB',
            downloads: 654,
            category: 'AI & ML',
            downloadUrl: '#'
        },
        // External Links
        {
            id: 11,
            title: 'MDN Web Docs',
            description: 'Comprehensive web development documentation',
            type: 'links',
            url: 'https://developer.mozilla.org',
            category: 'Web Development'
        },
        {
            id: 12,
            title: 'Python Official Documentation',
            description: 'Official Python language reference',
            type: 'links',
            url: 'https://docs.python.org',
            category: 'Programming'
        },
        {
            id: 13,
            title: 'GitHub Student Developer Pack',
            description: 'Free developer tools and resources for students',
            type: 'links',
            url: 'https://education.github.com/pack',
            category: 'Tools'
        },
        {
            id: 14,
            title: 'Kaggle Datasets',
            description: 'Free datasets for machine learning projects',
            type: 'links',
            url: 'https://www.kaggle.com/datasets',
            category: 'Data Science'
        },
    ];

    const filteredResources = resources.filter(resource => {
        const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory;
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleDownload = (resource) => {
        alert(`Downloading: ${resource.title}\nFormat: ${resource.format}\nThis is a demo - actual download would start here.`);
    };

    const getIcon = (type) => {
        switch (type) {
            case 'documents': return <FileText size={24} color="#0B3D91" />;
            case 'videos': return <Video size={24} color="#FC3D21" />;
            case 'code': return <Code size={24} color="#4CAF50" />;
            case 'links': return <LinkIcon size={24} color="#FFC107" />;
            default: return <FileText size={24} />;
        }
    };

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1>Learning Resources</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Access study materials, video tutorials, code samples, and helpful links.
                </p>
            </div>

            {/* Search and Filter */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 3rem',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            background: 'var(--surface-color)',
                            fontSize: '1rem'
                        }}
                    />
                </div>
            </div>

            {/* Category Tabs */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
            }}>
                {categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: selectedCategory === category.id ? 'var(--primary-color)' : 'var(--surface-color)',
                            color: selectedCategory === category.id ? 'white' : 'var(--text-primary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        {category.icon}
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Results Count */}
            <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
            </div>

            {/* Resources Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {filteredResources.map(resource => (
                    <div key={resource.id} style={{
                        background: 'var(--surface-color)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* Header */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                background: 'var(--surface-hover)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {getIcon(resource.type)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ marginBottom: '0.25rem', fontSize: '1.1rem' }}>{resource.title}</h3>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--text-secondary)',
                                    padding: '0.25rem 0.5rem',
                                    background: 'var(--surface-hover)',
                                    borderRadius: '4px',
                                    display: 'inline-block'
                                }}>
                                    {resource.category}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem',
                            marginBottom: '1rem',
                            lineHeight: '1.5'
                        }}>
                            {resource.description}
                        </p>

                        {/* Meta Info */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: '1rem',
                            borderTop: '1px solid var(--border-color)'
                        }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                {resource.type === 'documents' || resource.type === 'code' ? (
                                    <>
                                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{resource.format}</span>
                                        {' • '}
                                        {resource.size}
                                        {' • '}
                                        {resource.downloads} downloads
                                    </>
                                ) : resource.type === 'videos' ? (
                                    <>
                                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{resource.format}</span>
                                        {' • '}
                                        {resource.duration}
                                        {' • '}
                                        {resource.views} views
                                    </>
                                ) : (
                                    <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>External Link</span>
                                )}
                            </div>

                            {/* Action Button */}
                            {resource.type === 'links' ? (
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'var(--primary-color)',
                                        color: 'white',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    Visit <LinkIcon size={14} />
                                </a>
                            ) : (
                                <button
                                    onClick={() => handleDownload(resource)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'var(--primary-color)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    Download <Download size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredResources.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    color: 'var(--text-secondary)'
                }}>
                    <BookOpen size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <h3>No resources found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    );
};

export default Resources;
