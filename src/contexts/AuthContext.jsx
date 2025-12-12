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
        // Set a timeout to prevent infinite loading
        const timeout = setTimeout(() => {
            console.log('Auth timeout - proceeding without user');
            setLoading(false);
        }, 5000);

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            clearTimeout(timeout);

            if (user) {
                // Don't wait for Firestore, just set the user
                setCurrentUser(user);

                // Fetch profile in background
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setCurrentUser({ ...user, profile: userDoc.data() });
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    // Continue anyway with just auth user
                }
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return () => {
            clearTimeout(timeout);
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
