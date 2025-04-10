import React from 'react';
import Dashboard from '../components/pages/Dashboard/Dashboard';


const LandingPage = React.lazy(
  () => import('../components/pages/Home/HomePage'),
);

const EntityCreation = React.lazy(
  () => import('../components/pages/Dashboard/CreateEntity/EntityCreation'),
);



const routeConfigs = [
  {
    key: 'LANDING_PAGE',
    path: '/',
    auth: false,
    component: LandingPage,
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
