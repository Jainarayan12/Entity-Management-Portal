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
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

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
        <WarningAmberRoundedIcon sx={{ color: '#FF7000' }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title || 'Confirm Deletion'}
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
              sx={{ fontSize: '12px', fontStyle: 'italic', color: '#6A6A6A' }}
            >
              <strong>Note:</strong> {note}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ textTransform: 'capitalize', minWidth: 100 }}
        >
          {cancelText || 'Cancel'}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="warning"
          sx={{ textTransform: 'capitalize', minWidth: 140 }}
        >
          {confirmText || 'Delete Entity'}
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
