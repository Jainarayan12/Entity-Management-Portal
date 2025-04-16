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
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import approvedLogo from '../../../../../assets/images/approved_logo.svg';

const ApprovedReviewModal = ({ open, onClose, onReview }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box component="img" src={approvedLogo} alt="approved" />

        <Typography variant="h6" component="span" fontSize="16px">
          Changes Submitted for Approval
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ mt: 1, fontSize: '14px' }}>
          Your changes have been successfully submitted and will be reviewed by
          the CorpSec team soon.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'flex-end', pr: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Ok
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={onReview}
          startIcon={<VisibilityIcon />}
          sx={{ textTransform: 'capitalize' }}
        >
          Review Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ApprovedReviewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReview: PropTypes.func.isRequired,
};

export default ApprovedReviewModal;
