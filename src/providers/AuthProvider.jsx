import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../../src/firebase/firebase.config';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null);

function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    console.log(user)

    const createUser = (email,password) => {
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
        // const auth = getAuth();
        // console.log(auth)

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            console.log(currentUser)
            
            setLoading(false);
            // save current user in db
            if(currentUser) {
                try {
                   await axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`,{
                        name: currentUser?.displayName || "Anonymous User",
              email: currentUser?.email,
              image: currentUser?.photoURL || "",
                    })
                    console.log("User saved to database successfully.");
                } catch (error) {
                    console.error("Error saving user to database:", error.message);
                }
            }
            
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);



    const authInfo = {
        user,
        loading,
        error,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        updateProfile
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