import React, { useState } from 'react';
import { Award, MapPin, Clock, Calendar, Heart, TrendingUp, Users, CheckCircle, Star } from 'lucide-react';

const Internships = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const categories = [
        { id: 'all', label: 'All Programs', count: 12 },
        { id: 'certification', label: 'Certifications', count: 5 },
        { id: 'internship', label: 'Internships', count: 3 },
        { id: 'workshop', label: 'Workshops', count: 4 },
    ];

    const programs = [
        {
            id: 1,
            title: 'Certified Nutrition Specialist (CNS)',
            organization: 'International Nutrition Board',
            location: 'Online',
            duration: '12 Months',
            type: 'Certification',
            category: 'certification',
            stipend: 'Self-paced',
            description: 'Comprehensive certification program covering all aspects of clinical nutrition, dietary planning, and nutritional counseling.',
            requirements: ['Bachelor\'s degree', 'Basic nutrition knowledge', '1000 hours supervised practice'],
            benefits: ['Globally recognized', 'Career advancement', 'Clinical practice eligibility'],
            deadline: 'Rolling admissions',
            applicants: 2341,
            rating: 4.9,
            featured: true
        },
        {
            id: 2,
            title: 'Registered Dietitian Internship',
            organization: 'National Dietetic Association',
            location: 'Mumbai, India',
            duration: '9 Months',
            type: 'Internship',
            category: 'internship',
            stipend: '₹20,000/mo',
            description: 'Hands-on clinical dietitian training in hospital and community settings with expert supervision.',
            requirements: ['Nutrition degree', 'CGPA 7.5+', 'Cleared national exam'],
            benefits: ['Hospital experience', 'Patient counseling', 'RD eligibility'],
            deadline: 'Feb 15, 2026',
            applicants: 1456,
            rating: 4.8,
            featured: true
        },
        {
            id: 3,
            title: 'Sports Nutrition Specialist',
            organization: 'Sports Science Institute',
            location: 'Bangalore, India',
            duration: '6 Months',
            type: 'Certification',
            category: 'certification',
            stipend: 'Self-paced',
            description: 'Advanced training in athletic nutrition, performance optimization, and supplement guidance for athletes.',
            requirements: ['Nutrition background', 'Sports interest', '100 hours supervised'],
            benefits: ['Work with athletes', 'Sports teams access', 'ISSN certification'],
            deadline: 'Mar 1, 2026',
            applicants: 987,
            rating: 4.7,
            featured: false
        },
        {
            id: 4,
            title: 'Plant-Based Nutrition Certificate',
            organization: 'Vegan Nutrition Academy',
            location: 'Online',
            duration: '4 Months',
            type: 'Certification',
            category: 'certification',
            stipend: 'Self-paced',
            description: 'Specialized training in vegan and vegetarian nutrition, meal planning, and plant-based counseling.',
            requirements: ['Open to all', 'Passion for plant-based', 'Basic nutrition'],
            benefits: ['Growing field', 'Online practice', 'Recipe certification'],
            deadline: 'Rolling admissions',
            applicants: 1876,
            rating: 4.9,
            featured: false
        },
        {
            id: 5,
            title: 'Clinical Nutrition Internship',
            organization: 'Apollo Hospitals',
            location: 'Delhi, India',
            duration: '12 Months',
            type: 'Internship',
            category: 'internship',
            stipend: '₹25,000/mo',
            description: 'Comprehensive hospital-based nutrition training covering ICU, pediatrics, oncology, and general wards.',
            requirements: ['MSc Nutrition', 'CGPA 8.0+', 'Medical background preferred'],
            benefits: ['Top hospital', 'Multi-specialty exposure', 'Job placement'],
            deadline: 'Jan 31, 2026',
            applicants: 2134,
            rating: 4.9,
            featured: true
        },
        {
            id: 6,
            title: 'Pediatric Nutrition Workshop',
            organization: 'Child Health Foundation',
            location: 'Chennai, India',
            duration: '2 Weeks',
            type: 'Workshop',
            category: 'workshop',
            stipend: 'Free',
            description: 'Intensive workshop on infant and child nutrition, growth monitoring, and feeding disorders.',
            requirements: ['Healthcare professional', 'Interest in pediatrics'],
            benefits: ['Expert speakers', 'Hands-on training', 'Certificate'],
            deadline: 'Feb 10, 2026',
            applicants: 456,
            rating: 4.7,
            featured: false
        },
        {
            id: 7,
            title: 'Wellness Coach Certification',
            organization: 'Holistic Health Institute',
            location: 'Online',
            duration: '5 Months',
            type: 'Certification',
            category: 'certification',
            stipend: 'Self-paced',
            description: 'Train to become a certified wellness coach specializing in lifestyle, nutrition, and behavior change.',
            requirements: ['Open to all', 'Coaching interest', 'Complete assignments'],
            benefits: ['Start own practice', 'Global recognition', 'Business training'],
            deadline: 'Rolling admissions',
            applicants: 1234,
            rating: 4.8,
            featured: false
        },
        {
            id: 8,
            title: 'Geriatric Nutrition Internship',
            organization: 'Senior Care Nutrition',
            location: 'Pune, India',
            duration: '6 Months',
            type: 'Internship',
            category: 'internship',
            stipend: '₹18,000/mo',
            description: 'Specialized training in elderly nutrition, age-related diseases, and long-term care nutrition planning.',
            requirements: ['Nutrition degree', 'Compassionate care', 'Communication skills'],
            benefits: ['Growing field', 'Specialized expertise', 'Elder care homes'],
            deadline: 'Mar 15, 2026',
            applicants: 678,
            rating: 4.6,
            featured: false
        },
        {
            id: 9,
            title: 'Food Science Workshop',
            organization: 'Culinary Nutrition Lab',
            location: 'Goa, India',
            duration: '1 Week',
            type: 'Workshop',
            category: 'workshop',
            stipend: 'Paid accommodation',
            description: 'Hands-on workshop covering food chemistry, preservation, product development, and sensory science.',
            requirements: ['Food/nutrition student', 'Lab experience helpful'],
            benefits: ['Industry exposure', 'Networking', 'Recipe development'],
            deadline: 'Feb 28, 2026',
            applicants: 234,
            rating: 4.8,
            featured: false
        },
        {
            id: 10,
            title: 'Diabetes Education Specialist',
            organization: 'Diabetes Foundation of India',
            location: 'Hyderabad, India',
            duration: '3 Months',
            type: 'Workshop',
            category: 'workshop',
            stipend: '₹15,000/mo',
            description: 'Intensive training in diabetes management, blood sugar monitoring, and patient education.',
            requirements: ['Healthcare background', 'Basic nutrition', 'Patient care skills'],
            benefits: ['High demand', 'Specialized skill', 'Clinic opportunities'],
            deadline: 'Jan 25, 2026',
            applicants: 892,
            rating: 4.9,
            featured: false
        },
        {
            id: 11,
            title: 'Functional Nutrition Practitioner',
            organization: 'Functional Medicine Academy',
            location: 'Online',
            duration: '8 Months',
            type: 'Certification',
            category: 'certification',
            stipend: 'Self-paced',
            description: 'Advanced training in functional nutrition, root cause analysis, and personalized nutrition protocols.',
            requirements: ['Healthcare degree', 'Clinical interest', 'Case studies'],
            benefits: ['Functional medicine', 'Private practice', 'Premium services'],
            deadline: 'Rolling admissions',
            applicants: 1567,
            rating: 4.8,
            featured: false
        },
        {
            id: 12,
            title: 'Community Nutrition Workshop',
            organization: 'Public Health Nutrition',
            location: 'Kolkata, India',
            duration: '2 Weeks',
            type: 'Workshop',
            category: 'workshop',
            stipend: 'Free',
            description: 'Learn community-based nutrition programs, public health interventions, and nutrition education.',
            requirements: ['Open to all', 'Community service interest'],
            benefits: ['Social impact', 'Field experience', 'Government programs'],
            deadline: 'Feb 20, 2026',
            applicants: 345,
            rating: 4.7,
            featured: false
        },
    ];

    const filteredPrograms = programs.filter(program => 
        selectedCategory === 'all' || program.category === selectedCategory
    );

    const featuredPrograms = programs.filter(p => p.featured);

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Award size={32} color="#16a34a" />
                    Nutrition Programs & Certifications
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    Advance your career with professional certifications, internships, and specialized training programs
                </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1.5rem', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>{programs.length}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Available Programs</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>5</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Certifications</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '0.5rem' }}>3</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Internships</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>4</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Workshops</div>
                </div>
            </div>

            {/* Featured Programs */}
            {featuredPrograms.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Star size={24} fill="#FFC107" color="#FFC107" />
                        Featured Programs
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                        {featuredPrograms.map(program => (
                            <div key={program.id} style={{
                                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                                border: '2px solid var(--primary-color)',
                                borderRadius: '16px',
                                padding: '2rem',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'var(--primary-color)',
                                    color: 'white',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '12px',
                                    fontSize: '0.7rem',
                                    fontWeight: '600'
                                }}>
                                    FEATURED
                                </div>
                                
                                <div style={{ marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>
                                        {program.title}
                                    </h3>
                                    <p style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                                        {program.organization}
                                    </p>
                                </div>

                                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                    {program.description}
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                        <MapPin size={16} color="var(--primary-color)" />
                                        {program.location}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                        <Clock size={16} color="var(--primary-color)" />
                                        {program.duration}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                        <Award size={16} color="var(--primary-color)" />
                                        {program.type}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                        <Users size={16} color="var(--primary-color)" />
                                        {program.applicants} applicants
                                    </div>
                                </div>

                                <button style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    background: 'var(--primary-color)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}>
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Category Filter */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '20px',
                            border: 'none',
                            background: selectedCategory === cat.id ? 'var(--primary-color)' : 'var(--surface-color)',
                            color: selectedCategory === cat.id ? 'white' : 'var(--text-primary)',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: selectedCategory === cat.id ? '0 4px 12px rgba(22, 163, 74, 0.3)' : 'none'
                        }}
                    >
                        {cat.label} ({cat.count})
                    </button>
                ))}
            </div>

            {/* All Programs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {filteredPrograms.map((program) => (
                    <div key={program.id} style={{
                        background: 'var(--surface-color)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        position: 'relative'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.75rem',
                                    background: program.type === 'Certification' ? '#dbeafe' : program.type === 'Internship' ? '#fef3c7' : '#ede9fe',
                                    color: program.type === 'Certification' ? '#1e40af' : program.type === 'Internship' ? '#92400e' : '#5b21b6',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    marginBottom: '0.75rem'
                                }}>
                                    {program.type}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Star size={14} fill="#FFC107" color="#FFC107" />
                                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{program.rating}</span>
                            </div>
                        </div>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                            {program.title}
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            {program.organization}
                        </p>

                        <p style={{ fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            {program.description}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={14} />
                                {program.location}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={14} />
                                {program.duration}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Heart size={14} />
                                {program.stipend}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={14} />
                                {program.deadline}
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Requirements:</div>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                {program.requirements.map((req, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        <button style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}>
                            View Details & Apply
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Internships;
