import PropTypes from 'prop-types';
import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  icon,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          boxShadow: 'none',
          border: '1px solid #999999',
          width: '550px',
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          position: 'relative',
        },
        '& .MuiDialog-container.MuiDialog-scrollPaper': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        boxShadow: 'none !important',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <IconButton onClick={onClose} sx={{ outline: 'none !important' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ padding: '10px 20px' }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={2}
        >
          {icon && (
            <Box
              component="img"
              src={icon}
              alt="Icon"
              sx={{ width: '48px', height: '48px' }}
            />
          )}
          <Typography
            variant="body1"
            textAlign="center"
            fontWeight="400"
            sx={{ color: '#333' }}
          >
            {message}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', padding: '16px 20px',mb:2 }}>
        <Button
          variant="outlined"
          color="warning"
          onClick={onClose}
          sx={{ textTransform: 'none', marginRight: '16px', flex: 1 }}
        >
          {cancelButtonText}
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            textTransform: 'none',
            backgroundColor: '#FF7000',
            color: '#fff',
            flex: 1,
            outline:'none !important',
            '&:hover': {
              backgroundColor: '#FF7000',
            },
          }}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  icon: PropTypes.string,
};

ConfirmationModal.defaultProps = {
  title: '',
  message: 'Are you sure you want to proceed?',
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel',
  icon: null,
};

export default ConfirmationModal;
