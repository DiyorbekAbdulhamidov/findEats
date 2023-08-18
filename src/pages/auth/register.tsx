import React from "react";
import { auth, provider } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
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

function Register() {
  const [email, setEmail] = React.useState('');
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

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authInstance = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
      const user = userCredential.user;
      console.log(user);
      navigate('/auth/login');
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  }

  return (
    <div>
      <Container size={420} my={40}>
        <Title order={2} ta="center" mt="md" mb={50}>
          Register
        </Title>
        <form onSubmit={handleRegister}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Your email" required />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="Your password" required mt="md" />
            <Group position="apart" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                <Link to={'/auth/login'} style={{ color: "blue" }}>Do have an account?</Link>
              </Anchor>
            </Group>
            <Button type="submit" fullWidth mt="xl">
              Register
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

export default Register;
