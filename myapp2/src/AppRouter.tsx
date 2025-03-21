import { BrowserRouter, Route, Routes } from "react-router"
import RegisterFornik from "./features/components/Register/RegisterFornik"
import NotFoundPage from "./NotFoundPage"
import { Suspense, useState } from "react"
import { PublicRouter } from "./router/PublicRouter"
import { PrivateRouter } from "./router/PrivateRouter"
import { LoadingSpinner } from "./LoadingSpinner"
import HomePage from "./HomePage"

export const AppRouter = () => {

  const [isAuthenticated] = useState(true)
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRouter isAuthenticated={isAuthenticated}>
              <RegisterFornik />
            </PublicRouter>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRouter isAuthenticated={isAuthenticated}>
              <RegisterFornik />
            </PublicRouter>
          }
        />
        <Route
          path="/dashboard-admin"
          element={
            <PrivateRouter isAuthenticated={isAuthenticated}>
              <Suspense fallback={<LoadingSpinner />}>
                <HomePage />
              </Suspense>
            </PrivateRouter>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

// { hash | browser
//   [ routes
//     route{},route{},{},{},{},
//   ]
// }