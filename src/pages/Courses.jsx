import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Clock, Users, TrendingUp, Award, BookOpen, Play, Apple, Heart, Leaf } from 'lucide-react';

const Courses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', label: 'All Courses', count: 28 },
    { id: 'basics', label: 'Nutrition Basics', count: 5 },
    { id: 'sports', label: 'Sports Nutrition', count: 4 },
    { id: 'clinical', label: 'Clinical Nutrition', count: 4 },
    { id: 'plant-based', label: 'Plant-Based', count: 3 },
    { id: 'wellness', label: 'Wellness & Lifestyle', count: 4 },
    { id: 'specialized', label: 'Specialized Diets', count: 4 },
    { id: 'pediatric', label: 'Pediatric Nutrition', count: 2 },
    { id: 'geriatric', label: 'Geriatric Nutrition', count: 2 },
  ];

  const courses = [
    // Nutrition Basics
    { id: 1, title: 'Nutrition Fundamentals', category: 'basics', level: 'Beginner', duration: '6 weeks', rating: 4.9, students: 15234, instructor: 'Dr. Sarah Mitchell', progress: 0, enrolled: false, price: 'Free', image: '🍎', modules: 18, trending: true },
    { id: 2, title: 'Macro & Micronutrients Deep Dive', category: 'basics', level: 'Intermediate', duration: '8 weeks', rating: 4.8, students: 12456, instructor: 'Prof. James Anderson', progress: 0, enrolled: false, price: 'Free', image: '🥗', modules: 24, trending: true },
    { id: 3, title: 'Food Science & Chemistry', category: 'basics', level: 'Intermediate', duration: '7 weeks', rating: 4.7, students: 8765, instructor: 'Dr. Emily Chen', progress: 0, enrolled: false, price: 'Free', image: '🔬', modules: 20 },
    { id: 4, title: 'Nutritional Biochemistry', category: 'basics', level: 'Advanced', duration: '10 weeks', rating: 4.8, students: 6543, instructor: 'Prof. Michael Lee', progress: 0, enrolled: false, price: 'Free', image: '🧬', modules: 28 },
    { id: 5, title: 'Reading Food Labels & Ingredients', category: 'basics', level: 'Beginner', duration: '3 weeks', rating: 4.9, students: 10234, instructor: 'Sarah Williams', progress: 0, enrolled: false, price: 'Free', image: '🏷️', modules: 12, new: true },

    // Sports Nutrition
    { id: 6, title: 'Sports Nutrition Masterclass', category: 'sports', level: 'Intermediate', duration: '9 weeks', rating: 4.9, students: 8234, instructor: 'Dr. Amanda Stevens', progress: 78, enrolled: true, price: 'Free', image: '🏃', modules: 26, trending: true },
    { id: 7, title: 'Pre & Post-Workout Nutrition', category: 'sports', level: 'Beginner', duration: '5 weeks', rating: 4.7, students: 9876, instructor: 'Coach Mark Johnson', progress: 0, enrolled: false, price: 'Free', image: '💪', modules: 16 },
    { id: 8, title: 'Supplements for Athletes', category: 'sports', level: 'Advanced', duration: '6 weeks', rating: 4.6, students: 5432, instructor: 'Dr. Lisa Martinez', progress: 0, enrolled: false, price: 'Free', image: '💊', modules: 18 },
    { id: 9, title: 'Hydration & Electrolytes', category: 'sports', level: 'Beginner', duration: '4 weeks', rating: 4.8, students: 7654, instructor: 'Dr. Robert Taylor', progress: 0, enrolled: false, price: 'Free', image: '💧', modules: 14, new: true },

    // Clinical Nutrition
    { id: 10, title: 'Clinical Nutrition Essentials', category: 'clinical', level: 'Advanced', duration: '12 weeks', rating: 4.9, students: 6789, instructor: 'Dr. Jennifer Wilson', progress: 0, enrolled: false, price: 'Free', image: '🏥', modules: 32, trending: true },
    { id: 11, title: 'Medical Nutrition Therapy', category: 'clinical', level: 'Advanced', duration: '10 weeks', rating: 4.8, students: 5432, instructor: 'Dr. David Brown', progress: 0, enrolled: false, price: 'Free', image: '⚕️', modules: 28 },
    { id: 12, title: 'Nutrition for Chronic Diseases', category: 'clinical', level: 'Intermediate', duration: '8 weeks', rating: 4.7, students: 6543, instructor: 'Prof. Emma Davis', progress: 0, enrolled: false, price: 'Free', image: '🩺', modules: 24 },
    { id: 13, title: 'Diabetes & Blood Sugar Management', category: 'clinical', level: 'Intermediate', duration: '7 weeks', rating: 4.9, students: 8765, instructor: 'Dr. Rachel Green', progress: 0, enrolled: false, price: 'Free', image: '📊', modules: 22 },

    // Plant-Based
    { id: 14, title: 'Plant-Based Nutrition Fundamentals', category: 'plant-based', level: 'Beginner', duration: '6 weeks', rating: 4.8, students: 12456, instructor: 'Sarah Williams', progress: 65, enrolled: true, price: 'Free', image: '🌱', modules: 20, trending: true },
    { id: 15, title: 'Vegan Protein Sources', category: 'plant-based', level: 'Beginner', duration: '4 weeks', rating: 4.7, students: 9876, instructor: 'Chef Maria Garcia', progress: 0, enrolled: false, price: 'Free', image: '🥜', modules: 14 },
    { id: 16, title: 'Whole Food Plant-Based Diet', category: 'plant-based', level: 'Intermediate', duration: '7 weeks', rating: 4.9, students: 7654, instructor: 'Dr. Tom Anderson', progress: 0, enrolled: false, price: 'Free', image: '🥦', modules: 22, new: true },

    // Wellness & Lifestyle
    { id: 17, title: 'Gut Health & Microbiome', category: 'wellness', level: 'Intermediate', duration: '8 weeks', rating: 4.9, students: 9876, instructor: 'Prof. Michael Chen', progress: 52, enrolled: true, price: 'Free', image: '🦠', modules: 24 },
    { id: 18, title: 'Weight Management Science', category: 'wellness', level: 'Intermediate', duration: '9 weeks', rating: 4.8, students: 15234, instructor: 'Dr. Lisa Johnson', progress: 41, enrolled: true, price: 'Free', image: '⚖️', modules: 26, trending: true },
    { id: 19, title: 'Holistic Nutrition', category: 'wellness', level: 'Beginner', duration: '6 weeks', rating: 4.7, students: 8765, instructor: 'Dr. Maya Patel', progress: 0, enrolled: false, price: 'Free', image: '🌿', modules: 18 },
    { id: 20, title: 'Stress & Nutrition Connection', category: 'wellness', level: 'Beginner', duration: '5 weeks', rating: 4.8, students: 7654, instructor: 'Dr. Alex Turner', progress: 0, enrolled: false, price: 'Free', image: '🧘', modules: 16 },

    // Specialized Diets
    { id: 21, title: 'Ketogenic Diet Science', category: 'specialized', level: 'Intermediate', duration: '6 weeks', rating: 4.7, students: 10234, instructor: 'Dr. Kevin White', progress: 0, enrolled: false, price: 'Free', image: '🥑', modules: 18 },
    { id: 22, title: 'Mediterranean Diet', category: 'specialized', level: 'Beginner', duration: '5 weeks', rating: 4.9, students: 11234, instructor: 'Chef Isabella Rossi', progress: 0, enrolled: false, price: 'Free', image: '🫒', modules: 16, trending: true },
    { id: 23, title: 'Gluten-Free Nutrition', category: 'specialized', level: 'Intermediate', duration: '6 weeks', rating: 4.6, students: 6543, instructor: 'Dr. Anna Schmidt', progress: 0, enrolled: false, price: 'Free', image: '🌾', modules: 18 },
    { id: 24, title: 'Anti-Inflammatory Diet', category: 'specialized', level: 'Intermediate', duration: '7 weeks', rating: 4.8, students: 8765, instructor: 'Dr. Susan Miller', progress: 0, enrolled: false, price: 'Free', image: '🔥', modules: 20, new: true },

    // Pediatric Nutrition
    { id: 25, title: 'Pediatric Nutrition', category: 'pediatric', level: 'Advanced', duration: '10 weeks', rating: 4.9, students: 5432, instructor: 'Dr. Patricia Moore', progress: 0, enrolled: false, price: 'Free', image: '👶', modules: 28 },
    { id: 26, title: 'Infant & Toddler Feeding', category: 'pediatric', level: 'Intermediate', duration: '7 weeks', rating: 4.8, students: 7654, instructor: 'Dr. Rebecca Clark', progress: 0, enrolled: false, price: 'Free', image: '🍼', modules: 22 },

    // Geriatric Nutrition
    { id: 27, title: 'Geriatric Nutrition', category: 'geriatric', level: 'Advanced', duration: '8 weeks', rating: 4.7, students: 4321, instructor: 'Dr. George Thompson', progress: 0, enrolled: false, price: 'Free', image: '👴', modules: 24 },
    { id: 28, title: 'Nutrition for Healthy Aging', category: 'geriatric', level: 'Intermediate', duration: '6 weeks', rating: 4.8, students: 6543, instructor: 'Dr. Helen Wright', progress: 0, enrolled: false, price: 'Free', image: '🧓', modules: 18, new: true },
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
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Apple size={32} color="#16a34a" />
              Nutrition Learning Hub
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Master nutrition science with expert-led courses covering all aspects of health and wellness
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{courses.length}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Courses</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{enrolledCourses.length}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Enrolled</div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      {enrolledCourses.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Play size={24} />
            Continue Learning
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {enrolledCourses.map(course => (
              <div key={course.id} style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
                onClick={() => navigate(`/course/${course.id}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{course.image}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{course.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  By {course.instructor}
                </p>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span>Progress</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{course.progress}%</span>
                  </div>
                  <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${course.progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-color), var(--accent-color))', transition: 'width 0.3s' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{
        background: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '0.95rem'
              }}
            />
          </div>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '0.95rem'
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
              padding: '0.75rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '0.95rem'
            }}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: 'none',
                background: selectedCategory === cat.id ? 'var(--primary-color)' : 'white',
                color: selectedCategory === cat.id ? 'white' : 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {sortedCourses.map(course => (
          <div key={course.id} style={{
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s',
            position: 'relative'
          }}
            onClick={() => navigate(`/course/${course.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
            
            {/* Badges */}
            {(course.trending || course.new) && (
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 2 }}>
                {course.trending && (
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    background: '#ef4444',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    marginLeft: '0.5rem'
                  }}>TRENDING</span>
                )}
                {course.new && (
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    background: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: '600'
                  }}>NEW</span>
                )}
              </div>
            )}

            <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem' }}>{course.image}</div>
            </div>

            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  background: course.level === 'Beginner' ? '#dcfce7' : course.level === 'Intermediate' ? '#fef3c7' : '#fee2e2',
                  color: course.level === 'Beginner' ? '#166534' : course.level === 'Intermediate' ? '#92400e' : '#991b1b',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {course.level}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={14} fill="#FFC107" color="#FFC107" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{course.rating}</span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                {course.title}
              </h3>
              
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                By {course.instructor}
              </p>

              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={14} />
                  {course.duration}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <BookOpen size={14} />
                  {course.modules} modules
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Users size={14} />
                  {course.students.toLocaleString()}
                </div>
              </div>

              {course.enrolled && (
                <div style={{
                  padding: '0.75rem',
                  background: '#f0fdf4',
                  borderRadius: '8px',
                  border: '1px solid #bbf7d0',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span>Progress</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{course.progress}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${course.progress}%`, height: '100%', background: 'var(--primary-color)', transition: 'width 0.3s' }}></div>
                  </div>
                </div>
              )}

              <button style={{
                width: '100%',
                padding: '0.75rem',
                background: course.enrolled ? 'var(--primary-color)' : 'white',
                color: course.enrolled ? 'white' : 'var(--primary-color)',
                border: course.enrolled ? 'none' : '2px solid var(--primary-color)',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                {course.enrolled ? 'Continue Learning' : 'Enroll Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
