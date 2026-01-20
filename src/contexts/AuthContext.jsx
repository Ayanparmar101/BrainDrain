import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Immediately set loading to false after a very short delay
        const quickTimeout = setTimeout(() => {
            if (loading) {
                console.log('Quick timeout - setting loading to false');
                setLoading(false);
            }
        }, 500); // Very short timeout

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            clearTimeout(quickTimeout);

            if (user) {
                // Set user immediately
                setCurrentUser(user);
                setLoading(false);

                // Fetch profile in background without blocking
                getDoc(doc(db, 'users', user.uid))
                    .then(userDoc => {
                        if (userDoc.exists()) {
                            setCurrentUser({ ...user, profile: userDoc.data() });
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user profile:', error);
                    });
            } else {
                setCurrentUser(null);
                setLoading(false);
            }
        });

        return () => {
            clearTimeout(quickTimeout);
            unsubscribe();
        };
    }, []);

    const signup = async (email, password, profileData) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user profile in Firestore
        try {
            await setDoc(doc(db, 'users', user.uid), {
                ...profileData,
                email: user.email,
                createdAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error creating user profile:', error);
        }

        return user;
    };

    const login = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        return signOut(auth);
    };

    const value = {
        currentUser,
        signup,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0B3D91 0%, #1E5A9A 100%)',
                    color: 'white'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            border: '4px solid rgba(255,255,255,0.3)',
                            borderTop: '4px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 1rem'
                        }}></div>
                        <p>Initializing...</p>
                        <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
                    </div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
