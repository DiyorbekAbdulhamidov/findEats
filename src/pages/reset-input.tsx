import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Loader, TextInput } from '@mantine/core'
import { resetPasswordWithCode } from 'modules/auth/service'

interface ResetPasswordProps {
  oobCode: string // Oob kodi komponentga prop sifatida o'tkazilishi kerak
}

const ResetInput = ({ oobCode }: ResetPasswordProps) => {
  const [loading, setLoading] = useState(false)
  const [newPassword, setNewPassword] = useState('')

console.log(oobCode);
  

  const navigate = useNavigate()

  const handleResetPassword = async () => {
    setLoading(true)

    try {
      await resetPasswordWithCode(oobCode, newPassword)

      setLoading(false)
      window.location.href = '/'
    } catch (error) {
      console.error('Parolni tiklashda xatolik:', error)
      setLoading(false)
    }
  }

  return (
    <>
      <TextInput
        placeholder="Yangi parolni kiriting"
        type="password"
        value={newPassword}
        onChange={event => setNewPassword(event.currentTarget.value)}
        disabled={loading}
      />
      <Button onClick={handleResetPassword} loading={loading}>
        {loading ? <Loader /> : 'Parolni tiklash'}
      </Button>
    </>
  )
}

export default ResetInput