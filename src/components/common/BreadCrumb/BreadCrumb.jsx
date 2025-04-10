import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import back from '../../../assets/images/back.svg';
import { useTranslation } from 'react-i18next';

const BreadcrumbsComponent = ({ label, path, isRequired }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ background: '#2E2D2C', height: 'auto' }}
    >
      {isRequired ? (
        <Link
          onClick={() => navigate(path)}
          sx={{ cursor: 'pointer', textDecoration: 'none' }}
        >
          <Typography
            sx={{
              color: '#FFFFFF',
              padding: '10px',
              textDecoration: 'none !important',
            }}
          >
            <Box display="flex" alignItems="center" gap="10px">
              <Box
                component="img"
                src={back}
                alt="pdf"
                marginLeft="10px"
                width="15px"
                height="15px"
                sx={{ cursor: 'pointer' }}
              />
              {t(label)}
            </Box>
          </Typography>
        </Link>
      ) : (
        <Typography
          sx={{
            color: '#FFFFFF',
            padding: '10px',
            textDecoration: 'none !important',
            marginLeft:'10px'
          }}
        >
          {t(label)}
        </Typography>
      )}
    </Breadcrumbs>
  );
};

BreadcrumbsComponent.propTypes = {
  label: PropTypes.string,
  path: PropTypes.string,
  isRequired: PropTypes.bool
};

BreadcrumbsComponent.defaultProps = {
  label: 'Back',
  isRequired: true,
};

export default BreadcrumbsComponent;
