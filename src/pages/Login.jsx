import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Mail, Lock } from 'lucide-react';

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
            background: 'linear-gradient(135deg, #0B3D91 0%, #1E5A9A 100%)',
            padding: '2rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                maxWidth: '900px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                {/* Left Side - Branding */}
                <div style={{
                    background: 'linear-gradient(135deg, #0B3D91 0%, #1E5A9A 100%)',
                    padding: '3rem',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <BookOpen size={48} />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                        Udyogwork
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: '1.6' }}>
                        Access your courses, track your progress, and explore internship opportunities.
                    </p>
                </div>

                {/* Right Side - Login Form */}
                <div style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#0B3D91' }}>Welcome Back</h2>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>Sign in to continue your learning journey</p>

                    {error && (
                        <div style={{
                            padding: '0.75rem',
                            background: '#fee',
                            border: '1px solid #fcc',
                            borderRadius: '8px',
                            color: '#c33',
                            marginBottom: '1rem',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="student@example.com"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        transition: 'border-color 0.2s'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        transition: 'border-color 0.2s'
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
                                background: loading ? '#ccc' : 'linear-gradient(135deg, #0B3D91 0%, #1E5A9A 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'transform 0.2s'
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                        Demo: Use any email/password to login
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
