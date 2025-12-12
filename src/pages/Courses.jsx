import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Clock, Users, TrendingUp, Award, BookOpen, Play } from 'lucide-react';

const Courses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', label: 'All Courses', count: 35 },
    { id: 'ai-ml', label: 'AI & Machine Learning', count: 6 },
    { id: 'web-dev', label: 'Web Development', count: 7 },
    { id: 'data-science', label: 'Data Science', count: 5 },
    { id: 'cloud-devops', label: 'Cloud & DevOps', count: 4 },
    { id: 'mobile-dev', label: 'Mobile Development', count: 3 },
    { id: 'cybersecurity', label: 'Cybersecurity', count: 3 },
    { id: 'blockchain', label: 'Blockchain', count: 2 },
    { id: 'iot', label: 'IoT & Embedded', count: 3 },
    { id: 'design', label: 'UI/UX Design', count: 2 },
  ];

  const courses = [
    // AI & ML
    { id: 1, title: 'Machine Learning Fundamentals', category: 'ai-ml', level: 'Beginner', duration: '8 weeks', rating: 4.9, students: 12453, instructor: 'Dr. Sarah Chen', progress: 85, enrolled: true, price: 'Free', image: '🤖', modules: 24, trending: true },
    { id: 2, title: 'Deep Learning & Neural Networks', category: 'ai-ml', level: 'Advanced', duration: '10 weeks', rating: 4.8, students: 8234, instructor: 'Prof. James Wilson', progress: 0, enrolled: false, price: 'Free', image: '🧠', modules: 30, trending: true },
    { id: 3, title: 'Natural Language Processing', category: 'ai-ml', level: 'Intermediate', duration: '6 weeks', rating: 4.7, students: 6543, instructor: 'Dr. Emily Wang', progress: 0, enrolled: false, price: 'Free', image: '💬', modules: 18 },
    { id: 4, title: 'Computer Vision with OpenCV', category: 'ai-ml', level: 'Intermediate', duration: '7 weeks', rating: 4.8, students: 5432, instructor: 'Dr. Michael Brown', progress: 0, enrolled: false, price: 'Free', image: '👁️', modules: 20 },
    { id: 5, title: 'Reinforcement Learning', category: 'ai-ml', level: 'Advanced', duration: '9 weeks', rating: 4.6, students: 3210, instructor: 'Prof. Lisa Anderson', progress: 0, enrolled: false, price: 'Free', image: '🎮', modules: 22 },
    { id: 6, title: 'AI Ethics & Responsible AI', category: 'ai-ml', level: 'Beginner', duration: '4 weeks', rating: 4.9, students: 7654, instructor: 'Dr. Robert Taylor', progress: 0, enrolled: false, price: 'Free', image: '⚖️', modules: 12, new: true },

    // Web Development
    { id: 7, title: 'Full Stack Web Development', category: 'web-dev', level: 'Intermediate', duration: '12 weeks', rating: 4.9, students: 18234, instructor: 'John Martinez', progress: 72, enrolled: true, price: 'Free', image: '🌐', modules: 36, trending: true },
    { id: 8, title: 'React & Modern JavaScript', category: 'web-dev', level: 'Intermediate', duration: '8 weeks', rating: 4.8, students: 15678, instructor: 'Sarah Johnson', progress: 0, enrolled: false, price: 'Free', image: '⚛️', modules: 28 },
    { id: 9, title: 'Backend Development with Node.js', category: 'web-dev', level: 'Intermediate', duration: '10 weeks', rating: 4.7, students: 12345, instructor: 'David Lee', progress: 0, enrolled: false, price: 'Free', image: '🟢', modules: 32 },
    { id: 10, title: 'Vue.js Complete Guide', category: 'web-dev', level: 'Beginner', duration: '6 weeks', rating: 4.6, students: 8765, instructor: 'Emma Davis', progress: 0, enrolled: false, price: 'Free', image: '💚', modules: 20 },
    { id: 11, title: 'Angular Framework Mastery', category: 'web-dev', level: 'Intermediate', duration: '9 weeks', rating: 4.5, students: 6543, instructor: 'Chris Wilson', progress: 0, enrolled: false, price: 'Free', image: '🔴', modules: 26 },
    { id: 12, title: 'GraphQL & Apollo', category: 'web-dev', level: 'Advanced', duration: '5 weeks', rating: 4.7, students: 4321, instructor: 'Alex Turner', progress: 0, enrolled: false, price: 'Free', image: '🔷', modules: 16 },
    { id: 13, title: 'Progressive Web Apps (PWA)', category: 'web-dev', level: 'Intermediate', duration: '6 weeks', rating: 4.8, students: 5678, instructor: 'Maria Garcia', progress: 0, enrolled: false, price: 'Free', image: '📱', modules: 18, new: true },

    // Data Science
    { id: 14, title: 'Data Science with Python', category: 'data-science', level: 'Beginner', duration: '10 weeks', rating: 4.8, students: 15678, instructor: 'Prof. Emily Wang', progress: 58, enrolled: true, price: 'Free', image: '📊', modules: 30 },
    { id: 15, title: 'Data Visualization & Analytics', category: 'data-science', level: 'Intermediate', duration: '7 weeks', rating: 4.7, students: 9876, instructor: 'Dr. Thomas Brown', progress: 0, enrolled: false, price: 'Free', image: '📈', modules: 22 },
    { id: 16, title: 'Big Data & Hadoop', category: 'data-science', level: 'Advanced', duration: '8 weeks', rating: 4.6, students: 6543, instructor: 'Prof. Jennifer Lee', progress: 0, enrolled: false, price: 'Free', image: '🐘', modules: 24 },
    { id: 17, title: 'Statistical Analysis with R', category: 'data-science', level: 'Intermediate', duration: '6 weeks', rating: 4.7, students: 7654, instructor: 'Dr. Mark Johnson', progress: 0, enrolled: false, price: 'Free', image: '📉', modules: 20 },
    { id: 18, title: 'SQL & Database Management', category: 'data-science', level: 'Beginner', duration: '5 weeks', rating: 4.9, students: 12345, instructor: 'Sarah Martinez', progress: 0, enrolled: false, price: 'Free', image: '🗄️', modules: 16, trending: true },

    // Cloud & DevOps
    { id: 19, title: 'Cloud Computing with AWS', category: 'cloud-devops', level: 'Intermediate', duration: '9 weeks', rating: 4.8, students: 9876, instructor: 'Michael Brown', progress: 45, enrolled: true, price: 'Free', image: '☁️', modules: 28 },
    { id: 20, title: 'Docker & Kubernetes', category: 'cloud-devops', level: 'Advanced', duration: '8 weeks', rating: 4.7, students: 7654, instructor: 'Chris Anderson', progress: 0, enrolled: false, price: 'Free', image: '🐳', modules: 24 },
    { id: 21, title: 'Azure Cloud Services', category: 'cloud-devops', level: 'Intermediate', duration: '7 weeks', rating: 4.6, students: 5432, instructor: 'Lisa Taylor', progress: 0, enrolled: false, price: 'Free', image: '🔷', modules: 22 },
    { id: 22, title: 'CI/CD Pipeline Automation', category: 'cloud-devops', level: 'Intermediate', duration: '6 weeks', rating: 4.8, students: 6543, instructor: 'Robert Wilson', progress: 0, enrolled: false, price: 'Free', image: '🔄', modules: 18, new: true },

    // Mobile Development
    { id: 23, title: 'React Native Mobile Apps', category: 'mobile-dev', level: 'Intermediate', duration: '10 weeks', rating: 4.7, students: 8765, instructor: 'Emma Johnson', progress: 0, enrolled: false, price: 'Free', image: '📱', modules: 30 },
    { id: 24, title: 'Flutter & Dart', category: 'mobile-dev', level: 'Beginner', duration: '8 weeks', rating: 4.8, students: 9876, instructor: 'David Lee', progress: 0, enrolled: false, price: 'Free', image: '🦋', modules: 26, trending: true },
    { id: 25, title: 'iOS Development with Swift', category: 'mobile-dev', level: 'Intermediate', duration: '12 weeks', rating: 4.6, students: 6543, instructor: 'Sarah Davis', progress: 0, enrolled: false, price: 'Free', image: '🍎', modules: 34 },

    // Cybersecurity
    { id: 26, title: 'Cybersecurity Essentials', category: 'cybersecurity', level: 'Beginner', duration: '8 weeks', rating: 4.9, students: 11234, instructor: 'Dr. Alex Turner', progress: 0, enrolled: false, price: 'Free', image: '🔒', modules: 24, trending: true },
    { id: 27, title: 'Ethical Hacking & Penetration Testing', category: 'cybersecurity', level: 'Advanced', duration: '10 weeks', rating: 4.8, students: 7654, instructor: 'Prof. Maria Garcia', progress: 0, enrolled: false, price: 'Free', image: '🎯', modules: 28 },
    { id: 28, title: 'Network Security Fundamentals', category: 'cybersecurity', level: 'Intermediate', duration: '7 weeks', rating: 4.7, students: 5432, instructor: 'Chris Wilson', progress: 0, enrolled: false, price: 'Free', image: '🛡️', modules: 20 },

    // Blockchain
    { id: 29, title: 'Blockchain Technology', category: 'blockchain', level: 'Intermediate', duration: '8 weeks', rating: 4.7, students: 6543, instructor: 'Dr. Thomas Brown', progress: 0, enrolled: false, price: 'Free', image: '⛓️', modules: 22 },
    { id: 30, title: 'Smart Contract Development', category: 'blockchain', level: 'Advanced', duration: '9 weeks', rating: 4.6, students: 4321, instructor: 'Jennifer Lee', progress: 0, enrolled: false, price: 'Free', image: '📜', modules: 26, new: true },

    // IoT & Embedded
    { id: 31, title: 'Internet of Things (IoT)', category: 'iot', level: 'Intermediate', duration: '7 weeks', rating: 4.7, students: 5678, instructor: 'Mark Johnson', progress: 0, enrolled: false, price: 'Free', image: '🌐', modules: 20 },
    { id: 32, title: 'Arduino & Raspberry Pi', category: 'iot', level: 'Beginner', duration: '6 weeks', rating: 4.8, students: 7654, instructor: 'Sarah Martinez', progress: 0, enrolled: false, price: 'Free', image: '🔌', modules: 18 },
    { id: 33, title: 'Embedded Systems Programming', category: 'iot', level: 'Advanced', duration: '10 weeks', rating: 4.6, students: 3210, instructor: 'Robert Taylor', progress: 0, enrolled: false, price: 'Free', image: '⚙️', modules: 28 },

    // UI/UX Design
    { id: 34, title: 'UI/UX Design Fundamentals', category: 'design', level: 'Beginner', duration: '6 weeks', rating: 4.9, students: 10234, instructor: 'Emma Davis', progress: 0, enrolled: false, price: 'Free', image: '🎨', modules: 18, trending: true },
    { id: 35, title: 'Figma for Designers', category: 'design', level: 'Beginner', duration: '4 weeks', rating: 4.8, students: 8765, instructor: 'Alex Turner', progress: 0, enrolled: false, price: 'Free', image: '🖌️', modules: 12, new: true },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.students - a.students;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.id - a.id;
      default: return 0;
    }
  });

  const enrolledCourses = courses.filter(c => c.enrolled);
  const trendingCourses = courses.filter(c => c.trending);
  const newCourses = courses.filter(c => c.new);

  return (
    <div>
      {/* Header with Stats */}
      <div style={{
        background: 'linear-gradient(135deg, #0B3D91 0%, #1E5A9A 100%)',
        borderRadius: '16px',
        padding: '2.5rem',
        marginBottom: '2rem',
        color: 'white'
      }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Skill Development Portal</h1>
        <p style={{ opacity: 0.9, marginBottom: '2rem', fontSize: '1.1rem' }}>
          35+ industry-relevant courses designed to make you internship-ready
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>35+</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Courses</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{enrolledCourses.length}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Enrolled</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length) || 0}%
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Avg Progress</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Free</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>All Courses</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                background: 'var(--surface-color)',
                fontSize: '1rem'
              }}
            />
          </div>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            style={{
              padding: '0.875rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              background: 'var(--surface-color)',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.875rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              background: 'var(--surface-color)',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.75rem 1.25rem',
                background: selectedCategory === cat.id ? 'var(--primary-color)' : 'var(--surface-color)',
                color: selectedCategory === cat.id ? 'white' : 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.9rem',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {cat.label}
              <span style={{
                padding: '0.125rem 0.5rem',
                background: selectedCategory === cat.id ? 'rgba(255,255,255,0.2)' : 'var(--surface-hover)',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
        Showing {sortedCourses.length} course{sortedCourses.length !== 1 ? 's' : ''}
        {searchQuery && ` for "${searchQuery}"`}
      </div>

      {/* Courses Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {sortedCourses.map(course => (
          <div
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`)}
            style={{
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
              e.currentTarget.style.borderColor = 'var(--primary-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            {/* Course Image/Icon */}
            <div style={{
              height: '160px',
              background: 'linear-gradient(135deg, #0B3D91 0%, #1E5A9A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              position: 'relative'
            }}>
              {course.image}
              {course.trending && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#FF6B35',
                  color: 'white',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <TrendingUp size={12} /> Trending
                </div>
              )}
              {course.new && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#4CAF50',
                  color: 'white',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}>
                  NEW
                </div>
              )}
              {course.enrolled && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(255,255,255,0.95)',
                  color: 'var(--primary-color)',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}>
                  Enrolled
                </div>
              )}
            </div>

            {/* Course Content */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{
                  padding: '0.375rem 0.75rem',
                  background: 'var(--surface-hover)',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'var(--text-secondary)'
                }}>
                  {course.level}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', fontWeight: '600' }}>
                  <Star size={14} color="#FFC107" fill="#FFC107" />
                  {course.rating}
                </div>
              </div>

              <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', lineHeight: '1.4' }}>
                {course.title}
              </h3>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                👨‍🏫 {course.instructor}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={14} />
                  {course.duration}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={14} />
                  {course.modules} modules
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={14} />
                  {course.students.toLocaleString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4CAF50', fontWeight: '600' }}>
                  <Award size={14} />
                  {course.price}
                </div>
              </div>

              {course.enrolled && course.progress > 0 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                    <span style={{ fontWeight: '700', color: 'var(--primary-color)' }}>{course.progress}%</span>
                  </div>
                  <div style={{
                    height: '6px',
                    background: 'var(--surface-hover)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${course.progress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--primary-color), var(--accent-color))',
                      borderRadius: '3px'
                    }}></div>
                  </div>
                </div>
              )}

              {!course.enrolled && (
                <button
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Enrolling in: ${course.title}`);
                  }}
                >
                  <Play size={16} /> Enroll Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedCourses.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: 'var(--text-secondary)'
        }}>
          <BookOpen size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <h3>No courses found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Courses;
