import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import rejected from '../../../assets/images/rejected_logo.svg';

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  note,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box component="img" src={rejected} alt="rejected" />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small" outline="none !important">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ fontSize: '14px', color: '#2E2D2C' }}>
          {description}
        </Typography>
        {note && (
          <Box mt={2}>
            <Typography
              variant="body2"
              sx={{ fontSize: '14px', color: '#2E2D2C' }}
            >
              {note}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: 'capitalize',
            minWidth: 100,
            color: '#2E2D2C',
            border: '1px solid #2E2D2C',
            fontWeight: '600',
          }}
        >
          {cancelText }
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="warning"
          sx={{ textTransform: 'capitalize', minWidth: 140, fontWeight: '600' }}
        >
          {confirmText }
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  note: PropTypes.string,
};

export default ConfirmDialog;
