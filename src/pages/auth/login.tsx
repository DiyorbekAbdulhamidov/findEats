import React from "react";
import { auth, provider } from "../../firebase/firebase";
import { signInWithPopup, getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Container,
  Group,
  Button,
  Title,
} from '@mantine/core';
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      navigate('/');
    }
    catch (error: any) {
      const errorMessage = error.message;
      console.error(errorMessage);
    }
  };

  const handleSignIn = (e: any) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/');

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div>
      <Container size={420} my={40}>
        <Title order={2} ta="center" mt="md" mb={50}>
          Login
        </Title>
        <form onSubmit={handleSignIn}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Your email" required />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="Your password" required mt="md" />
            <Group position="apart" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                <Link to={'/auth/reset-password'}>
                  Forgot password?
                </Link>
              </Anchor>
            </Group>
            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
            <Button fullWidth mt="xl" onClick={signInWithGoogle}>
              With Google
            </Button>
          </Paper>
        </form>
      </Container>
    </div>
  );
}

export default Login;