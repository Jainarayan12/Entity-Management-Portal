import React from 'react';
import Dashboard from '../components/pages/Dashboard/Dashboard';

const LandingPage = React.lazy(
  () => import('../components/pages/Home/HomePage'),
);

const ViewRequest = React.lazy(
  () => import('../components/pages/Dashboard/EditEntity/viewRequest'),
);

const ViewRequestStatus = React.lazy(
  () => import('../components/pages/Dashboard/EditEntity/ViewRequestStatus'),
);

const EntityCreation = React.lazy(
  () => import('../components/pages/Dashboard/CreateEntity/EntityCreation'),
);

const LoginPage = React.lazy(() => import('../components/pages/Home/Login'));

const EditEntity = React.lazy(
  () => import('../components/pages/Dashboard/EditEntity/EditEntity'),
);

const EntityDetailsPage = React.lazy(
  () => import('../components/pages/Dashboard/EditEntity/EditEntityDetails'),
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
  {
    key: 'Edit_ENTITY',
    path: '/edit-entity',
    auth: false,
    component: EditEntity,
  },
  {
    key: 'VIEW_REQUEST_STATUS',
    path: '/view-request-status',
    auth: false,
    component: ViewRequestStatus,
  },
  {
    key: 'VIEW_REQUEST',
    path: '/view-request',
    auth: false,
    component: ViewRequest,
  },
  {
    key: 'ENTITY_DETAILS_PAGE',
    path: '/entity-details',
    auth: false,
    component: EntityDetailsPage,
  },
];
export default routeConfigs;
