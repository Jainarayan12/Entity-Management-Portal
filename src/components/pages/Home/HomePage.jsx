import {
  Container,
  Grid,
  Box,
  Button,
} from '@mui/material';
import SideBanner from '../../../Layout/LoginSideBanner';
import HeaderLogo from '../../../Layout/LoginHeaderLogo';
import FooterLogo from '../../../Layout/LoginFooterLogo';
import { useMsal } from '@azure/msal-react';
// import { useSecureStorage } from '../../../core/utils/SecureStorage';
import { API_ENDPOINTS } from '../../../core/utils/apiEndpoints';
import useApi from '../../../core/api-service/useApi';
// import { jwtDecode } from 'jwt-decode';
// import { useAuth } from '../../../context/AuthProvider';
import { toastError } from '../../common/Toast/Toast';

const Landing = () => {
 
  // const { setItem } = useSecureStorage();
  const { post } = useApi();
  const { instance } = useMsal();
  // const { setUserType, setLanguage, setIsAuthenticated } = useAuth();

  const handleInternalLogin = async () => {
    try {
      const response = await instance.loginPopup({
        scopes: ['User.Read'],
      });

      if (response.account && response.idToken) {
        const res = response.account;
        const idToken = response.idToken;

        let formData = {};
        formData = {
          client_id: 'clientId',
          client_secret: 'secret',
          username: res.username,
          credVal: idToken,
          grant_type: 'password',
          countryId: '2',
          businessId: '2',
          textBoxFlag: false,
        };

        const headers = {
          'X-Skip-Interceptor': 'true',
        };

        const data = await post(
          `${API_ENDPOINTS.auth.token}`,
          formData,
          headers,
        );
        if (data?.status === 200) {
          if (data?.data?.statusCode == 200) {
            //text
          } else {
            toastError(data?.data?.message);
          }
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };



  return (
    <Grid
      container
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      <Grid item xs={12} md={6} >
        <SideBanner />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xs" sx={{ maxWidth: '400px !important' }}>
          <HeaderLogo label="login" />
          <Box >
            <Button
                variant="contained"
                fullWidth
                sx={{
                  paddingY: 1.5,
                  backgroundColor: '#2E2D2C',
                  outline: 'none !important',
                  color: '#fff',
                  fontWeight: '600',
                  margin:"20px 0",
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#2E2D2C',
                  },
                }}
                onClick={handleInternalLogin}
              >
              Login with SSO
              </Button>
          </Box>
          <FooterLogo />
        </Container>
      </Grid>
    </Grid>
  );
};

export default Landing;
