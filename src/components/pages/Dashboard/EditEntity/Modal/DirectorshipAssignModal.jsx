import PropTypes from 'prop-types';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from '../../../../common/Date/Date';
import Dropdown from '../../../../common/Dropdown/Dropdown';

const DirectorshipAssignModal = ({
  open,
  onClose,
  mode,
  formData,
  setFormData,
  onSubmit,
}) => {
  
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 400 } }}
      ModalProps={{
        container: document.getElementById('drawer-root'),
        style: { zIndex: 1300 },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        borderBottom="1px solid #eee"
      >
        <Typography fontSize="20px" fontWeight="bold" color="#FF7000">
          {mode === 'edit' ? 'Edit' : 'Assign Board or Secretary'}
        </Typography>
        <IconButton onClick={onClose} sx={{outline:'none'}}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 2 }}>
        <Box mb={2}>
          <DatePicker
            labelName="Event Date"
            isRequired
            value={formData?.eventDate}
            onChange={(val) => handleChange('eventDate', val)}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography fontSize="14px" fontWeight={500}>
            Mandate Holder
          </Typography>
          <RadioGroup
            row
            value={formData?.mandateType}
            onChange={(e) => handleChange('mandateType', e.target.value)}
          >
            <FormControlLabel
              value="user"
              control={
                <Radio
                  size="small"
                  sx={{
                    color: '#878786',
                    '&.Mui-checked': {
                      color: '#FF7000',
                    },
                  }}
                />
              }
              sx={{
                '& .MuiFormControlLabel-label': {
                  color: '#4A4949',
                  fontWeight: 400,
                  fontSize:'12px'
                },
              }}
              label="User"
            />
            <FormControlLabel
              value="legal"
              control={
                <Radio
                  size="small"
                  sx={{
                    color: '#878786',
                    '&.Mui-checked': {
                      color: '#FF7000',
                    },
                  }}
                />
              }
              sx={{
                '& .MuiFormControlLabel-label': {
                  color: '#4A4949',
                  fontWeight: 400,
                  fontSize:'12px'
                },
              }}
              label="Legal name"
            />
          </RadioGroup>
        </Box>

        <Box mb={2}>
          <Dropdown
            labelName=""
            placeholder="Select"
            value={formData?.selectUser}
            onChange={(e) => handleChange('selectUser', e.target.value)}
            options={[
              { label: 'User 1', value: 'user1' },
              { label: 'User 2', value: 'user2' },
            ]}
          />
        </Box>

        <Box mb={2}>
          <DatePicker
            labelName="Appointment Date"
            isRequired
            value={formData?.appointmentDate}
            onChange={(val) => handleChange('appointmentDate', val)}
          />
        </Box>

        <Box mb={2}>
          <Typography fontSize="14px" fontWeight={500} mb={0.5}>
            Legal Name
          </Typography>
          <TextField
            fullWidth
            value={formData?.legalName}
            onChange={(e) => handleChange('legalName', e.target.value)}
            placeholder="Enter  Legal Name"
            size="small"
          />
        </Box>

        <Box mb={2}>
          <Typography fontSize="14px" fontWeight={500} mb={0.5}>
            Position<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            fullWidth
            value={formData?.position}
            onChange={(e) => handleChange('position', e.target.value)}
            placeholder="Enter Position"
            size="small"
          />
        </Box>

        <Box mb={2}>
          <DatePicker
            labelName="End Date"
            isRequired
            value={formData?.endDate}
            onChange={(val) => handleChange('endDate', val)}
          />
        </Box>

        <Box mb={2}>
          <Typography fontSize="14px" fontWeight={500} mb={0.5}>
            Comments<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={formData?.comments}
            onChange={(e) => handleChange('comments', e.target.value)}
            placeholder="Type here..."
          />
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="end"
        gap="20px"
        px={2}
        py={2}
        borderTop="1px solid #eee"
        position="sticky"
        bottom="0"
        bgcolor="#fff"
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            border: 'none',
            background: '#fff',
            color: '#222',
            textTransform: 'capitalize',
            outline:'none !important'
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
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
        >
          {mode === 'edit' ? 'Save' : 'Assign'}
        </Button>
      </Box>
    </Drawer>
  );
};

DirectorshipAssignModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['edit', 'assign']).isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DirectorshipAssignModal;
