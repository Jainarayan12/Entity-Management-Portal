import { Box, Typography, Link } from '@mui/material';
import mindsprint from '../assets/images/mindsprint.svg';
import { useNavigate } from 'react-router-dom';

const FooterLogo = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        display="flex"
        sx={{
          marginTop: '25px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          zIndex: '999',
          position: 'relative',
        }}
      >
        <Link
          component="button"
          onClick={() => navigate('/terms')}
          underline="hover"
          sx={{
            color: '#2E2D2C',
            fontWeight: 600,
            letterSpacing: '0.56px',
            fontSize: '14px',
          }}
        >
          Terms & Conditions
        </Link>

        <Typography sx={{ color: '#2E2D2C', fontSize: '14px' }}>-</Typography>

        <Link
          component="button"
          onClick={() => navigate('/privacy')}
          underline="hover"
          sx={{
            color: '#2E2D2C',
            fontWeight: 600,
            letterSpacing: '0.56px',
            fontSize: '14px',
          }}
        >
          Privacy Policy
        </Link>
      </Box>
      <Box marginTop="24px">
        <Box display="flex" justifyContent="center">
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography
              variant="body2"
              sx={{
                color: '#555555',
                marginBottom: '5px',
                fontSize: '14px',
                letterSpacing: '1.4px',
                textTransform: 'uppercase',
              }}
            >
              Powered by
            </Typography>
            <Box
              component="img"
              src={mindsprint}
              alt="Logo"
              sx={{ width: '150px', height: '32px' }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '300px',
            height: 'auto',
            display: 'flex',
          }}
        >
          <svg
            width="300"
            height="300"
            viewBox="0 0 366 398"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M673.279 -0.000800188C584.861 9.67249 499.216 36.6919 421.236 79.5145C343.256 122.337 274.468 180.124 218.801 249.575C163.134 319.027 121.678 398.782 96.8001 484.287C71.9221 569.792 64.1097 659.372 73.809 747.91C252.374 728.362 415.849 638.582 528.271 498.321C640.694 358.061 692.855 178.809 673.279 -0.000800188Z"
              fill="#FF7000"
            />
            <path
              d="M504.008 225.576C441.784 232.384 381.512 251.398 326.635 281.534C271.758 311.67 223.349 352.337 184.174 401.213C144.999 450.088 115.825 506.215 98.3172 566.388C80.8096 626.561 75.3117 689.602 82.1375 751.91C207.8 738.153 322.844 674.971 401.96 576.265C481.076 477.558 517.783 351.412 504.008 225.576Z"
              fill="#FF5700"
            />
          </svg>
        </Box>
      </Box>
    </>
  );
};

export default FooterLogo;
