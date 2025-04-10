import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Badge,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useLocation } from 'react-router-dom';
import { menuItems } from '../constants/MenuItems';

const drawerWidth = 72;

const Header = ({ userName }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Find current menu name
  const currentMenu = menuItems.find((item) => item.path === currentPath);
  const label = currentMenu?.name || '';

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: '#fff',
        borderBottom:'1px dashed rgba(0, 0, 0, 0.18)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '16px',
            color: label ? '#EF6C00' : '#000',
          }}
        >
          {label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton sx={{outline:'none !important'}}>
            <Badge color="error" variant="dot">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
          <IconButton sx={{outline:'none !important'}}>
            <Avatar alt={userName} src="/avatar.png" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
