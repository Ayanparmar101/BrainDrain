import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen, Briefcase, ArrowRight, TrendingUp, Award, Clock, Target,
    CheckCircle, PlayCircle, Calendar, Bell, Flame, Trophy, Users,
    MessageSquare, Brain, Zap, Star, ChevronRight, Activity, BarChart3,
    Sparkles, Rocket, Medal, Crown
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [streak, setStreak] = useState(7);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const stats = [
        { label: 'Courses Enrolled', value: '12', icon: <BookOpen size={20} />, color: '#0B3D91', change: '+3 this month', trend: 'up' },
        { label: 'Courses Completed', value: '8', icon: <CheckCircle size={20} />, color: '#4CAF50', change: '+2 this week', trend: 'up' },
        { label: 'Certificates Earned', value: '8', icon: <Award size={20} />, color: '#FFC107', change: '+3 new', trend: 'up' },
        { label: 'Study Hours', value: '187', icon: <Clock size={20} />, color: '#FC3D21', change: '22h this week', trend: 'up' },
        { label: 'Current Streak', value: `${streak}`, icon: <Flame size={20} />, color: '#FF6B35', change: 'Keep it up!', trend: 'up' },
        { label: 'Rank', value: '#12', icon: <Trophy size={20} />, color: '#9C27B0', change: 'Top 5%', trend: 'up' },
        { label: 'Points Earned', value: '2,450', icon: <Star size={20} />, color: '#00BCD4', change: '+350 this week', trend: 'up' },
        { label: 'Assignments Due', value: '3', icon: <Target size={20} />, color: '#E91E63', change: '2 urgent', trend: 'neutral' },
    ];

    const recentCourses = [
        { id: 1, title: 'Machine Learning Fundamentals', progress: 85, lastAccessed: '2 hours ago', nextLesson: 'Neural Networks Basics', duration: '45 min', instructor: 'Dr. Sarah Chen', rating: 4.8, students: 12453 },
        { id: 2, title: 'Full Stack Web Development', progress: 72, lastAccessed: '5 hours ago', nextLesson: 'React Hooks Deep Dive', duration: '30 min', instructor: 'John Martinez', rating: 4.9, students: 18234 },
        { id: 3, title: 'Data Science with Python', progress: 58, lastAccessed: '1 day ago', nextLesson: 'Pandas DataFrames', duration: '25 min', instructor: 'Prof. Emily Wang', rating: 4.7, students: 15678 },
        { id: 4, title: 'Cloud Computing with AWS', progress: 45, lastAccessed: '2 days ago', nextLesson: 'EC2 Instances', duration: '35 min', instructor: 'Michael Brown', rating: 4.6, students: 9876 },
    ];

    const upcomingDeadlines = [
        { id: 1, title: 'ML Assignment: Neural Networks', course: 'Machine Learning', date: 'Tomorrow, 11:59 PM', priority: 'high', points: 100 },
        { id: 2, title: 'Web Dev Project: E-commerce Site', course: 'Full Stack Development', date: 'In 2 days', priority: 'high', points: 150 },
        { id: 3, title: 'Data Analysis Quiz', course: 'Data Science', date: 'In 3 days', priority: 'medium', points: 50 },
        { id: 4, title: 'Cloud Architecture Design', course: 'AWS Cloud', date: 'In 5 days', priority: 'medium', points: 120 },
        { id: 5, title: 'Cybersecurity Lab Report', course: 'Security', date: 'In 1 week', priority: 'low', points: 80 },
    ];

    const achievements = [
        { id: 1, title: 'Fast Learner', description: 'Completed 3 courses in a month', icon: '🚀', unlocked: true, rarity: 'rare', points: 100 },
        { id: 2, title: 'Perfect Score', description: 'Scored 100% in a quiz', icon: '💯', unlocked: true, rarity: 'epic', points: 150 },
        { id: 3, title: 'Week Warrior', description: 'Studied 7 days in a row', icon: '🔥', unlocked: true, rarity: 'rare', points: 100 },
        { id: 4, title: 'Night Owl', description: 'Completed lesson after midnight', icon: '🦉', unlocked: true, rarity: 'common', points: 50 },
        { id: 5, title: 'Early Bird', description: 'Started learning before 6 AM', icon: '🌅', unlocked: true, rarity: 'common', points: 50 },
        { id: 6, title: 'Master', description: 'Complete 10 courses', icon: '👑', unlocked: false, progress: '8/10', rarity: 'legendary', points: 500 },
        { id: 7, title: 'Overachiever', description: 'Score above 95% in 5 courses', icon: '⭐', unlocked: false, progress: '3/5', rarity: 'epic', points: 200 },
        { id: 8, title: 'Social Butterfly', description: 'Help 10 students in forums', icon: '🦋', unlocked: false, progress: '6/10', rarity: 'rare', points: 100 },
    ];

    const leaderboard = [
        { rank: 1, name: 'Priya Sharma', points: 3850, avatar: '👩‍💻', streak: 15, badges: 12 },
        { rank: 2, name: 'Rahul Verma', points: 3620, avatar: '👨‍💻', streak: 12, badges: 10 },
        { rank: 3, name: 'Ananya Singh', points: 3450, avatar: '👩‍🎓', streak: 10, badges: 11 },
        { rank: 4, name: 'Arjun Patel', points: 3280, avatar: '👨‍🎓', streak: 8, badges: 9 },
        { rank: 5, name: 'Sneha Reddy', points: 3150, avatar: '👩‍🔬', streak: 14, badges: 8 },
        { rank: 12, name: 'You (Ayan Parmar)', points: 2450, avatar: '👨‍💼', streak: 7, badges: 5, isCurrentUser: true },
    ];

    const recentActivity = [
        { id: 1, type: 'completed', title: 'Completed "Neural Networks" lesson', time: '2 hours ago', icon: <CheckCircle size={16} />, color: '#4CAF50' },
        { id: 2, type: 'achievement', title: 'Earned "Week Warrior" badge', time: '1 day ago', icon: <Award size={16} />, color: '#FFC107' },
        { id: 3, type: 'quiz', title: 'Scored 95% in Data Science Quiz', time: '2 days ago', icon: <Star size={16} />, color: '#00BCD4' },
        { id: 4, type: 'discussion', title: 'Posted in ML Discussion Forum', time: '3 days ago', icon: <MessageSquare size={16} />, color: '#9C27B0' },
        { id: 5, type: 'certificate', title: 'Earned Cloud Computing Certificate', time: '5 days ago', icon: <Award size={16} />, color: '#FFC107' },
    ];

    const studySchedule = [
        { day: 'Mon', hours: 3.5, completed: true },
        { day: 'Tue', hours: 4.2, completed: true },
        { day: 'Wed', hours: 2.8, completed: true },
        { day: 'Thu', hours: 5.1, completed: true },
        { day: 'Fri', hours: 3.9, completed: true },
        { day: 'Sat', hours: 6.2, completed: true },
        { day: 'Sun', hours: 4.5, completed: true },
    ];

    const recommendedCourses = [
        { id: 1, title: 'Advanced Deep Learning', category: 'AI & ML', duration: '8 weeks', level: 'Advanced', rating: 4.9, enrolled: 5432 },
        { id: 2, title: 'Blockchain Development', category: 'Emerging Tech', duration: '6 weeks', level: 'Intermediate', rating: 4.7, enrolled: 3210 },
        { id: 3, title: 'Mobile App Development', category: 'Development', duration: '10 weeks', level: 'Beginner', rating: 4.8, enrolled: 8765 },
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
                background: 'linear-gradient(135deg, #0B3D91 0%, #1E5A9A 50%, #2E6AAA 100%)',
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
                            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Keep learning daily</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Points</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>2,450</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Global Rank</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>#12</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Completion Rate</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>67%</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Next Milestone</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>50pts</div>
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
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: `${stat.color}15`,
                                color: stat.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {stat.icon}
                            </div>
                            <TrendingUp size={16} color={stat.color} />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{stat.value}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{stat.label}</div>
                            <div style={{ fontSize: '0.75rem', color: stat.color, fontWeight: '600' }}>{stat.change}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                borderBottom: '2px solid var(--border-color)',
                paddingBottom: '0.5rem',
                overflowX: 'auto'
            }}>
                {['overview', 'courses', 'leaderboard', 'achievements', 'activity', 'schedule'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: activeTab === tab ? 'var(--primary-color)' : 'transparent',
                            color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            textTransform: 'capitalize',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    {/* Continue Learning */}
                    <div>
                        <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <PlayCircle size={24} /> Continue Learning
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {recentCourses.map(course => (
                                <div key={course.id} style={{
                                    background: 'var(--surface-color)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateX(8px)';
                                        e.currentTarget.style.borderColor = 'var(--primary-color)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateX(0)';
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                    }}
                                    onClick={() => navigate('/courses')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ marginBottom: '0.5rem' }}>{course.title}</h3>
                                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                                <span>👨‍🏫 {course.instructor}</span>
                                                <span>⭐ {course.rating}</span>
                                                <span>👥 {course.students.toLocaleString()} students</span>
                                            </div>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                                Last accessed: {course.lastAccessed}
                                            </p>
                                        </div>
                                        <div style={{
                                            fontSize: '2rem',
                                            fontWeight: 'bold',
                                            color: 'var(--primary-color)',
                                            minWidth: '80px',
                                            textAlign: 'right'
                                        }}>
                                            {course.progress}%
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <div style={{
                                            background: 'var(--surface-hover)',
                                            height: '10px',
                                            borderRadius: '5px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${course.progress}%`,
                                                height: '100%',
                                                background: 'linear-gradient(90deg, var(--primary-color), var(--accent-color))',
                                                transition: 'width 0.3s',
                                                borderRadius: '5px'
                                            }}></div>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem',
                                        background: 'var(--surface-hover)',
                                        borderRadius: '10px'
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                                Next Lesson
                                            </div>
                                            <div style={{ fontWeight: '600' }}>{course.nextLesson}</div>
                                        </div>
                                        <div style={{
                                            padding: '0.5rem 1rem',
                                            background: 'var(--primary-color)',
                                            color: 'white',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            <PlayCircle size={14} />
                                            {course.duration}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recommended Courses */}
                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Sparkles size={24} /> Recommended For You
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                            {recommendedCourses.map(course => (
                                <div key={course.id} style={{
                                    background: 'var(--surface-color)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '12px',
                                    padding: '1.25rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    onClick={() => navigate('/courses')}
                                >
                                    <div style={{
                                        padding: '0.5rem',
                                        background: 'var(--primary-color)',
                                        color: 'white',
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        marginBottom: '0.75rem',
                                        display: 'inline-block'
                                    }}>
                                        {course.category}
                                    </div>
                                    <h4 style={{ marginBottom: '0.75rem' }}>{course.title}</h4>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                        <div>📅 {course.duration}</div>
                                        <div>📊 {course.level}</div>
                                        <div>⭐ {course.rating} • 👥 {course.enrolled.toLocaleString()}</div>
                                    </div>
                                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                                        Enroll Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Study Streak */}
                        <div style={{
                            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
                            color: 'white',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            textAlign: 'center'
                        }}>
                            <Flame size={48} style={{ marginBottom: '0.5rem' }} />
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{streak}</div>
                            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Day Streak</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>
                                Study today to keep it going!
                            </div>
                        </div>

                        {/* Weekly Activity */}
                        <div style={{
                            background: 'var(--surface-color)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            padding: '1.5rem'
                        }}>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Activity size={20} /> This Week
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '100px', gap: '0.5rem' }}>
                                {studySchedule.map((day, index) => (
                                    <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{
                                            width: '100%',
                                            height: `${(day.hours / 7) * 100}%`,
                                            background: day.completed ? 'linear-gradient(180deg, var(--primary-color), var(--accent-color))' : 'var(--surface-hover)',
                                            borderRadius: '4px 4px 0 0',
                                            minHeight: '20px',
                                            position: 'relative'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '-20px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                fontSize: '0.7rem',
                                                fontWeight: '600',
                                                color: 'var(--primary-color)'
                                            }}>
                                                {day.hours}h
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                                            {day.day}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--surface-hover)', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total This Week</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                    {studySchedule.reduce((sum, day) => sum + day.hours, 0).toFixed(1)}h
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Deadlines */}
                        <div style={{
                            background: 'var(--surface-color)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            padding: '1.5rem'
                        }}>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={20} /> Upcoming Deadlines
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {upcomingDeadlines.slice(0, 5).map(deadline => (
                                    <div key={deadline.id} style={{
                                        padding: '0.75rem',
                                        background: 'var(--surface-hover)',
                                        borderRadius: '8px',
                                        borderLeft: `4px solid ${deadline.priority === 'high' ? '#FC3D21' : deadline.priority === 'medium' ? '#FFC107' : '#4CAF50'}`,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                                    >
                                        <div style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: '0.9rem' }}>{deadline.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                            {deadline.course}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: '600' }}>
                                                {deadline.date}
                                            </div>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                padding: '0.25rem 0.5rem',
                                                background: 'var(--primary-color)',
                                                color: 'white',
                                                borderRadius: '12px',
                                                fontWeight: '600'
                                            }}>
                                                {deadline.points} pts
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div style={{
                            background: 'var(--surface-color)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            padding: '1.5rem'
                        }}>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Zap size={20} /> Quick Actions
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/courses')}
                                    style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <BookOpen size={16} /> Browse Courses
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => navigate('/internships')}
                                    style={{ width: '100%', justifyContent: 'center', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Briefcase size={16} /> Find Internships
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => navigate('/certificates')}
                                    style={{ width: '100%', justifyContent: 'center', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Award size={16} /> View Certificates
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => navigate('/resources')}
                                    style={{ width: '100%', justifyContent: 'center', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <BookOpen size={16} /> Study Resources
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'leaderboard' && (
                <div>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Trophy size={28} color="#FFC107" /> Global Leaderboard
                    </h2>
                    <div style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                        {leaderboard.map((user, index) => (
                            <div key={index} style={{
                                padding: '1.5rem',
                                borderBottom: index < leaderboard.length - 1 ? '1px solid var(--border-color)' : 'none',
                                background: user.isCurrentUser ? 'var(--surface-hover)' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                transition: 'all 0.2s'
                            }}
                                onMouseEnter={(e) => !user.isCurrentUser && (e.currentTarget.style.background = 'var(--surface-hover)')}
                                onMouseLeave={(e) => !user.isCurrentUser && (e.currentTarget.style.background = 'transparent')}
                            >
                                <div style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    minWidth: '40px',
                                    color: user.rank === 1 ? '#FFD700' : user.rank === 2 ? '#C0C0C0' : user.rank === 3 ? '#CD7F32' : 'var(--text-secondary)'
                                }}>
                                    {user.rank === 1 && <Crown size={32} color="#FFD700" />}
                                    {user.rank === 2 && <Medal size={32} color="#C0C0C0" />}
                                    {user.rank === 3 && <Medal size={32} color="#CD7F32" />}
                                    {user.rank > 3 && `#${user.rank}`}
                                </div>
                                <div style={{ fontSize: '2rem' }}>{user.avatar}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                                        {user.name} {user.isCurrentUser && <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)' }}>(You)</span>}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem' }}>
                                        <span>🔥 {user.streak} day streak</span>
                                        <span>🏆 {user.badges} badges</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                        {user.points.toLocaleString()}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>points</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'achievements' && (
                <div>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Award size={28} color="#FFC107" /> Achievements & Badges
                    </h2>
                    <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                            <div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>5</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Unlocked</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>3</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>In Progress</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFC107' }}>500</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Points</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {achievements.map(achievement => (
                            <div key={achievement.id} style={{
                                background: 'var(--surface-color)',
                                border: `2px solid ${achievement.unlocked ?
                                    achievement.rarity === 'legendary' ? '#FF6B35' :
                                        achievement.rarity === 'epic' ? '#9C27B0' :
                                            achievement.rarity === 'rare' ? '#00BCD4' : 'var(--border-color)'
                                    : 'var(--border-color)'}`,
                                borderRadius: '12px',
                                padding: '1.5rem',
                                textAlign: 'center',
                                opacity: achievement.unlocked ? 1 : 0.6,
                                position: 'relative',
                                transition: 'all 0.3s'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {!achievement.unlocked && achievement.progress && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem',
                                        background: 'var(--surface-hover)',
                                        borderRadius: '4px',
                                        color: 'var(--text-secondary)',
                                        fontWeight: '600'
                                    }}>
                                        {achievement.progress}
                                    </div>
                                )}
                                <div style={{
                                    fontSize: '4rem',
                                    marginBottom: '0.75rem',
                                    filter: achievement.unlocked ? 'none' : 'grayscale(100%)'
                                }}>
                                    {achievement.icon}
                                </div>
                                <div style={{
                                    fontSize: '0.7rem',
                                    padding: '0.25rem 0.75rem',
                                    background: achievement.rarity === 'legendary' ? '#FF6B3520' :
                                        achievement.rarity === 'epic' ? '#9C27B020' :
                                            achievement.rarity === 'rare' ? '#00BCD420' : 'var(--surface-hover)',
                                    color: achievement.rarity === 'legendary' ? '#FF6B35' :
                                        achievement.rarity === 'epic' ? '#9C27B0' :
                                            achievement.rarity === 'rare' ? '#00BCD4' : 'var(--text-secondary)',
                                    borderRadius: '12px',
                                    display: 'inline-block',
                                    marginBottom: '0.75rem',
                                    fontWeight: '700',
                                    textTransform: 'uppercase'
                                }}>
                                    {achievement.rarity}
                                </div>
                                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{achievement.title}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                    {achievement.description}
                                </p>
                                {achievement.unlocked ? (
                                    <div style={{
                                        padding: '0.75rem',
                                        background: '#4CAF5020',
                                        color: '#4CAF50',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <CheckCircle size={16} /> Unlocked • +{achievement.points} pts
                                    </div>
                                ) : (
                                    <div style={{
                                        padding: '0.75rem',
                                        background: 'var(--surface-hover)',
                                        color: 'var(--text-secondary)',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600'
                                    }}>
                                        🔒 Locked • {achievement.points} pts
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'activity' && (
                <div>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Activity size={28} /> Recent Activity
                    </h2>
                    <div style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                        {recentActivity.map((activity, index) => (
                            <div key={activity.id} style={{
                                padding: '1.5rem',
                                borderBottom: index < recentActivity.length - 1 ? '1px solid var(--border-color)' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                transition: 'all 0.2s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-hover)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: `${activity.color}20`,
                                    color: activity.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {activity.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{activity.title}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{activity.time}</div>
                                </div>
                                <ChevronRight size={20} color="var(--text-secondary)" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'schedule' && (
                <div>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={28} /> Study Schedule
                    </h2>
                    <div style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Weekly Overview</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '200px', gap: '1rem', padding: '1rem', background: 'var(--surface-hover)', borderRadius: '12px' }}>
                                {studySchedule.map((day, index) => (
                                    <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                                        <div style={{
                                            width: '100%',
                                            height: `${(day.hours / 7) * 100}%`,
                                            background: day.completed ? 'linear-gradient(180deg, #0B3D91, #1E5A9A)' : 'var(--border-color)',
                                            borderRadius: '8px 8px 0 0',
                                            minHeight: '30px',
                                            position: 'relative',
                                            transition: 'all 0.3s'
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scaleY(1.05)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scaleY(1)'}
                                        >
                                            <div style={{
                                                position: 'absolute',
                                                top: '-25px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                fontSize: '0.85rem',
                                                fontWeight: '700',
                                                color: 'var(--primary-color)',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {day.hours}h
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '700' }}>
                                            {day.day}
                                        </div>
                                        {day.completed && <CheckCircle size={16} color="#4CAF50" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            <div style={{ padding: '1.5rem', background: 'var(--surface-hover)', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                                    {studySchedule.reduce((sum, day) => sum + day.hours, 0).toFixed(1)}h
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total This Week</div>
                            </div>
                            <div style={{ padding: '1.5rem', background: 'var(--surface-hover)', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '0.5rem' }}>
                                    {(studySchedule.reduce((sum, day) => sum + day.hours, 0) / 7).toFixed(1)}h
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Daily Average</div>
                            </div>
                            <div style={{ padding: '1.5rem', background: 'var(--surface-hover)', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFC107', marginBottom: '0.5rem' }}>
                                    {Math.max(...studySchedule.map(d => d.hours)).toFixed(1)}h
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Best Day</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
