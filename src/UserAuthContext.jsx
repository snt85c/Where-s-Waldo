import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  getAuth,
  PopupRedirectResolver
} from "firebase/auth";
import { auth } from "./Firebase";

//we create a context and we call it userAuthContext
const userAuthContext = createContext();

//we create a context component that we will use to wrap our routes in App.js
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");

  function signInAnon() {
    return signInAnonymously(auth);
  }

  //sign up function
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //log in fucntion
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //logout function
  function logout() {
    return signOut(auth);
  }

  //sign in with google
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithRedirect(auth, googleAuthProvider);
  }

  function GitHubSignIn() {
    const githubAuthProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const auth = getAuth();

  //   const unsubscribe = getRedirectResult(auth)
  //     .then((result) => {
  //       console.log(result.user);
  //       setUser(result.user);
  //     })
  //     .catch((error) => {
  //       console.log(error.code, error.message);
  //     });
  //     return () => unsubscribe();
  // }, []);

  return (
    //we pass the value that we want to use for context
    <userAuthContext.Provider
      value={{
        user,
        signUp,
        logIn,
        logout,
        googleSignIn,
        signInAnon,
        GitHubSignIn,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

//we export the function that we will use to get the context when needed
export function useUserAuth() {
  return useContext(userAuthContext);
}
