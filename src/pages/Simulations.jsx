import React, { useState } from 'react';
import { Play, ExternalLink, Clock, Users, Star, Cpu, Settings, Zap, Award, ChevronRight, Search, Filter } from 'lucide-react';

const Simulations = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showCNCModal, setShowCNCModal] = useState(false);

    const categories = [
        { id: 'all', name: 'All Simulations', count: 12 },
        { id: 'manufacturing', name: 'Manufacturing', count: 4 },
        { id: 'electronics', name: 'Electronics', count: 3 },
        { id: 'physics', name: 'Physics', count: 3 },
        { id: 'chemistry', name: 'Chemistry', count: 2 },
    ];

    const simulations = [
        {
            id: 1,
            title: '3D CNC Machine Simulator',
            description: 'Interactive CNC machining simulation with real-time 3D visualization. Learn G-code, tool paths, and manufacturing processes.',
            category: 'manufacturing',
            difficulty: 'Intermediate',
            duration: '45 min',
            users: 2453,
            rating: 4.9,
            image: '🔧',
            tags: ['CNC', 'Manufacturing', '3D', 'G-Code'],
            featured: true,
            isExternal: true,
            path: '/CNC/index.html'
        },
        {
            id: 2,
            title: 'Digital Circuit Designer',
            description: 'Build and test digital logic circuits with gates, flip-flops, and more. Visualize signal propagation in real-time.',
            category: 'electronics',
            difficulty: 'Beginner',
            duration: '30 min',
            users: 1876,
            rating: 4.7,
            image: '⚡',
            tags: ['Logic Gates', 'Digital', 'Electronics'],
            featured: false,
            comingSoon: true
        },
        {
            id: 3,
            title: 'Projectile Motion Lab',
            description: 'Study kinematics in 2D by adjusting launch angle, velocity, and height. Calculate trajectory and range.',
            category: 'physics',
            difficulty: 'Beginner',
            duration: '25 min',
            users: 3421,
            rating: 4.8,
            image: '🚀',
            tags: ['Physics', 'Kinematics', 'Motion'],
            featured: false,
            comingSoon: true
        },
        {
            id: 4,
            title: 'Virtual Chemistry Lab',
            description: 'Perform safe chemistry experiments virtually. Mix reagents, observe reactions, and record observations.',
            category: 'chemistry',
            difficulty: 'Intermediate',
            duration: '40 min',
            users: 2134,
            rating: 4.6,
            image: '🧪',
            tags: ['Chemistry', 'Lab', 'Reactions'],
            featured: false,
            comingSoon: true
        },
        {
            id: 5,
            title: 'PLC Programming Simulator',
            description: 'Program virtual PLCs using ladder logic. Control motors, sensors, and automated processes.',
            category: 'manufacturing',
            difficulty: 'Advanced',
            duration: '60 min',
            users: 1245,
            rating: 4.5,
            image: '🏭',
            tags: ['PLC', 'Automation', 'Ladder Logic'],
            featured: false,
            comingSoon: true
        },
        {
            id: 6,
            title: 'Ohm\'s Law Circuit Builder',
            description: 'Build circuits and verify V=IR relationship. Connect resistors, batteries, and measure current.',
            category: 'electronics',
            difficulty: 'Beginner',
            duration: '20 min',
            users: 4567,
            rating: 4.8,
            image: '🔌',
            tags: ['Ohm\'s Law', 'Circuits', 'Electronics'],
            featured: false,
            comingSoon: true
        },
        {
            id: 7,
            title: '3D Printing Simulator',
            description: 'Learn 3D printing concepts. Slice models, adjust settings, and simulate the printing process.',
            category: 'manufacturing',
            difficulty: 'Beginner',
            duration: '35 min',
            users: 1987,
            rating: 4.7,
            image: '🖨️',
            tags: ['3D Printing', 'Additive', 'Manufacturing'],
            featured: false,
            comingSoon: true
        },
        {
            id: 8,
            title: 'Simple Pendulum (SHM)',
            description: 'Calculate gravitational acceleration using time period. Adjust length and observe oscillations.',
            category: 'physics',
            difficulty: 'Beginner',
            duration: '20 min',
            users: 2876,
            rating: 4.6,
            image: '⏱️',
            tags: ['SHM', 'Pendulum', 'Gravity'],
            featured: false,
            comingSoon: true
        },
    ];

    const filteredSimulations = simulations.filter(sim => {
        const matchesSearch = sim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sim.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sim.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || sim.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredSimulation = simulations.find(sim => sim.featured);

    const handleLaunchSimulation = (simulation) => {
        if (simulation.comingSoon) {
            alert('This simulation is coming soon! Stay tuned.');
            return;
        }
        if (simulation.isExternal) {
            // Open CNC simulation in modal or new window
            setShowCNCModal(true);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return '#4CAF50';
            case 'Intermediate': return '#FFC107';
            case 'Advanced': return '#f44336';
            default: return '#666';
        }
    };

    return (
        <div>
            {/* Page Header */}
            <div style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                borderRadius: '16px',
                padding: '30px',
                marginBottom: '24px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '300px',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                    borderRadius: '0 16px 16px 0'
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <Cpu size={32} color="#6366f1" />
                        <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'white', margin: 0 }}>
                            Interactive Simulations
                        </h1>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '600px' }}>
                        Learn by doing! Explore our collection of interactive simulations covering manufacturing, electronics, physics, and more.
                    </p>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px',
                flexWrap: 'wrap'
            }}>
                <div style={{
                    flex: 1,
                    minWidth: '300px',
                    position: 'relative'
                }}>
                    <Search size={20} style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666'
                    }} />
                    <input
                        type="text"
                        placeholder="Search simulations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '14px 16px 14px 48px',
                            borderRadius: '12px',
                            border: '1px solid #e0e0e0',
                            fontSize: '15px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            backgroundColor: 'white'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '12px 20px',
                                borderRadius: '12px',
                                border: 'none',
                                backgroundColor: selectedCategory === cat.id ? '#6366f1' : 'white',
                                color: selectedCategory === cat.id ? 'white' : '#333',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '14px',
                                transition: 'all 0.2s',
                                boxShadow: selectedCategory === cat.id ? '0 4px 12px rgba(99, 102, 241, 0.3)' : '0 2px 4px rgba(0,0,0,0.05)'
                            }}
                        >
                            {cat.name} ({cat.count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Simulation */}
            {featuredSimulation && (
                <div style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    borderRadius: '20px',
                    padding: '32px',
                    marginBottom: '32px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                }} onClick={() => handleLaunchSimulation(featuredSimulation)}>
                    <div style={{
                        position: 'absolute',
                        top: '-50px',
                        right: '-50px',
                        width: '200px',
                        height: '200px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '50%'
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '-30px',
                        right: '100px',
                        width: '120px',
                        height: '120px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '50%'
                    }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                        <div style={{ flex: 1 }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                marginBottom: '16px'
                            }}>
                                <Star size={14} fill="white" color="white" />
                                <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>FEATURED SIMULATION</span>
                            </div>
                            <h2 style={{ fontSize: '28px', fontWeight: '700', color: 'white', marginBottom: '12px' }}>
                                {featuredSimulation.image} {featuredSimulation.title}
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '20px', maxWidth: '500px' }}>
                                {featuredSimulation.description}
                            </p>
                            <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.9)' }}>
                                    <Clock size={16} />
                                    <span>{featuredSimulation.duration}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.9)' }}>
                                    <Users size={16} />
                                    <span>{featuredSimulation.users.toLocaleString()} users</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.9)' }}>
                                    <Star size={16} fill="white" />
                                    <span>{featuredSimulation.rating}</span>
                                </div>
                            </div>
                            <button style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '14px 28px',
                                backgroundColor: 'white',
                                color: '#6366f1',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                            }}>
                                <Play size={20} fill="#6366f1" />
                                Launch Simulation
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        <div style={{
                            fontSize: '120px',
                            opacity: 0.3,
                            position: 'absolute',
                            right: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}>
                            {featuredSimulation.image}
                        </div>
                    </div>
                </div>
            )}

            {/* Simulations Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px'
            }}>
                {filteredSimulations.filter(sim => !sim.featured).map(simulation => (
                    <div
                        key={simulation.id}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer',
                            position: 'relative',
                            opacity: simulation.comingSoon ? 0.7 : 1
                        }}
                        onClick={() => handleLaunchSimulation(simulation)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                        }}
                    >
                        {simulation.comingSoon && (
                            <div style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                backgroundColor: '#f59e0b',
                                color: 'white',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '600',
                                zIndex: 2
                            }}>
                                Coming Soon
                            </div>
                        )}
                        
                        {/* Card Header */}
                        <div style={{
                            background: `linear-gradient(135deg, ${simulation.category === 'manufacturing' ? '#6366f1' : simulation.category === 'electronics' ? '#10b981' : simulation.category === 'physics' ? '#f59e0b' : '#ef4444'} 0%, ${simulation.category === 'manufacturing' ? '#8b5cf6' : simulation.category === 'electronics' ? '#059669' : simulation.category === 'physics' ? '#d97706' : '#dc2626'} 100%)`,
                            padding: '24px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '8px' }}>{simulation.image}</div>
                            <span style={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '500'
                            }}>
                                {simulation.category.charAt(0).toUpperCase() + simulation.category.slice(1)}
                            </span>
                        </div>

                        {/* Card Body */}
                        <div style={{ padding: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a2e', marginBottom: '8px' }}>
                                {simulation.title}
                            </h3>
                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
                                {simulation.description}
                            </p>

                            {/* Tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                                {simulation.tags.slice(0, 3).map((tag, idx) => (
                                    <span key={idx} style={{
                                        backgroundColor: '#f3f4f6',
                                        color: '#666',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '12px'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Stats */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: '16px',
                                borderTop: '1px solid #f0f0f0'
                            }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '13px' }}>
                                        <Clock size={14} />
                                        {simulation.duration}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '13px' }}>
                                        <Star size={14} fill="#FFC107" color="#FFC107" />
                                        {simulation.rating}
                                    </div>
                                </div>
                                <span style={{
                                    color: getDifficultyColor(simulation.difficulty),
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    padding: '4px 10px',
                                    backgroundColor: `${getDifficultyColor(simulation.difficulty)}15`,
                                    borderRadius: '6px'
                                }}>
                                    {simulation.difficulty}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CNC Simulation Modal */}
            {showCNCModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        width: '100%',
                        maxWidth: '1400px',
                        height: '90vh',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '16px 24px',
                            borderBottom: '1px solid #e0e0e0',
                            backgroundColor: '#1a1a2e'
                        }}>
                            <h2 style={{ margin: 0, color: 'white', fontSize: '20px' }}>
                                🔧 3D CNC Machine Simulator
                            </h2>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    onClick={() => window.open('/CNC/index.html', '_blank')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '8px 16px',
                                        backgroundColor: '#6366f1',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    <ExternalLink size={16} />
                                    Open in New Tab
                                </button>
                                <button
                                    onClick={() => setShowCNCModal(false)}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        <iframe
                            src="/CNC/index.html"
                            style={{
                                width: '100%',
                                height: 'calc(100% - 65px)',
                                border: 'none'
                            }}
                            title="CNC Simulator"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Simulations;
