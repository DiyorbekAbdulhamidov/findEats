import React from "react";
import { auth, provider } from "../../firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setSession } from "../../utils";

function Login() {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const access_token = credential!.accessToken;
      const refresh_token = "";
      //@ts-ignore
      setSession({ access: access_token, refresh: refresh_token });
      const user = result.user;
      console.log(user);
    }
    catch (error: any) {
      const errorMessage = error.message;
      console.error(errorMessage);
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Google</button>
    </div>
  );
}

export default Login;