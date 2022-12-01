import { FunctionComponent, useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import firebase from "firebase/app";
import "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseAuthConfig = {
    signInFlow: "popup",
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
      },
    ],
    signInSuccessUrl: "/",
  };

  const FirebaseAuth: FunctionComponent = () => {
    const [renderAuth, setRenderAuth] = useState(false);

    useEffect(() => {
      setRenderAuth(true);
    }, []);

    return (
      <div className="mt-16">
        {renderAuth ? (
          <StyledFirebaseAuth
            uiConfig={firebaseAuthConfig}
            firebaseAuth={firebase.auth()}
          />
        ) : null}
      </div>
    );
  };

  export default FirebaseAuth;
