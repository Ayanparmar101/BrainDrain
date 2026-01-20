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

    // Mock Data for Clinical Nutrition Course
    const courseData = {
        title: "Clinical Nutrition Fundamentals",
        progress: 15,
        modules: [
            {
                title: "Module 1: Introduction to Clinical Nutrition",
                lessons: [
                    { title: "Role of Clinical Dietitians", duration: "10:00", completed: true },
                    { title: "Evidence-Based Nutrition Practice", duration: "15:00", completed: true },
                    { title: "Medical Terminology Essentials", duration: "25:00", completed: false }
                ]
            },
            {
                title: "Module 2: Nutritional Assessment",
                lessons: [
                    { title: "Anthropometric Measurements", duration: "20:00", completed: false },
                    { title: "Biochemical Lab Interpretations", duration: "30:00", completed: false },
                    { title: "Clinical & Physical Assessment", duration: "15:00", completed: false }
                ]
            },
            {
                title: "Module 3: Medical Nutrition Therapy Basics",
                lessons: [
                    { title: "Nutrition Care Process (NCP)", duration: "45:00", completed: false },
                    { title: "Diet Prescription & Modifications", duration: "40:00", completed: false },
                    { title: "Therapeutic Diet Planning", duration: "35:00", completed: false }
                ]
            },
            {
                title: "Module 4: Cardiovascular Disease Nutrition",
                lessons: [
                    { title: "Hypertension Management", duration: "20:00", completed: false },
                    { title: "Heart Failure & Nutrition", duration: "30:00", completed: false },
                    { title: "Lipid Disorders & DASH Diet", duration: "45:00", completed: false }
                ]
            },
            {
                title: "Module 5: Diabetes Management",
                lessons: [
                    { title: "Type 1 & Type 2 Diabetes Nutrition", duration: "25:00", completed: false },
                    { title: "Carbohydrate Counting Methods", duration: "35:00", completed: false },
                    { title: "Insulin Therapy & Nutrition", duration: "30:00", completed: false }
                ]
            },
            {
                title: "Module 6: Gastrointestinal Disorders",
                lessons: [
                    { title: "IBD & IBS Nutrition Management", duration: "40:00", completed: false },
                    { title: "Celiac Disease & Gluten-Free Diets", duration: "45:00", completed: false },
                    { title: "GERD & Reflux Management", duration: "50:00", completed: false }
                ]
            },
            {
                title: "Module 7: Renal Nutrition",
                lessons: [
                    { title: "Chronic Kidney Disease Stages", duration: "30:00", completed: false },
                    { title: "Dialysis Nutrition Management", duration: "55:00", completed: false },
                    { title: "Fluid & Electrolyte Balance", duration: "40:00", completed: false }
                ]
            },
            {
                title: "Module 8: Critical Care Nutrition",
                lessons: [
                    { title: "Enteral & Parenteral Nutrition", duration: "25:00", completed: false },
                    { title: "ICU Patient Nutrition Support", duration: "60:00", completed: false },
                    { title: "Wound Healing & Nutrition", duration: "35:00", completed: false }
                ]
            },
            {
                title: "Module 9: Oncology Nutrition",
                lessons: [
                    { title: "Cancer & Nutritional Impact", duration: "40:00", completed: false },
                    { title: "Managing Treatment Side Effects", duration: "45:00", completed: false },
                    { title: "Palliative & Supportive Care", duration: "30:00", completed: false }
                ]
            },
            {
                title: "Module 10: Case Studies & Simulations",
                lessons: [
                    { title: "Complex Case Analysis", duration: "45:00", completed: false },
                    { title: "Interactive Patient Simulations", duration: "20:00", completed: false },
                    { title: "Clinical Documentation Practice", duration: "50:00", completed: false }
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
                            In this lesson, we will explore the essential concepts of {currentLesson.title}.
                            Prepare your clinical reference materials and review relevant patient case guidelines. We will use interactive simulations and real-world scenarios.
                            <br /><br />
                            <strong>Key Learning Objectives:</strong>
                            <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                                <li>Understanding clinical assessment techniques</li>
                                <li>Evidence-based nutrition intervention strategies</li>
                                <li>Common clinical challenges and solutions</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
