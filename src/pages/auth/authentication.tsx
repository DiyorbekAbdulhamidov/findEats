import React from 'react';
import { auth, provider } from '../../firebase/firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setSession } from '../../utils';

function Login() {

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const access_token = credential!.accessToken;
      const refresh_token = ''
      //@ts-ignore
      setSession({ access: access_token, refresh: refresh_token });
      const user = result.user;
      console.log(user);
    }
    catch (error: any) {
      // const errorCode = error.code;
      const errorMessage = error.message;
      // const email = error.customData?.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(errorMessage);
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Google orqali ro'yxatdan o'tish</button>
    </div>
  );
}

export default Login;
