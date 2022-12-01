import {
    useEffect,
    useState,
    useContext,
    createContext,
    FunctionComponent,
  } from "react";
  import { useRouter } from "next/router";
//   import firebase from "firebase/app";
  import "firebase/auth";
  import initFirebase from "./initFirebase";
  import { removeTokenCookie, setTokenCookie } from "./tokenCookies";

  import firebase from "firebase/compat/app";
  import "firebase/compat/auth";
  import "firebase/compat/firestore";

  initFirebase(); // initialize firebase

  interface IAuthContext {
    user: firebase.User | null; // either a firebase user or null
    logout: () => void; // a function to logout the user, doesn't return anything
    authenticated: boolean; // whether the user is authenticated or not, true or false
  }

  const AuthContext = createContext<IAuthContext>({  // create a context with the type IAuthContext
    user: null, // set the default user to null
    logout: () => null, // set the default logout function to do nothing
    authenticated: false, // set the default authenticated value to false
  });

  export const AuthProvider: FunctionComponent = ({ children }) => { // create a provider component that will wrap our app and make the context available to any child component, receives prop children
    const [user, setUser] = useState<firebase.User | null>(null); //
    const router = useRouter(); // use the router to redirect the user

    const logout = () => { // logout function
      firebase // call the firebase logout function
        .auth() // get the auth module
        .signOut() // call the signOut function
        .then(() => { // when the promise resolves
          router.push("/"); // redirect the user to the home page
        }) // end then
        .catch((e) => { // if there is an error
          console.error(e); // log the error
        });
    };

    useEffect(() => { // use the useEffect hook to run this function when the component mounts
      const cancelAuthListener = firebase // call the firebase onAuthStateChanged function
        .auth() // get the auth module
        .onIdTokenChanged(async (user: any) => { // call the onIdTokenChanged function, pass in the user
          if (user) { // if the user exists
            const token = await user.getIdToken(); // get the token
            setTokenCookie(token); // set the token cookie
            setUser(user); // set the user
          } else { // if the user doesn't exist
            removeTokenCookie(); // remove the token cookie
            setUser(null); // set the user to null
          }
        });

      return () => { // return a function to run when the component unmounts
        cancelAuthListener(); // unsubscribe from the listener when the component unmounts
      };
    }, []);

    return (
        // pass the value to the provider, which is the user, logout function and authenticated value
      <AuthContext.Provider value={{ user, logout, authenticated: !!user }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export function useAuth() { // create a custom hook to use the context
    return useContext(AuthContext); // return the context
  }
