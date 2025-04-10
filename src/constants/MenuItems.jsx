import Dashboard_Black from '../assets/images/dashboard_black.svg';
import Entity_Black from '../assets/images/entity_black.svg';
import Transaction_Black from '../assets/images/transaction_black.svg';
import Reports_Black from '../assets/images/Reports_black.svg';
import User_Black from '../assets/images/user_black.svg';
import Dashboard_white from '../assets/images/dashboard_white.svg';
import Entity_white from '../assets/images/entity_white.svg';
import Transaction_white from '../assets/images/transaction_white.svg';
import Reports_white from '../assets/images/Reports_white.svg';
import User_white from '../assets/images/user_white.svg';
import { Box } from '@mui/material';

export const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    roles: ['corpsec', 'origin'],
    icon: (isSelected) => (
      <Box
        component="img"
        src={isSelected ? Dashboard_white : Dashboard_Black}
        alt="dashboard"
        sx={{ width: 24, height: 24 }}
      />
    ),
  },
  {
    name: 'Entity',
    path: '/entity',
    roles: ['corpsec'],
    icon: (isSelected) => (
      <Box
        component="img"
        src={isSelected ? Entity_white : Entity_Black}
        alt="entity"
        sx={{ width: 24, height: 24 }}
      />
    ),
  },
  {
    name: 'Transaction',
    path: '/transaction',
    roles: ['corpsec'],
    icon: (isSelected) => (
      <Box
        component="img"
        src={isSelected ? Transaction_white : Transaction_Black}
        alt="transaction"
        sx={{ width: 24, height: 24 }}
      />
    ),
  },
  {
    name: 'Reports',
    path: '/reports',
    roles: ['corpsec', 'origin'],
    icon: (isSelected) => (
      <Box
        component="img"
        src={isSelected ? Reports_white : Reports_Black}
        alt="reports"
        sx={{ width: 24, height: 24 }}
      />
    ),
  },
  {
    name: 'User',
    path: '/user',
    roles: ['corpsec'],
    icon: (isSelected) => (
      <Box
        component="img"
        src={isSelected ? User_white : User_Black}
        alt="user"
        sx={{ width: 24, height: 24 }}
      />
    ),
  },
];
