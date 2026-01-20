import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Apple, Mail, Lock, Heart } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to sign in. Please check your credentials.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F5F1ED',
            padding: '2rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '18px',
                boxShadow: '0 4px 8px 0 rgba(62, 52, 43, 0.08)',
                overflow: 'hidden',
                maxWidth: '900px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                border: '1px solid #E5DFD6'
            }}>
                {/* Left Side - Branding */}
                <div style={{
                    background: 'linear-gradient(135deg, #8B9D7F 0%, #6B7D5F 100%)',
                    padding: '3rem',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <div style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>
                        🥗
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.875rem', fontWeight: '600', letterSpacing: '-0.03em' }}>
                        NutraSim
                    </h1>
                    <p style={{ fontSize: '1rem', opacity: 0.95, lineHeight: '1.65' }}>
                        Professional nutrition education and wellness programs platform
                    </p>
                </div>

                {/* Right Side - Login Form */}
                <div style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.625rem', marginBottom: '0.5rem', color: '#3E342B', fontWeight: '600', letterSpacing: '-0.03em' }}>Welcome back</h2>
                    <p style={{ color: '#8B7D6B', marginBottom: '2rem', fontSize: '0.9375rem' }}>Sign in to continue</p>

                    {error && (
                        <div style={{
                            padding: '0.75rem',
                            background: '#FFF5F0',
                            border: '1px solid #F7D7C8',
                            borderRadius: '12px',
                            color: '#C4632E',
                            marginBottom: '1rem',
                            fontSize: '0.875rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#3E342B', fontSize: '0.875rem' }}>
                                Email
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#A69C8E' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="name@example.com"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0.875rem 0.75rem 2.75rem',
                                        border: '1px solid #E5DFD6',
                                        borderRadius: '12px',
                                        fontSize: '0.9375rem',
                                        transition: 'all 0.2s',
                                        outline: 'none',
                                        color: '#3E342B',
                                        boxSizing: 'border-box',
                                        background: '#FAF8F5'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#8B9D7F';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 157, 127, 0.15)';
                                        e.target.style.background = '#FFFFFF';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#E5DFD6';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.background = '#FAF8F5';
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#3E342B', fontSize: '0.875rem' }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#A69C8E' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0.875rem 0.75rem 2.75rem',
                                        border: '1px solid #E5DFD6',
                                        borderRadius: '12px',
                                        fontSize: '0.9375rem',
                                        transition: 'all 0.2s',
                                        outline: 'none',
                                        color: '#3E342B',
                                        boxSizing: 'border-box',
                                        background: '#FAF8F5'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#8B9D7F';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(139, 157, 127, 0.15)';
                                        e.target.style.background = '#FFFFFF';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#E5DFD6';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.background = '#FAF8F5';
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                background: loading ? '#D4CEC5' : '#8B9D7F',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '0.9375rem',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                letterSpacing: '-0.01em'
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) e.currentTarget.style.background = '#6B7D5F';
                            }}
                            onMouseLeave={(e) => {
                                if (!loading) e.currentTarget.style.background = '#8B9D7F';
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <p style={{ color: '#A69C8E', fontSize: '0.8125rem' }}>
                            Test: demo@nutrasim.com / demo123
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
