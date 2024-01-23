import { ComponentType, Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

interface Props {}

const Loadable = (Component: ComponentType<Props>) => (props: Props) => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <Navigate to={'/'} replace />, index: true },
        {
          path: 'users',
          element: <User />,
        },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// dinamic import

const User = Loadable(lazy(() => import('../pages/User')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
