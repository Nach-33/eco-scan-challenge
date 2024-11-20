import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));
const AuthToken = Loadable(lazy(() => import('pages/authentication/AuthToken')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/auth/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/auth/login',
      element: <AuthLogin />
    },
    {
      path: '/auth/register',
      element: <AuthRegister />
    },
    {
      path: '/auth/token',
      element: <AuthToken/>
    }
  ]
};

export default LoginRoutes;
