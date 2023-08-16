import { BrowserRouter, Navigate, Route, Routes as BaseRoutes } from 'react-router-dom'

import Protected from './protected'
import { Home, Login } from '../pages'
import { useAuth } from '../modules/auth/context/auth'

const Routes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <BaseRoutes>
        <Route path="" element={<Protected allow={isAuthenticated} navigate="/auth/login" />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="auth" element={<Protected allow={!isAuthenticated} navigate="/" />}>
          <Route path="login" element={<Login />} />
          {/* <Route path="reset-password" element={<ResetPassword />} /> */}
          {/* <Route path="verification" element={<Verification />} /> */}
          <Route path="*" index element={<Navigate to="/auth/login" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </BaseRoutes>
    </BrowserRouter>
  )
}

export default Routes