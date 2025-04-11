import React from 'react';
import Dashboard from '../components/pages/Dashboard/Dashboard';

const LandingPage = React.lazy(
  () => import('../components/pages/Home/HomePage'),
);

const EntityCreation = React.lazy(
  () => import('../components/pages/Dashboard/CreateEntity/EntityCreation'),
);

const LoginPage = React.lazy(
  () => import('../components/pages/Home/Login'),
);


const routeConfigs = [
  {
    key: 'LANDING_PAGE',
    path: '/',
    auth: false,
    component: LandingPage,
  },
  {
    key: 'LOGIN_PAGE',
    path: '/login',
    auth: false,
    component: LoginPage,
  },
  {
    key: 'LANDING_PAGE',
    path: '/dashboard',
    auth: false,
    component: Dashboard,
  },
  {
    key: 'CREATE_ENTITY',
    path: '/create-entity',
    auth: false,
    component: EntityCreation,
  },
];
export default routeConfigs;
