import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import commentsIcon from '../../../../../assets/images/comments-icon.svg';
import Excel from '../../../../../assets/images/excel.png';
import PropTypes from 'prop-types';
import useApi from '../../../../../core/api-service/useApi';

const CommentDialog = ({ open, onClose }) => {
  const { get } = useApi();

  const handleConfirm = async () => {
    try {
      // const res = await get(/api/directorship?status=${status}&search=${query});
      //  // setRows(res.data);
     onClose();
    } catch (err) {
      console.error('Fetch error', err);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          width: 500,
          height: 'auto',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              backgroundColor: '#FF7000',
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
              color: '#fff',
            }}
          >
            <Box
              component="img"
              src={commentsIcon}
              alt=" commentsIcon"
              sx={{ width: 24, height: 24 }}
            ></Box>
          </Box>

          <Box />
          <Typography variant="h6">Comment</Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography
          pb="5px"
          sx={{
            color: '#101828',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '28px',
          }}
        >
          Please add a comment here
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter Comments.."
          multiline
          rows={2}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Paper
          elevation={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1,
            mb: 2,
            boxShadow: 'none',
          }}
        >
          <Box
            component="img"
            src={Excel}
            alt=" excel_icon"
            sx={{ width: 24, height: 24, mr: 2 }}
          ></Box>
          <Box>
            <Typography variant="body2">jai.xls</Typography>
            <Typography variant="caption" color="text.secondary">
              1MB
            </Typography>
          </Box>
        </Paper>

        <Box
          sx={{
            backgroundColor: '#FFF3E0',
            padding: 2,
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: '14px', fontWeight: '400' }}
          >
            Everything is up to date, and no additional steps are required from
            your end.
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            fullWidth
            sx={{
              mr: 1,
              color: '#2E2D2C',
              fontWeight: 600,
              border: '1px solid #2E2D2C',
              boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
              outline: 'none !important',
            }}
            onClick={onClose}
          >
            No Action Required
          </Button>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            sx={{
              ml: 1,
              textTransform: 'capitalize',
              outline: 'none !important',
            }}
            onClick={handleConfirm}
          >
            Confirmed & Closed
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

CommentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentDialog;
