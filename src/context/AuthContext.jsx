import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext({
  currentUser: null,
  authLoading: true,
  signUp: async () => {},
  logIn: async () => {},
  signInWithGoogle: async () => {},
  logOut: async () => {},
  resetPassword: async () => {},
});


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    
    return unsubscribe;
  }, []);

  const signUp = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password).then((credential) => {
      
      if (displayName) {
        return updateProfile(credential.user, { displayName });
      }
    });

  const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

  
  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logOut = () => signOut(auth);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider
      value={{ currentUser, authLoading, signUp, logIn, signInWithGoogle, logOut, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}