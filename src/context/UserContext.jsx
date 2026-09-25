import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const DEFAULT_USER = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  occupation: "",
  currency: "NGN",
  avatar: null,
};

const UserContext = createContext({
  user: DEFAULT_USER,
  updateUser: async () => {},
  updateAvatarLocal: () => {},
  isGoogleUser: false,
});

export function UserProvider({ children }) {
  const { currentUser, authLoading } = useAuth();

  const uid = currentUser?.uid;

  
  const isGoogleUser =
    currentUser?.providerData?.some((p) => p.providerId === "google.com") ?? false;

  const [user, setUser] = useState(DEFAULT_USER);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      if (authLoading) return;

      if (!currentUser) {
        setUser(DEFAULT_USER);
        setLoaded(false);
        return;
      }

      try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        const firestoreUser = userSnap.exists() ? userSnap.data() : {};

        // A locally-stored avatar (email/password users only) wins over
        // both Firestore and Auth's photoURL, since it's the most recent
        // thing the user chose on this device.
        const localAvatar = !isGoogleUser
          ? localStorage.getItem(`denari_avatar_${uid}`)
          : null;

        setUser({
          ...DEFAULT_USER,
          ...firestoreUser,
          fullName: currentUser.displayName || firestoreUser.fullName || "",
          email: currentUser.email || firestoreUser.email || "",
          avatar: localAvatar || currentUser.photoURL || firestoreUser.avatar || null,
          phone: firestoreUser.phone || currentUser.phoneNumber || "",
        });

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            fullName: currentUser.displayName || "",
            email: currentUser.email || "",
            avatar: currentUser.photoURL || null,
            phone: currentUser.phoneNumber || "",
            dob: "",
            occupation: "",
            currency: "NGN",
          });
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
        setUser({
          ...DEFAULT_USER,
          fullName: currentUser.displayName || "",
          email: currentUser.email || "",
          avatar: currentUser.photoURL || null,
          phone: currentUser.phoneNumber || "",
        });
      }

      setLoaded(true);
    };

    loadUser();
  }, [currentUser, uid, authLoading, isGoogleUser]);

  const updateUser = async (updates) => {
    if (!uid) return;
    try {
      setUser((prev) => ({ ...prev, ...updates }));
      await setDoc(doc(db, "users", uid), updates, { merge: true });
    } catch (error) {
      console.error("Failed to save user profile:", error);
    }
  };

  
  const updateAvatarLocal = (dataUrl) => {
    if (!uid || isGoogleUser) return;
    localStorage.setItem(`denari_avatar_${uid}`, dataUrl);
    setUser((prev) => ({ ...prev, avatar: dataUrl }));
  };

  return (
    <UserContext.Provider
      value={{ user, updateUser, updateAvatarLocal, isGoogleUser, loaded }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}