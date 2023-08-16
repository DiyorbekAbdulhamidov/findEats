import { createContext, useContext } from 'react'

import { IContext } from '../types'

export const AuthContext = createContext<IContext.Auth>({} as IContext.Auth)

export const useAuth = () => useContext(AuthContext)