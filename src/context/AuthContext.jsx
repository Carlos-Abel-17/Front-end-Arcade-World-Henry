import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  // sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import axios from "axios";
const authContext = createContext();
const { VITE_IS_LOCAL } =import.meta.env
const URL_DEPLOY = 'https://back-arcade-world-pf-henry.onrender.com';
const urlLocal = 'http://localhost:3001';
const BD_URL =  VITE_IS_LOCAL === 'true' ? urlLocal : URL_DEPLOY
import { useDispatch } from "react-redux";
import { setAuthenticated, setUserData } from "../redux/actions";



export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const googleProvider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const loginWithGoogle = async () => {
    try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential) {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const token = user.accessToken;
              const response = await axios.post(`${BD_URL}/user/firebase`, {
                token: token
              });
              //permanencia de usuario
              localStorage.setItem("login", JSON.stringify(response.data));
              //Autenticación para pasar al profile
              dispatch(setAuthenticated(true));
              //Toma de datos para pasarlos al profile
              dispatch(setUserData(response.data));
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
  };
  return (
    <authContext.Provider
      value={{
        loginWithGoogle,
        // resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
