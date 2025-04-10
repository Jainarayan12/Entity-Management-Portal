import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import save from '../assets/images/save.svg';
import arrow from '../assets/images/arrow-right.svg';
import arrowLeft from '../assets/images/arrow-left.svg';

const EntityFooter = ({
  tabIndex,
  setTabIndex,
  tabCount,
  onSaveDraft,
  onSubmit,
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderTop: '1px solid #ddd',
        p: 2,
        gap: 2,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          sx={{
            background: '#FFF;',
            textTransform: 'none',
            fontWeight: '600',
            color: '#2E2D2C',
            width: '84px',
            marginLeft: '72px',
            outline: 'none !important',
            '&:hover': {
              background: '#FFF;',
            },
          }}
        >
          Cancel
        </Button>

        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'end',
            width: '100%',
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: '100%',
              maxWidth: '150px',
              backgroundColor: '#FF7000',
              color: '#FFFFFF',
              textTransform: 'none',
              fontWeight: 'bold',
              padding: '6px',
              outline: 'none !important',
              '&:hover': {
                background: '#FF7000',
              },
            }}
            onClick={onSaveDraft}
          >
            Save Draft
            <Box component="img" src={save} alt="Logo" marginLeft="10px" />
          </Button>

          {tabIndex > 0 && (
            <Button
              variant="outlined"
              onClick={() => setTabIndex((prev) => prev - 1)}
              sx={{
                maxWidth: '100px',
                color: '#2E2D2C',
                fontWeight: 'bold',
                padding: '6px 12px',
                border: '1px solid #2E2D2C',
                textTransform: 'none',
                outline: 'none !important',
              }}
            >
              <Box component="img" src={arrowLeft} alt="next" mr={1} />
              Back
            </Button>
          )}

          {tabIndex < tabCount - 1 && (
            <Button
              variant="outlined"
              onClick={() => setTabIndex((prev) => prev + 1)}
              sx={{
                maxWidth: '100px',
                color: '#2E2D2C',
                fontWeight: 'bold',
                padding: '6px 12px',
                border: '1px solid #2E2D2C',
                textTransform: 'none',
                outline: 'none !important',
              }}
            >
              Next
              <Box component="img" src={arrow} alt="next" ml={1} />
            </Button>
          )}
          {tabIndex == 4 && (
            <Button
              variant="contained"
              sx={{
                width: '100%',
                maxWidth: '150px',
                backgroundColor: '#FF7000',
                color: '#FFFFFF',
                textTransform: 'none',
                fontWeight: 'bold',
                padding: '6px',
                outline: 'none !important',
                '&:hover': {
                  background: '#FF7000',
                },
              }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

EntityFooter.propTypes = {
  tabIndex: PropTypes.number.isRequired,
  setTabIndex: PropTypes.func.isRequired,
  tabCount: PropTypes.number.isRequired,
  onSaveDraft: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EntityFooter;
