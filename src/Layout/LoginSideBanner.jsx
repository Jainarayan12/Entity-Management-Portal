import { Box } from '@mui/material';
import loginbanner from '../assets/images/homebanner.png';

const SideBanner = () => {
  return (
    <Box
      component="img"
      src={loginbanner}
      alt="Logo"
      sx={{
        width: '100%',
        height: '100vh',
        display:'flex'
      }}
    />
  );
};

export default SideBanner;
