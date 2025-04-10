import Header from './Header';
import SideNav from './Sidenav';
import { Box, Toolbar } from '@mui/material';

const DashboardLayout = ({ children }) => {
  let userRole = 'corpsec';
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SideNav userRole={userRole} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
