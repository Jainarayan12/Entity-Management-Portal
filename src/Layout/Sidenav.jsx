import { Box, Drawer, IconButton, Tooltip, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { menuItems } from '../constants/MenuItems';
import Logo from '../assets/images/logo.svg';
const drawerWidth = 72;

const SideNav = ({ userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#FFF9F5',
          borderRight: '1px solid #e0e0e0',
          alignItems: 'center',
          overflow:'visible',
          pt: 2,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          marginBottom: '18px',
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{ width: 30, height: 30 }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop:"16px",
          borderTop:"1px dashed #FCD9BE"
        }}
      >
        {filteredMenu.map(({ name, path, icon }) => {
          const isSelected = location.pathname === path;

          return (
            <Tooltip
              key={path}
              title={name}
              placement="right"
            >
              <IconButton
                onClick={() => navigate(path)}
                sx={{
                  my: 1,
                  backgroundColor: isSelected ? '#FF7000' : 'transparent',
                  borderRadius: 0,
                  padding: '12px 8px',
                  width: drawerWidth,
                  cursor: 'pointer',
                  outline:'none !important',
                  '&:hover': {
                    backgroundColor: isSelected ? '#FF7000' : '#f5f5f5',
                  },
                }}
              >
                {icon(isSelected)}
              </IconButton>
            </Tooltip>
          );
        })}
      </Box>
    </Drawer>
  );
};

export default SideNav;
