import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
// create auth
const auth = getAuth(app);

//  get current user while state change
// create context
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currenUser) => {
      setError(false);
      setUser(currenUser);
      if (currenUser) {
        axios
          .post(
            "http://localhost:5000/jsonwebtoken",
            {
              username: currenUser.displayName,
              email: currenUser.email,
            },
            { withCredentials: true }
          )
          .then(() => {})
          .catch((err) => console.log(err));
      } else {
        axios
          .delete("http://localhost:5000/signout", {
            withCredentials: true,
          })
          .then(() => {})
          .catch((err) => console.log(err));
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // create new user
  const signup = (email, password) => {
    setError(false);
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // create signin
  const signin = (email, password) => {
    setError(false);
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with google
  const loginWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  // create new user
  const signout = () => {
    setError(false);
    setLoading(true);
    return signOut(auth);
  };
  const value = {
    signup,
    signin,
    signout,
    user,
    loading,
    error,
    auth,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {children && children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
