import { Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import RegisterFormik from './components/organisms/Formik/RegisterFormik'
import { PublicRouter } from './router/PublicRouter'
import { LoadingSpinner } from './LoadingSpinner'
import { PrivateRouter } from './router/PrivateRouter'
import NotFoundPage from './NotFoundPage'

export const AppRouter = () => {

  const [isAuthenticated] = useState(true)
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRouter isAuthenticated={isAuthenticated}>
              <RegisterFormik />
            </PublicRouter>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRouter isAuthenticated={isAuthenticated}>
              <RegisterFormik />
            </PublicRouter>
          }
        />
        <Route
          path="/dashboard-admin"
          element={
            <PrivateRouter isAuthenticated={isAuthenticated}>
              <Suspense fallback={<LoadingSpinner />}>
                <RegisterFormik />
                {/* <TransferPage /> */}
              </Suspense>
            </PrivateRouter>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
