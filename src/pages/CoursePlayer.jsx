import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayCircle, CheckCircle, Lock, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';
import videoSource from '../../videos/4549682-hd_1920_1080_30fps.mp4';

const CoursePlayer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [activeModule, setActiveModule] = useState(0);
    const [activeLesson, setActiveLesson] = useState(0);
    const [expandedModules, setExpandedModules] = useState({ 0: true });

    // Mock Data for Full Stack Course
    const courseData = {
        title: "Full Stack Web Development",
        progress: 15,
        modules: [
            {
                title: "Module 1: Introduction to Web Development",
                lessons: [
                    { title: "How the Web Works", duration: "10:00", completed: true },
                    { title: "Setting up VS Code", duration: "15:00", completed: true },
                    { title: "Git & GitHub Basics", duration: "25:00", completed: false }
                ]
            },
            {
                title: "Module 2: HTML5 Mastery",
                lessons: [
                    { title: "Semantic HTML", duration: "20:00", completed: false },
                    { title: "Forms & Validations", duration: "30:00", completed: false },
                    { title: "Accessibility Best Practices", duration: "15:00", completed: false }
                ]
            },
            {
                title: "Module 3: CSS3 & Responsive Design",
                lessons: [
                    { title: "Box Model & Flexbox", duration: "45:00", completed: false },
                    { title: "CSS Grid Layouts", duration: "40:00", completed: false },
                    { title: "Media Queries & Mobile First", duration: "35:00", completed: false }
                ]
            },
            {
                title: "Module 4: JavaScript Fundamentals",
                lessons: [
                    { title: "Variables & Data Types", duration: "20:00", completed: false },
                    { title: "Functions & Scope", duration: "30:00", completed: false },
                    { title: "DOM Manipulation", duration: "45:00", completed: false }
                ]
            },
            {
                title: "Module 5: Advanced JavaScript (ES6+)",
                lessons: [
                    { title: "Arrow Functions & Destructuring", duration: "25:00", completed: false },
                    { title: "Promises & Async/Await", duration: "35:00", completed: false },
                    { title: "Modules & Webpack", duration: "30:00", completed: false }
                ]
            },
            {
                title: "Module 6: React.js Essentials",
                lessons: [
                    { title: "Components & Props", duration: "40:00", completed: false },
                    { title: "State & Lifecycle", duration: "45:00", completed: false },
                    { title: "Hooks (useState, useEffect)", duration: "50:00", completed: false }
                ]
            },
            {
                title: "Module 7: State Management",
                lessons: [
                    { title: "Context API", duration: "30:00", completed: false },
                    { title: "Redux Toolkit Basics", duration: "55:00", completed: false },
                    { title: "Async Thunks", duration: "40:00", completed: false }
                ]
            },
            {
                title: "Module 8: Node.js & Express",
                lessons: [
                    { title: "Node.js Runtime", duration: "25:00", completed: false },
                    { title: "Building REST APIs", duration: "60:00", completed: false },
                    { title: "Middleware & Error Handling", duration: "35:00", completed: false }
                ]
            },
            {
                title: "Module 9: Database Management",
                lessons: [
                    { title: "MongoDB & NoSQL", duration: "40:00", completed: false },
                    { title: "Mongoose ODM", duration: "45:00", completed: false },
                    { title: "Data Modeling", duration: "30:00", completed: false }
                ]
            },
            {
                title: "Module 10: Deployment & DevOps",
                lessons: [
                    { title: "CI/CD Pipelines", duration: "45:00", completed: false },
                    { title: "Deploying to Vercel/Netlify", duration: "20:00", completed: false },
                    { title: "Docker Basics", duration: "50:00", completed: false }
                ]
            }
        ]
    };

    const toggleModule = (index) => {
        setExpandedModules(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const currentLesson = courseData.modules[activeModule].lessons[activeLesson];

    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 70px)', overflow: 'hidden' }}>
            {/* Sidebar - Course Content */}
            <div style={{
                width: '350px',
                borderRight: '1px solid var(--border-color)',
                background: 'var(--surface-color)',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <button
                        onClick={() => navigate('/courses')}
                        className="btn"
                        style={{ marginBottom: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                    >
                        <ArrowLeft size={14} /> Back to Courses
                    </button>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{courseData.title}</h2>
                    <div style={{ width: '100%', height: '4px', background: 'var(--surface-hover)', borderRadius: '2px' }}>
                        <div style={{ width: `${courseData.progress}%`, height: '100%', background: 'var(--primary-color)', borderRadius: '2px' }}></div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        {courseData.progress}% Completed
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    {courseData.modules.map((module, mIndex) => (
                        <div key={mIndex} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <div
                                onClick={() => toggleModule(mIndex)}
                                style={{
                                    padding: '1rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'var(--surface-hover)'
                                }}
                            >
                                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{module.title}</span>
                                {expandedModules[mIndex] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </div>

                            {expandedModules[mIndex] && (
                                <div>
                                    {module.lessons.map((lesson, lIndex) => (
                                        <div
                                            key={lIndex}
                                            onClick={() => { setActiveModule(mIndex); setActiveLesson(lIndex); }}
                                            style={{
                                                padding: '0.75rem 1rem 0.75rem 2rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                background: (activeModule === mIndex && activeLesson === lIndex) ? 'rgba(11, 61, 145, 0.05)' : 'transparent',
                                                borderLeft: (activeModule === mIndex && activeLesson === lIndex) ? '3px solid var(--primary-color)' : '3px solid transparent'
                                            }}
                                        >
                                            {lesson.completed ?
                                                <CheckCircle size={16} color="#4CAF50" /> :
                                                <PlayCircle size={16} color={activeModule === mIndex && activeLesson === lIndex ? 'var(--primary-color)' : 'var(--text-secondary)'} />
                                            }
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.9rem', color: (activeModule === mIndex && activeLesson === lIndex) ? 'var(--primary-color)' : 'var(--text-primary)' }}>
                                                    {lesson.title}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                    {lesson.duration}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content - Video Player */}
            <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-color)' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                    <div style={{
                        aspectRatio: '16/9',
                        background: '#000',
                        borderRadius: '12px',
                        marginBottom: '2rem',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                        <video
                            controls
                            width="100%"
                            height="100%"
                            src={videoSource}
                            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{currentLesson.title}</h1>
                            <p style={{ color: 'var(--text-secondary)' }}>{courseData.modules[activeModule].title}</p>
                        </div>
                        <button className="btn btn-primary">
                            Mark as Complete
                        </button>
                    </div>

                    <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Lesson Notes</h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            In this lesson, we will cover the fundamental concepts of {currentLesson.title}.
                            Make sure to have your development environment ready. We will be using VS Code and Chrome Developer Tools.
                            <br /><br />
                            <strong>Key Takeaways:</strong>
                            <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                                <li>Understanding the core architecture</li>
                                <li>Best practices for implementation</li>
                                <li>Common pitfalls to avoid</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
