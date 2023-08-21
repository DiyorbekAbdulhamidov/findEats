import React from 'react'
import {
  Button,
  Container,
  createStyles,
  Group,
  Paper,
  rem,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { sendResetPassword } from 'modules/auth/service';
import { alert } from 'utils';

import { Navbar } from 'components'

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export default function ResetPassword() {

  const { classes } = useStyles();

  const [email, setEmail] = React.useState('')

  const [loading, setLoading] = React.useState(false);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await sendResetPassword(email);
      alert.success('Reset link has been sent to your email.');
    }
    catch (error) {
      alert.error('Error sending reset email. Please try again.');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="Your email" placeholder="Your Email" required value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Button onClick={handleResetPassword} className={classes.control}>Reset password</Button>
          </Group>
        </Paper>
      </Container>
    </>
  );
}