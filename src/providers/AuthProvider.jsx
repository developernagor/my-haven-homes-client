import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../../src/firebase/firebase.config';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null);

function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(user)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        
        return signInWithEmailAndPassword(auth, email, password);
        
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            // save current user in db
            if(currentUser) {
                try {
                    axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`,{
                        name: currentUser?.displayName,
                        email: currentUser?.email,
                        image: currentUser?.photoURL
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);



    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser
    }


    return (
        
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        
    );
}
export const useAuth = () => {
    return useContext(AuthContext);
  };

export default AuthProvider;