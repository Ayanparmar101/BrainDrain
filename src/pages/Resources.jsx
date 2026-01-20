import React, { useState } from 'react';
import { FileText, Download, Video, Link as LinkIcon, BookOpen, Apple, Heart, Search, Filter, Star } from 'lucide-react';

const Resources = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', label: 'All Resources', icon: <FileText size={16} /> },
        { id: 'documents', label: 'Guides & PDFs', icon: <FileText size={16} /> },
        { id: 'videos', label: 'Videos', icon: <Video size={16} /> },
        { id: 'recipes', label: 'Recipes', icon: <Apple size={16} /> },
        { id: 'links', label: 'External Links', icon: <LinkIcon size={16} /> },
    ];

    const resources = [
        // Documents - Nutrition Guides
        {
            id: 1,
            title: 'Complete Nutrition Guide',
            description: 'Comprehensive guide covering macronutrients, micronutrients, and meal planning',
            type: 'documents',
            format: 'PDF',
            size: '4.2 MB',
            downloads: 3456,
            category: 'Nutrition Basics',
            downloadUrl: '#',
            rating: 4.9
        },
        {
            id: 2,
            title: 'Sports Nutrition Handbook',
            description: 'Complete reference for pre/post-workout nutrition and athletic performance',
            type: 'documents',
            format: 'PDF',
            size: '3.8 MB',
            downloads: 2876,
            category: 'Sports Nutrition',
            downloadUrl: '#',
            rating: 4.8
        },
        {
            id: 3,
            title: 'Plant-Based Protein Guide',
            description: 'Visual guide to complete plant-based protein sources and combinations',
            type: 'documents',
            format: 'PDF',
            size: '2.5 MB',
            downloads: 4123,
            category: 'Plant-Based',
            downloadUrl: '#',
            rating: 4.9
        },
        {
            id: 4,
            title: 'Food Label Reading Master Guide',
            description: 'Learn to decode nutrition labels, ingredients, and health claims',
            type: 'documents',
            format: 'PDF',
            size: '1.8 MB',
            downloads: 5234,
            category: 'Basics',
            downloadUrl: '#',
            rating: 4.7
        },
        {
            id: 5,
            title: 'Meal Prep Planning Templates',
            description: 'Weekly meal planning templates with shopping lists and prep guides',
            type: 'documents',
            format: 'PDF',
            size: '2.2 MB',
            downloads: 6789,
            category: 'Meal Planning',
            downloadUrl: '#',
            rating: 4.9
        },

        // Videos
        {
            id: 6,
            title: 'Macronutrients Explained',
            description: 'Detailed video series on carbs, protein, and fats',
            type: 'videos',
            format: 'MP4',
            duration: '45 min',
            views: 12456,
            category: 'Nutrition Basics',
            downloadUrl: '#',
            rating: 4.8
        },
        {
            id: 7,
            title: 'Gut Health Masterclass',
            description: 'Understanding the microbiome and digestive wellness',
            type: 'videos',
            format: 'MP4',
            duration: '60 min',
            views: 8765,
            category: 'Wellness',
            downloadUrl: '#',
            rating: 4.9
        },
        {
            id: 8,
            title: 'Healthy Cooking Techniques',
            description: 'Learn nutrient-preserving cooking methods and meal prep',
            type: 'videos',
            format: 'MP4',
            duration: '38 min',
            views: 9876,
            category: 'Cooking',
            downloadUrl: '#',
            rating: 4.7
        },

        // Recipes
        {
            id: 9,
            title: 'High-Protein Breakfasts',
            description: '15 delicious breakfast recipes with 25g+ protein',
            type: 'recipes',
            format: 'PDF',
            servings: '1-2',
            difficulty: 'Easy',
            category: 'Meals',
            downloadUrl: '#',
            rating: 4.9
        },
        {
            id: 10,
            title: 'Plant-Based Meal Ideas',
            description: '20 complete plant-based meals with nutritional info',
            type: 'recipes',
            format: 'PDF',
            servings: '2-4',
            difficulty: 'Medium',
            category: 'Plant-Based',
            downloadUrl: '#',
            rating: 4.8
        },
        {
            id: 11,
            title: 'Healthy Snacks Under 200 Calories',
            description: '30 satisfying snack ideas for weight management',
            type: 'recipes',
            format: 'PDF',
            servings: '1',
            difficulty: 'Easy',
            category: 'Snacks',
            downloadUrl: '#',
            rating: 4.8
        },

        // External Links
        {
            id: 12,
            title: 'USDA FoodData Central',
            description: 'Official database of food composition and nutrition information',
            type: 'links',
            url: 'https://fdc.nal.usda.gov/',
            category: 'Databases',
            rating: 4.9
        },
        {
            id: 13,
            title: 'WHO Nutrition Guidelines',
            description: 'World Health Organization official nutrition recommendations',
            type: 'links',
            url: 'https://www.who.int/health-topics/nutrition',
            category: 'Guidelines',
            rating: 4.9
        },
        {
            id: 14,
            title: 'Academy of Nutrition and Dietetics',
            description: 'Professional resources and evidence-based nutrition information',
            type: 'links',
            url: 'https://www.eatright.org/',
            category: 'Professional',
            rating: 4.8
        }
    ];

    const filteredResources = resources.filter(resource => {
        const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory;
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            resource.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div style={{ padding: '2rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <BookOpen size={32} style={{ color: 'var(--primary-color)' }} />
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>Learning Resources</h1>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    Essential nutrition guides, videos, recipes, and reference materials
                </p>
            </div>

            {/* Search and Filter Bar */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                {/* Search */}
                <div style={{ flex: '1', minWidth: '300px', position: 'relative' }}>
                    <Search size={20} style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-secondary)'
                    }} />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 3rem',
                            border: '2px solid var(--border-color)',
                            borderRadius: '8px',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                {/* Category Filter */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '0.75rem 1.25rem',
                                background: selectedCategory === cat.id ? 'var(--primary-color)' : 'white',
                                color: selectedCategory === cat.id ? 'white' : 'var(--text-color)',
                                border: '2px solid',
                                borderColor: selectedCategory === cat.id ? 'var(--primary-color)' : 'var(--border-color)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: '500',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <div style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    borderRadius: '12px',
                    color: 'white'
                }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {resources.filter(r => r.type === 'documents').length}
                    </div>
                    <div style={{ opacity: 0.9 }}>Guides & PDFs</div>
                </div>
                <div style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                    borderRadius: '12px',
                    color: 'white'
                }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {resources.filter(r => r.type === 'videos').length}
                    </div>
                    <div style={{ opacity: 0.9 }}>Video Tutorials</div>
                </div>
                <div style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                    borderRadius: '12px',
                    color: 'white'
                }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {resources.filter(r => r.type === 'recipes').length}
                    </div>
                    <div style={{ opacity: 0.9 }}>Recipe Collections</div>
                </div>
                <div style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    borderRadius: '12px',
                    color: 'white'
                }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {resources.filter(r => r.type === 'links').length}
                    </div>
                    <div style={{ opacity: 0.9 }}>External Resources</div>
                </div>
            </div>

            {/* Resources Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '1.5rem'
            }}>
                {filteredResources.map(resource => (
                    <div
                        key={resource.id}
                        style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            border: '2px solid var(--border-color)',
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
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '10px',
                                background: resource.type === 'documents' ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' :
                                          resource.type === 'videos' ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' :
                                          resource.type === 'recipes' ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' :
                                          'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                {resource.type === 'documents' && <FileText size={24} />}
                                {resource.type === 'videos' && <Video size={24} />}
                                {resource.type === 'recipes' && <Apple size={24} />}
                                {resource.type === 'links' && <LinkIcon size={24} />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                    {resource.title}
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < Math.floor(resource.rating) ? '#fbbf24' : 'none'}
                                            stroke="#fbbf24"
                                        />
                                    ))}
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {resource.rating}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                            {resource.description}
                        </p>
                        
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)'
                        }}>
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                background: 'var(--background-secondary)',
                                borderRadius: '6px'
                            }}>
                                {resource.category}
                            </span>
                            {resource.format && (
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    background: 'var(--background-secondary)',
                                    borderRadius: '6px'
                                }}>
                                    {resource.format}
                                </span>
                            )}
                            {resource.size && (
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    background: 'var(--background-secondary)',
                                    borderRadius: '6px'
                                }}>
                                    {resource.size}
                                </span>
                            )}
                            {resource.duration && (
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    background: 'var(--background-secondary)',
                                    borderRadius: '6px'
                                }}>
                                    {resource.duration}
                                </span>
                            )}
                            {resource.servings && (
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    background: 'var(--background-secondary)',
                                    borderRadius: '6px'
                                }}>
                                    Serves {resource.servings}
                                </span>
                            )}
                        </div>

                        <button style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}>
                            <Download size={16} />
                            {resource.type === 'links' ? 'Visit Resource' : 'Download'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
