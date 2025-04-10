import PropTypes from 'prop-types';
import { CircularProgress, Box } from '@mui/material';

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
            zIndex: 1000 ,
          }}
        >
          <CircularProgress size={35} />
        </Box>
      )}
    </>
  );
};

Loader.propTypes={
  isLoading:PropTypes.bool.isRequired
}

export default Loader;