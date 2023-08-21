import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Loader, Text, TextInput } from '@mantine/core';
import { resetPasswordWithCode } from 'modules/auth/service';
import { alert } from 'utils';

interface ResetPasswordProps {
  oobCode: string;
}

const ResetInput: React.FC<ResetPasswordProps> = ({ oobCode }) => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      alert.error('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await resetPasswordWithCode(oobCode, newPassword);
      setLoading(false);
      navigate('/');
    } catch (error) {
      alert.error('Error reset password');
      setLoading(false);
    }
  };

  return (
    <Container mt={200}>
      <Text c="black" fz="lg" ta="center" mb={40}>
        Enter New Password
      </Text>
      <TextInput
        placeholder="Enter New Password"
        type="password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.currentTarget.value)}
        disabled={loading}
        mb={10}
      />
      <Button onClick={handleResetPassword} loading={loading}>
        {loading ? <Loader /> : 'Submit'}
      </Button>
    </Container>
  );
};

export default ResetInput;
