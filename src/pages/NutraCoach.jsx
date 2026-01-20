import { useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Upload, Scale, Clock, Sparkles, X, Camera, ChefHat, Flame, Activity } from 'lucide-react';

const NutraCoach = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [weight, setWeight] = useState('');
  const [mealTime, setMealTime] = useState('breakfast');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [userType, setUserType] = useState('general');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const genAI = new GoogleGenerativeAI('AIzaSyBg5wEiVKd7HQF6srFmoEMFdf6gaQV30jY');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
      setAnalysis(null);
    }
  };

  const fileToGenerativePart = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        
        // Compress image if it's too large
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Resize if larger than 1024px
          const maxSize = 1024;
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = (height / width) * maxSize;
              width = maxSize;
            } else {
              width = (width / height) * maxSize;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with compression
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7).split(',')[1];
          
          resolve({
            inlineData: {
              data: compressedBase64,
              mimeType: 'image/jpeg',
            },
          });
        };
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const analyzeNutrition = async () => {
    if (!selectedImage || !weight) {
      setError('Please upload an image and enter your weight');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout - please try again')), 45000)
      );

      const analysisPromise = (async () => {
        const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
        const imagePart = await fileToGenerativePart(selectedImage);

        const dietaryPreference = isVegetarian ? 'vegetarian' : 'non-vegetarian';
        
        // Tailored prompts based on user type
        let userTypeContext = '';
        if (userType === 'abha-worker') {
          userTypeContext = 'This is for an ASHA (Accredited Social Health Activist) worker who needs sustained energy and nutrition for community health work. Focus on sustained energy, immune support, and practical meals for field work.';
        } else if (userType === 'pregnant-woman') {
          userTypeContext = 'This is for a pregnant woman. Focus on folic acid, iron, calcium, protein needs for fetal development. Highlight foods that support pregnancy health and avoid harmful foods. Provide trimester-specific advice if possible.';
        } else {
          userTypeContext = 'General nutrition analysis.';
        }
        
        const prompt = `${userTypeContext}

Analyze this ${dietaryPreference} food for ${weight}kg person eating at ${mealTime}.

NUTRITION DETAILS: List foods, calories, protein/carbs/fats, vitamins. ${isVegetarian ? 'Confirm if meal is fully vegetarian and note any non-veg items if present.' : 'Include protein sources from meat/fish/eggs.'} ${userType === 'pregnant-woman' ? 'Highlight pregnancy-essential nutrients (iron, folic acid, calcium, DHA).' : ''}

TIMING ANALYSIS: Is ${mealTime} good timing? Impact on metabolism${userType === 'pregnant-woman' ? ' and pregnancy energy needs' : userType === 'abha-worker' ? ' and sustained energy for active work' : ''}

RECOMMENDATIONS: Portions for ${weight}kg, missing nutrients, ${isVegetarian ? 'vegetarian protein alternatives' : 'balanced protein sources'}${userType === 'pregnant-woman' ? ', pregnancy-safe food suggestions, avoid caffeine/raw foods' : userType === 'abha-worker' ? ', portable meal ideas for field work, energy-boosting foods' : ''}, improvements`;

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        return response.text();
      })();

      const text = await Promise.race([analysisPromise, timeoutPromise]);
      console.log('Analysis received:', text);
      setAnalysis(text);
    } catch (err) {
      console.error('Error analyzing nutrition:', err);
      const errorMessage = err.message.includes('timeout') 
        ? 'Request timed out. Please try again with a smaller image or check your internet connection.'
        : err.message.includes('API key') || err.message.includes('404')
        ? 'API service error. The Gemini API might be temporarily unavailable.'
        : 'Failed to analyze. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysis(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const parseSection = (text, sectionName) => {
    if (!text) return '';
    const regex = new RegExp(`${sectionName}:([\\s\\S]*?)(?=\\n\\n[A-Z]|$)`, 'i');
    const match = text.match(regex);
    const result = match ? match[1].trim() : '';
    console.log(`Parsing ${sectionName}:`, result ? 'Found' : 'Not found');
    return result;
  };

  const cleanMarkdown = (text) => {
    if (!text) return '';
    return text
      .replace(/\*\*/g, '') // Remove bold markers
      .replace(/###/g, '') // Remove heading markers
      .replace(/##/g, '')
      .replace(/#/g, '')
      .replace(/~~/g, '') // Remove strikethrough
      .trim();
  };

  const formatContent = (content) => {
    if (!content) return [];
    
    const sectionHeaders = [
      'NUTRITION DETAILS', 'NUTRITION', 
      'TIMING ANALYSIS', 'TIMING', 
      'RECOMMENDATIONS', 'RECOMMENDATION',
      'MEAL TIMING', 'MEAL TIMING ANALYSIS'
    ];
    
    return content
      .split('\n')
      .map(line => cleanMarkdown(line))
      .filter(line => {
        const trimmed = line.trim();
        const upper = trimmed.toUpperCase();
        
        // Filter out empty lines
        if (!trimmed) return false;
        
        // Filter out lines that are just dashes or bullets
        if (/^[-*\s]+$/.test(trimmed)) return false;
        
        // Filter out lines that are exactly "--" or "---" etc
        if (trimmed.match(/^-+$/)) return false;
        
        // Filter out lines that are just section headers
        if (sectionHeaders.some(header => upper === header || upper === header + ':')) return false;
        
        return true;
      })
      .map(line => {
        // Remove leading bullets/markers
        let cleaned = line.trim();
        if (cleaned.startsWith('-') || cleaned.startsWith('*')) {
          cleaned = cleaned.replace(/^[-*]\s*/, '');
        }
        return cleaned.trim();
      })
      .filter(line => line.length > 0);
  };

  const nutritionData = analysis ? parseSection(analysis, 'NUTRITION DETAILS') : '';
  const timingData = analysis ? parseSection(analysis, 'TIMING ANALYSIS') : '';
  const recommendationsData = analysis ? parseSection(analysis, 'RECOMMENDATIONS') : '';
  
  // If parsing failed, split the analysis into thirds
  const hasData = nutritionData || timingData || recommendationsData;
  let fallbackSections = { nutrition: '', timing: '', recommendations: '' };
  
  if (analysis && !hasData) {
    const lines = analysis.split('\n').filter(line => line.trim());
    const third = Math.ceil(lines.length / 3);
    fallbackSections = {
      nutrition: lines.slice(0, third).join('\n'),
      timing: lines.slice(third, third * 2).join('\n'),
      recommendations: lines.slice(third * 2).join('\n')
    };
  }

  const nutritionLines = formatContent(nutritionData || fallbackSections.nutrition);
  const timingLines = formatContent(timingData || fallbackSections.timing);
  const recommendationLines = formatContent(recommendationsData || fallbackSections.recommendations);

  return (
    <div style={{ minHeight: '100vh', background: '#F5F1ED', padding: '2.5rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Hero Section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            marginBottom: '0.625rem'
          }}>
            <ChefHat style={{ width: '32px', height: '32px', color: '#8B9D7F', strokeWidth: 2 }} />
            <h1 style={{ fontSize: '2.125rem', fontWeight: '600', color: '#3E342B', margin: 0, letterSpacing: '-0.03em' }}>
              NutraCoach AI
            </h1>
          </div>
          <p style={{ color: '#6B5444', fontSize: '1rem', lineHeight: '1.65' }}>
            AI-powered meal analysis with personalized insights
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: analysis ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          
          {!analysis && (
            <>
              {/* Image Upload Card */}
              <div style={{ background: '#FFFFFF', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 4px 0 rgba(62, 52, 43, 0.06)', border: '1px solid #E5DFD6' }}>
                <div style={{ background: '#FFFFFF', padding: '1.5rem', borderBottom: '1px solid #E5DFD6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Camera style={{ width: '22px', height: '22px', color: '#6B5444', strokeWidth: 2 }} />
                    <h2 style={{ fontSize: '1.0625rem', fontWeight: '600', margin: 0, color: '#3E342B', letterSpacing: '-0.01em' }}>Upload Meal Photo</h2>
                  </div>
                </div>
                
                <div style={{ padding: '2rem' }}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    id="image-upload"
                  />
                  
                  {!imagePreview ? (
                    <label
                      htmlFor="image-upload"
                      style={{ 
                        display: 'block',
                        border: '2px dashed #D4CEC5',
                        borderRadius: '14px',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: '#FAF8F5'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#8B9D7F';
                        e.currentTarget.style.background = '#F5F1ED';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#D4CEC5';
                        e.currentTarget.style.background = '#FAF8F5';
                      }}
                    >
                      <Upload style={{ width: '56px', height: '56px', margin: '0 auto 1.25rem', color: '#A69C8E', strokeWidth: 1.5 }} />
                      <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#3E342B', marginBottom: '0.5rem' }}>
                        Click to upload
                      </h3>
                      <p style={{ color: '#8B7D6B', marginBottom: 0, fontSize: '0.875rem' }}>PNG, JPG, JPEG</p>
                    </label>
                  ) : (
                    <div style={{ position: 'relative' }}>
                      <img
                        src={imagePreview}
                        alt="Meal"
                        style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '14px' }}
                      />
                      <button
                        onClick={clearImage}
                        style={{ 
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          background: '#3E342B',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '24px',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 4px 8px 0 rgba(62, 52, 43, 0.2)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#524539'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#3E342B'}
                      >
                        <X style={{ width: '18px', height: '18px', strokeWidth: 2.5 }} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Input Fields Card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* User Type Card */}
                <div style={{ background: '#FFFFFF', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 4px 0 rgba(62, 52, 43, 0.06)', border: '1px solid #E5DFD6' }}>
                  <div style={{ background: '#FFFFFF', padding: '1.5rem', borderBottom: '1px solid #E5DFD6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <ChefHat style={{ width: '22px', height: '22px', color: '#6B5444', strokeWidth: 2 }} />
                      <h2 style={{ fontSize: '1.0625rem', fontWeight: '600', margin: 0, color: '#3E342B', letterSpacing: '-0.01em' }}>User Profile</h2>
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      style={{ 
                        width: '100%',
                        padding: '0.875rem 1rem',
                        fontSize: '0.9375rem',
                        border: '1px solid #E5DFD6',
                        borderRadius: '12px',
                        outline: 'none',
                        cursor: 'pointer',
                        background: '#fff',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box',
                        color: '#3E342B'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#8B9D7F';
                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 157, 127, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5DFD6';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="general">👤 General User</option>
                      <option value="abha-worker">🩺 ASHA Worker</option>
                      <option value="pregnant-woman">🤰 Pregnant Woman</option>
                    </select>
                  </div>
                </div>

                {/* Weight Card */}
                <div style={{ background: '#FFFFFF', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 4px 0 rgba(62, 52, 43, 0.06)', border: '1px solid #E5DFD6' }}>
                  <div style={{ background: '#FFFFFF', padding: '1.5rem', borderBottom: '1px solid #E5DFD6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Scale style={{ width: '22px', height: '22px', color: '#6B5444', strokeWidth: 2 }} />
                      <h2 style={{ fontSize: '1.0625rem', fontWeight: '600', margin: 0, color: '#3E342B', letterSpacing: '-0.01em' }}>Body Weight</h2>
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter weight"
                        style={{ 
                          width: '100%',
                          padding: '0.875rem 3.5rem 0.875rem 1rem',
                          fontSize: '0.9375rem',
                          border: '1px solid #E5DFD6',
                          borderRadius: '12px',
                          outline: 'none',
                          transition: 'all 0.2s',
                          boxSizing: 'border-box',
                          color: '#3E342B'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#8B9D7F';
                          e.target.style.boxShadow = '0 0 0 3px rgba(139, 157, 127, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E5DFD6';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.875rem', fontWeight: '600', color: '#8B7D6B' }}>
                        kg
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meal Time Card */}
                <div style={{ background: '#FFFFFF', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 4px 0 rgba(62, 52, 43, 0.06)', border: '1px solid #E5DFD6' }}>
                  <div style={{ background: '#FFFFFF', padding: '1.5rem', borderBottom: '1px solid #E5DFD6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Clock style={{ width: '22px', height: '22px', color: '#6B5444', strokeWidth: 2 }} />
                      <h2 style={{ fontSize: '1.0625rem', fontWeight: '600', margin: 0, color: '#3E342B', letterSpacing: '-0.01em' }}>Meal Time</h2>
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <select
                      value={mealTime}
                      onChange={(e) => setMealTime(e.target.value)}
                      style={{ 
                        width: '100%',
                        padding: '0.875rem 1rem',
                        fontSize: '0.9375rem',
                        border: '1px solid #E5DFD6',
                        borderRadius: '12px',
                        outline: 'none',
                        cursor: 'pointer',
                        background: '#fff',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box',
                        color: '#3E342B'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#8B9D7F';
                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 157, 127, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5DFD6';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="breakfast">Breakfast (6-10 AM)</option>
                      <option value="mid-morning">Mid-Morning (10 AM-12 PM)</option>
                      <option value="lunch">Lunch (12-2 PM)</option>
                      <option value="afternoon">Afternoon Snack (2-5 PM)</option>
                      <option value="dinner">Dinner (6-9 PM)</option>
                      <option value="late-night">Late Night (9 PM+)</option>
                    </select>
                  </div>
                </div>

                {/* Dietary Preference Card */}
                <div style={{ background: '#FFFFFF', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 4px 0 rgba(62, 52, 43, 0.06)', border: '1px solid #E5DFD6' }}>
                  <div style={{ background: '#FFFFFF', padding: '1.5rem', borderBottom: '1px solid #E5DFD6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Activity style={{ width: '22px', height: '22px', color: '#6B5444', strokeWidth: 2 }} />
                      <h2 style={{ fontSize: '1.0625rem', fontWeight: '600', margin: 0, color: '#3E342B', letterSpacing: '-0.01em' }}>Diet Type</h2>
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: '600', color: '#3E342B' }}>
                            {isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                          </div>
                          <div style={{ fontSize: '0.8125rem', color: '#8B7D6B', marginTop: '0.25rem' }}>
                            {isVegetarian ? 'Plant-based' : 'Includes meat'}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsVegetarian(!isVegetarian)}
                        style={{
                          position: 'relative',
                          width: '52px',
                          height: '28px',
                          background: isVegetarian ? '#8B9D7F' : '#D4CEC5',
                          borderRadius: '14px',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          flexShrink: 0
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          top: '3px',
                          left: isVegetarian ? '27px' : '3px',
                          width: '22px',
                          height: '22px',
                          background: '#fff',
                          borderRadius: '11px',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
                        }}></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ 
            background: '#FFF5F0',
            border: '1px solid #F7D7C8',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            color: '#C4632E',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'start',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1rem' }}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Analyze Button */}
        {!analysis && (
          <button
            onClick={analyzeNutrition}
            disabled={loading || !selectedImage || !weight}
            style={{ 
              width: '100%',
              background: loading || !selectedImage || !weight 
                ? '#D4CEC5'
                : '#8B9D7F',
              color: '#fff',
              border: 'none',
              padding: '1.125rem',
              borderRadius: '14px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading || !selectedImage || !weight ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.625rem',
              boxShadow: '0 2px 4px 0 rgba(62, 52, 43, 0.08)',
              transition: 'all 0.2s',
              opacity: loading || !selectedImage || !weight ? 0.5 : 1,
              letterSpacing: '-0.01em'
            }}
            onMouseEnter={(e) => {
              if (!loading && selectedImage && weight) {
                e.currentTarget.style.background = '#6B7D5F';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(62, 52, 43, 0.12)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && selectedImage && weight) {
                e.currentTarget.style.background = '#8B9D7F';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px 0 rgba(62, 52, 43, 0.08)';
              }
            }}
          >
            {loading ? (
              <>
                <div style={{ 
                  width: '18px', 
                  height: '18px', 
                  border: '2px solid rgba(255, 255, 255, 0.3)', 
                  borderTop: '2px solid #fff', 
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles style={{ width: '20px', height: '20px', strokeWidth: 2 }} />
                Analyze Meal
              </>
            )}
          </button>
        )}

        {/* Results */}
        {analysis && (
          <div>
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <button
                onClick={clearImage}
                style={{ 
                  background: '#3E342B',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.875rem 1.75rem',
                  borderRadius: '14px',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px 0 rgba(62, 52, 43, 0.15)',
                  transition: 'all 0.2s',
                  letterSpacing: '-0.01em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#524539';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(62, 52, 43, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3E342B';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px 0 rgba(62, 52, 43, 0.15)';
                }}
              >
                Analyze Another
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {/* Nutrition Details */}
              <div style={{ background: '#FFFFFF', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 4px 0 rgba(62, 52, 43, 0.06)', border: '1px solid #E5DFD6' }}>
                <div style={{ background: 'linear-gradient(135deg, #A4B494 0%, #8B9D7F 100%)', padding: '1.75rem', color: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <Flame style={{ width: '24px', height: '24px', strokeWidth: 2 }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, letterSpacing: '-0.02em' }}>Nutrition Details</h3>
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  {nutritionLines.length > 0 ? (
                    <div style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#524539' }}>
                      {nutritionLines.map((line, idx) => (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          marginBottom: '0.875rem'
                        }}>
                          <span style={{ 
                            color: '#8B9D7F', 
                            fontSize: '1rem', 
                            marginRight: '0.75rem',
                            lineHeight: '1.7',
                            fontWeight: '600'
                          }}>•</span>
                          <span style={{ flex: 1 }}>{line}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#A69C8E', textAlign: 'center', padding: '2rem', fontSize: '0.875rem' }}>No nutrition data available</p>
                  )}
                </div>
              </div>

              {/* Timing Analysis */}
              <div style={{ background: '#FFFFFF', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 4px 0 rgba(62, 52, 43, 0.06)', border: '1px solid #E5DFD6' }}>
                <div style={{ background: 'linear-gradient(135deg, #E8945A 0%, #D97642 100%)', padding: '1.75rem', color: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <Clock style={{ width: '24px', height: '24px', strokeWidth: 2 }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, letterSpacing: '-0.02em' }}>Timing Analysis</h3>
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  {timingLines.length > 0 ? (
                    <div style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#524539' }}>
                      {timingLines.map((line, idx) => (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          marginBottom: '0.875rem'
                        }}>
                          <span style={{ 
                            color: '#D97642', 
                            fontSize: '1rem', 
                            marginRight: '0.75rem',
                            lineHeight: '1.7',
                            fontWeight: '600'
                          }}>•</span>
                          <span style={{ flex: 1 }}>{line}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#A69C8E', textAlign: 'center', padding: '2rem', fontSize: '0.875rem' }}>No timing data available</p>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div style={{ background: '#FFFFFF', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 4px 0 rgba(62, 52, 43, 0.06)', border: '1px solid #E5DFD6' }}>
                <div style={{ background: 'linear-gradient(135deg, #6B5444 0%, #524539 100%)', padding: '1.75rem', color: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <Activity style={{ width: '24px', height: '24px', strokeWidth: 2 }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, letterSpacing: '-0.02em' }}>Recommendations</h3>
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  {recommendationLines.length > 0 ? (
                    <div style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#524539' }}>
                      {recommendationLines.map((line, idx) => (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          marginBottom: '0.875rem'
                        }}>
                          <span style={{ 
                            color: '#6B5444', 
                            fontSize: '1rem', 
                            marginRight: '0.75rem',
                            lineHeight: '1.7',
                            fontWeight: '600'
                          }}>•</span>
                          <span style={{ flex: 1 }}>{line}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#A69C8E', textAlign: 'center', padding: '2rem', fontSize: '0.875rem' }}>No recommendations available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default NutraCoach;
