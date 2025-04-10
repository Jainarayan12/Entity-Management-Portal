import { Box, Typography } from '@mui/material';
import olamagri from '../assets/images/olamagri.svg';

const HeaderLogo = () => {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ paddingBottom: '20px', flexDirection: 'row', gap: '5px' }}
      >
        <Box
          component="img"
          src={olamagri}
          alt="Logo"
          sx={{ width: '150px', height: '32px' }}
        />
        <Box
          sx={{
            width: '1px',
            height: '20px',
            backgroundColor: '#999999',
            marginRight: '5px',
          }}
        ></Box>

        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: '#FF7000', whiteSpace: 'nowrap' }}
        >
          Entity Management
        </Typography>
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: '400',
          textAlign: 'center',
          fontSize: '14px',
          color: '#2E2D2C',
          letterSpacing: '-0.456px',
          lineHeight: '150%',
          padding:"20px 0",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
    </Box>
  );
};

export default HeaderLogo;
