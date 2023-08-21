// Action.js
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingOverlay } from '@mantine/core'
import { emailVerify } from 'modules/auth/service'
import queryString from 'query-string'

import ResetInput from './reset-input'

interface ActionProps { }

interface IAction {
  mode: 'verifyEmail' | 'resetPassword'
  oobCode: string
}

const Action = (props: ActionProps) => {
  const navigate = useNavigate()
  const { mode, oobCode } = queryString.parse(window.location.search) as unknown as IAction
  const [isResetPasswaord, setisResetPasswaord] = useState(false)

  useEffect(() => {
    const handleAction = async () => {
      switch (mode) {
        case 'verifyEmail':
          await emailVerify(oobCode)
          navigate('/')
          break
        case 'resetPassword':
          setisResetPasswaord(true)
          break
        default:
          navigate('/')
      }
    }

    handleAction()
  }, [mode, navigate, oobCode])

  if (isResetPasswaord) return <ResetInput oobCode={oobCode} />

  return <LoadingOverlay visible overlayBlur={2} />
}

export default Action