import { Routes, Navigate, Route, useLocation } from 'react-router-dom';
import routeConfigs from './RouteConfig';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../context/AuthProvider';
import Loader from '../components/common/Loader/Loader';
import { Suspense } from 'react';
import DashboardLayout from '../Layout/DashboardLayout';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return (
    <Suspense fallback={<Loader isLoading={true} />}>
      <Routes location={location} key={location.pathname}>
        {routeConfigs.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={
              route.auth ? (
                <ProtectedRoute>
                  <DashboardLayout>
                    <route.component />
                  </DashboardLayout>
                </ProtectedRoute>
              ) : (
                <DashboardLayout>
                  <route.component />
                </DashboardLayout>
              )
            }
          />
        ))}
        {/* <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/dashboards" replace />
            )
            // <Landing />
          }
        /> */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
