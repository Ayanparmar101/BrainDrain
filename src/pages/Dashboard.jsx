import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen, Apple, ArrowRight, TrendingUp, Award, Clock, Target,
    CheckCircle, PlayCircle, Calendar, Bell, Flame, Trophy, Users,
    MessageSquare, Heart, Zap, Star, ChevronRight, Activity, BarChart3,
    Sparkles, Rocket, Medal, Crown, Utensils, Scale, Droplet
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [streak, setStreak] = useState(14);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const stats = [
        { label: 'Courses Enrolled', value: '10', icon: <BookOpen size={20} />, color: '#8B9D7F', bgColor: '#F0F4ED', change: '+2 this month', trend: 'up' },
        { label: 'Courses Completed', value: '6', icon: <CheckCircle size={20} />, color: '#6B7D5F', bgColor: '#EDF2E8', change: '+1 this week', trend: 'up' },
        { label: 'Certificates Earned', value: '6', icon: <Award size={20} />, color: '#D4A574', bgColor: '#FFF9F0', change: '+1 new', trend: 'up' },
        { label: 'Study Hours', value: '142', icon: <Clock size={20} />, color: '#D97642', bgColor: '#FFF5F0', change: '18h this week', trend: 'up' },
        { label: 'Current Streak', value: `${streak}`, icon: <Flame size={20} />, color: '#C4632E', bgColor: '#FFF3EC', change: 'Impressive!', trend: 'up' },
        { label: 'Rank', value: '#8', icon: <Trophy size={20} />, color: '#A68B5B', bgColor: '#FAF7F0', change: 'Top 3%', trend: 'up' },
        { label: 'Health Score', value: '87', icon: <Heart size={20} />, color: '#C97F8C', bgColor: '#FFF5F7', change: '+5 this week', trend: 'up' },
        { label: 'Meal Plans', value: '12', icon: <Utensils size={20} />, color: '#7A9B9E', bgColor: '#F0F6F7', change: '3 active', trend: 'neutral' },
    ];

    const recentCourses = [
        { id: 1, title: 'Sports Nutrition Masterclass', progress: 78, lastAccessed: '1 hour ago', nextLesson: 'Pre & Post-Workout Nutrition', duration: '35 min', instructor: 'Dr. Amanda Stevens', rating: 4.9, students: 8234 },
        { id: 2, title: 'Plant-Based Nutrition Fundamentals', progress: 65, lastAccessed: '3 hours ago', nextLesson: 'Complete Protein Sources', duration: '28 min', instructor: 'Sarah Williams', rating: 4.8, students: 12456 },
        { id: 3, title: 'Gut Health & Microbiome', progress: 52, lastAccessed: '1 day ago', nextLesson: 'Probiotic Foods Guide', duration: '22 min', instructor: 'Prof. Michael Chen', rating: 4.7, students: 9876 },
        { id: 4, title: 'Weight Management Science', progress: 41, lastAccessed: '2 days ago', nextLesson: 'Metabolic Rate Basics', duration: '30 min', instructor: 'Dr. Lisa Johnson', rating: 4.8, students: 15234 },
    ];

    const upcomingDeadlines = [
        { id: 1, title: 'Nutrition Quiz: Macronutrients', course: 'Sports Nutrition', date: 'Tomorrow, 11:59 PM', priority: 'high', points: 100 },
        { id: 2, title: 'Meal Plan Assignment', course: 'Clinical Nutrition', date: 'In 2 days', priority: 'high', points: 150 },
        { id: 3, title: 'Case Study: Gut Health', course: 'Microbiome', date: 'In 4 days', priority: 'medium', points: 75 },
        { id: 4, title: 'Supplement Analysis Report', course: 'Advanced Nutrition', date: 'In 6 days', priority: 'medium', points: 120 },
        { id: 5, title: 'Food Label Reading Exercise', course: 'Basics', date: 'In 1 week', priority: 'low', points: 50 },
    ];

    const achievements = [
        { id: 1, title: 'Health Champion', description: 'Maintained 14-day streak', icon: '🏆', unlocked: true, rarity: 'epic', points: 200 },
        { id: 2, title: 'Nutrition Expert', description: 'Completed 5 courses', icon: '🥗', unlocked: true, rarity: 'rare', points: 150 },
        { id: 3, title: 'Meal Planner Pro', description: 'Created 10 meal plans', icon: '📋', unlocked: true, rarity: 'rare', points: 100 },
        { id: 4, title: 'Early Riser', description: 'Logged breakfast 7 days straight', icon: '🌅', unlocked: true, rarity: 'common', points: 50 },
        { id: 5, title: 'Hydration Hero', description: 'Met water goal 14 days', icon: '💧', unlocked: true, rarity: 'rare', points: 100 },
        { id: 6, title: 'Master Nutritionist', description: 'Complete 10 courses', icon: '👑', unlocked: false, progress: '6/10', rarity: 'legendary', points: 500 },
        { id: 7, title: 'Perfect Balance', description: 'Maintain 85+ health score for month', icon: '⚖️', unlocked: false, progress: '14/30', rarity: 'epic', points: 250 },
        { id: 8, title: 'Community Helper', description: 'Help 20 members in forums', icon: '🤝', unlocked: false, progress: '12/20', rarity: 'rare', points: 150 },
    ];

    const leaderboard = [
        { rank: 1, name: 'Emma Rodriguez', points: 4250, avatar: '👩‍⚕️', streak: 28, badges: 15 },
        { rank: 2, name: 'David Kim', points: 3980, avatar: '👨‍⚕️', streak: 21, badges: 13 },
        { rank: 3, name: 'Sophia Martinez', points: 3750, avatar: '👩‍🏫', streak: 18, badges: 12 },
        { rank: 4, name: 'James Wilson', points: 3620, avatar: '👨‍💼', streak: 16, badges: 11 },
        { rank: 5, name: 'Olivia Brown', points: 3450, avatar: '👩‍🔬', streak: 19, badges: 10 },
        { rank: 8, name: 'You (Ayan Parmar)', points: 3180, avatar: '👨‍🎓', streak: 14, badges: 8, isCurrentUser: true },
    ];

    const recentActivity = [
        { id: 1, type: 'completed', title: 'Completed "Macronutrient Ratios" lesson', time: '1 hour ago', icon: <CheckCircle size={16} />, color: '#4CAF50' },
        { id: 2, type: 'achievement', title: 'Earned "Health Champion" badge', time: '5 hours ago', icon: <Award size={16} />, color: '#FFC107' },
        { id: 3, type: 'quiz', title: 'Scored 94% in Plant Nutrition Quiz', time: '1 day ago', icon: <Star size={16} />, color: '#06b6d4' },
        { id: 4, type: 'discussion', title: 'Posted in Gut Health Forum', time: '2 days ago', icon: <MessageSquare size={16} />, color: '#9C27B0' },
        { id: 5, type: 'certificate', title: 'Earned Sports Nutrition Certificate', time: '4 days ago', icon: <Award size={16} />, color: '#FFC107' },
    ];

    const nutritionSchedule = [
        { day: 'Mon', calories: 2100, completed: true },
        { day: 'Tue', calories: 1950, completed: true },
        { day: 'Wed', calories: 2200, completed: true },
        { day: 'Thu', calories: 2050, completed: true },
        { day: 'Fri', calories: 1980, completed: true },
        { day: 'Sat', calories: 2300, completed: true },
        { day: 'Sun', calories: 2150, completed: true },
    ];

    const recommendedCourses = [
        { id: 1, title: 'Advanced Clinical Nutrition', category: 'Medical', duration: '8 weeks', level: 'Advanced', rating: 4.9, enrolled: 3210 },
        { id: 2, title: 'Pediatric Nutrition', category: 'Specialized', duration: '6 weeks', level: 'Intermediate', rating: 4.8, enrolled: 2890 },
        { id: 3, title: 'Holistic Wellness Coaching', category: 'Wellness', duration: '10 weeks', level: 'Beginner', rating: 4.7, enrolled: 5432 },
    ];

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return '🌅 Good Morning';
        if (hour < 17) return '☀️ Good Afternoon';
        if (hour < 21) return '🌆 Good Evening';
        return '🌙 Good Night';
    };

    return (
        <div>
            {/* Animated Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #4ade80 100%)',
                borderRadius: '20px',
                padding: '3rem',
                marginBottom: '2rem',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    animation: 'float 6s ease-in-out infinite'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-5%',
                    width: '300px',
                    height: '300px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    animation: 'float 8s ease-in-out infinite reverse'
                }}></div>

                <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {getGreeting()}, Ayan! <Sparkles size={32} />
                            </h1>
                            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                                {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <p style={{ fontSize: '1rem', opacity: 0.8, marginTop: '0.5rem' }}>
                                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                                <Flame size={48} color="#FF6B35" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{streak} Day Streak!</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Stay consistent</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Health Score</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>87/100</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Global Rank</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>#8</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Daily Calories</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>2050</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Water Intake</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>2.5L</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {stats.map((stat, index) => (
                    <div key={index} style={{
                        background: 'var(--surface-color)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        transition: 'all 0.3s',
                        cursor: 'pointer'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '10px',
                                background: `${stat.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: stat.color
                            }}>
                                {stat.icon}
                            </div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: stat.trend === 'up' ? '#4CAF50' : '#666',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                backgroundColor: stat.trend === 'up' ? '#4CAF5015' : '#f5f5f5',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '6px'
                            }}>
                                {stat.trend === 'up' && <TrendingUp size={12} />}
                                {stat.change}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{stat.value}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Tabs */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '2rem',
                padding: '0.5rem',
                background: 'var(--surface-color)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                flexWrap: 'wrap'
            }}>
                {['overview', 'courses', 'activity', 'achievements', 'leaderboard', 'schedule'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: activeTab === tab ? 'var(--primary-color)' : 'transparent',
                            color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            fontSize: '0.9rem'
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    {/* Recent Courses */}
                    <div style={{
                        background: 'var(--surface-color)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '16px',
                        padding: '1.5rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <BookOpen size={24} />
                                Continue Learning
                            </h2>
                            <button
                                onClick={() => navigate('/courses')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    padding: '0.5rem 1rem',
                                    background: 'transparent',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--primary-color)',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    fontSize: '0.85rem'
                                }}
                            >
                                View All <ArrowRight size={16} />
                            </button>
                        </div>

                        {recentCourses.map(course => (
                            <div key={course.id} style={{
                                padding: '1.25rem',
                                border: '1px solid var(--border-color)',
                                borderRadius: '12px',
                                marginBottom: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                                onClick={() => navigate('/courses')}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{course.title}</h3>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            <span>By {course.instructor}</span>
                                            <span>• {course.duration}</span>
                                            <span>• <Star size={12} style={{ display: 'inline', marginRight: '2px', fill: '#FFC107', color: '#FFC107' }} />{course.rating}</span>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{course.progress}%</div>
                                </div>
                                <div style={{ position: 'relative', height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{
                                        position: 'absolute',
                                        height: '100%',
                                        width: `${course.progress}%`,
                                        background: 'linear-gradient(90deg, var(--primary-color), var(--accent-color))',
                                        transition: 'width 0.3s'
                                    }}></div>
                                </div>
                                <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <PlayCircle size={14} />
                                    Next: {course.nextLesson}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Upcoming Deadlines */}
                    <div style={{
                        background: 'var(--surface-color)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '16px',
                        padding: '1.5rem'
                    }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={24} />
                            Upcoming Deadlines
                        </h2>

                        {upcomingDeadlines.map(deadline => (
                            <div key={deadline.id} style={{
                                padding: '1rem',
                                border: `1px solid ${deadline.priority === 'high' ? '#ef4444' : deadline.priority === 'medium' ? '#f59e0b' : '#94a3b8'}`,
                                borderLeft: `4px solid ${deadline.priority === 'high' ? '#ef4444' : deadline.priority === 'medium' ? '#f59e0b' : '#94a3b8'}`,
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                background: `${deadline.priority === 'high' ? '#ef444408' : 'white'}`
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        background: deadline.priority === 'high' ? '#ef4444' : deadline.priority === 'medium' ? '#f59e0b' : '#94a3b8',
                                        color: 'white',
                                        fontWeight: '600',
                                        textTransform: 'uppercase'
                                    }}>
                                        {deadline.priority}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: '600' }}>
                                        {deadline.points} pts
                                    </span>
                                </div>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>{deadline.title}</h4>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{deadline.course}</p>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Calendar size={12} />
                                    {deadline.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'courses' && (
                <div>
                    <div style={{
                        background: 'var(--surface-color)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recommended for You</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            {recommendedCourses.map(course => (
                                <div key={course.id} style={{
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                                    onClick={() => navigate('/courses')}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        background: 'var(--primary-color)',
                                        color: 'white',
                                        borderRadius: '20px',
                                        fontSize: '0.7rem',
                                        fontWeight: '600',
                                        marginBottom: '1rem'
                                    }}>{course.level}</div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{course.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{course.category} • {course.duration}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
                                            <Users size={14} /> {course.enrolled.toLocaleString()}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#FFC107' }}>
                                            <Star size={14} fill="#FFC107" /> {course.rating}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'activity' && (
                <div style={{
                    background: 'var(--surface-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    padding: '1.5rem'
                }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Activity size={24} />
                        Recent Activity
                    </h2>
                    {recentActivity.map(activity => (
                        <div key={activity.id} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '1rem',
                            padding: '1rem',
                            borderBottom: '1px solid var(--border-color)',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                background: `${activity.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: activity.color,
                                flexShrink: 0
                            }}>
                                {activity.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '0.95rem', fontWeight: '500', marginBottom: '0.25rem' }}>{activity.title}</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'achievements' && (
                <div style={{
                    background: 'var(--surface-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    padding: '1.5rem'
                }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Trophy size={24} />
                        Your Achievements
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        {achievements.map(achievement => (
                            <div key={achievement.id} style={{
                                padding: '1.25rem',
                                border: achievement.unlocked ? '2px solid var(--primary-color)' : '1px dashed var(--border-color)',
                                borderRadius: '12px',
                                textAlign: 'center',
                                opacity: achievement.unlocked ? 1 : 0.5,
                                transition: 'all 0.3s',
                                cursor: 'pointer',
                                background: achievement.unlocked ? 'linear-gradient(135deg, rgba(22,163,74,0.05), rgba(249,115,22,0.05))' : 'transparent'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{achievement.icon}</div>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>{achievement.title}</h4>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{achievement.description}</p>
                                {achievement.unlocked ? (
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        background: `${achievement.rarity === 'legendary' ? '#9333ea' : achievement.rarity === 'epic' ? '#8b5cf6' : achievement.rarity === 'rare' ? '#3b82f6' : '#6b7280'}`,
                                        color: 'white',
                                        borderRadius: '12px',
                                        fontSize: '0.65rem',
                                        fontWeight: '600',
                                        textTransform: 'uppercase'
                                    }}>{achievement.rarity}</span>
                                ) : (
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{achievement.progress}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'leaderboard' && (
                <div style={{
                    background: 'var(--surface-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    padding: '1.5rem'
                }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Trophy size={24} />
                        Global Leaderboard
                    </h2>
                    {leaderboard.map(user => (
                        <div key={user.rank} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            padding: '1.25rem',
                            borderRadius: '12px',
                            marginBottom: '0.75rem',
                            background: user.isCurrentUser ? 'linear-gradient(90deg, rgba(22,163,74,0.1), rgba(249,115,22,0.1))' : 'white',
                            border: user.isCurrentUser ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                            <div style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: user.rank <= 3 ? '#FFC107' : 'var(--text-secondary)',
                                minWidth: '40px'
                            }}>
                                {user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : `#${user.rank}`}
                            </div>
                            <div style={{ fontSize: '2rem' }}>{user.avatar}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '0.25rem' }}>{user.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem' }}>
                                    <span><Flame size={12} style={{ display: 'inline', marginRight: '2px' }} />{user.streak} days</span>
                                    <span><Award size={12} style={{ display: 'inline', marginRight: '2px' }} />{user.badges} badges</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{user.points.toLocaleString()}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>points</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'schedule' && (
                <div style={{
                    background: 'var(--surface-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    padding: '1.5rem'
                }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BarChart3 size={24} />
                        Weekly Nutrition Tracking
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                        {nutritionSchedule.map((day, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '600' }}>
                                    {day.day}
                                </div>
                                <div style={{
                                    height: `${(day.calories / 2500) * 200}px`,
                                    minHeight: '60px',
                                    background: day.completed ? 'linear-gradient(180deg, var(--primary-color), var(--accent-color))' : '#e0e0e0',
                                    borderRadius: '8px 8px 0 0',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    paddingBottom: '0.5rem',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.85rem',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scaleY(1.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scaleY(1)'}>
                                    {day.calories}
                                </div>
                                {day.completed && (
                                    <div style={{ marginTop: '0.5rem', color: '#4CAF50' }}>
                                        <CheckCircle size={16} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Average Daily Intake: <strong style={{ color: 'var(--primary-color)' }}>2,104 calories</strong>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
