import PropTypes from 'prop-types';
import { FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const CheckboxField = ({ label, checked, onChange, disabled }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            sx={{
              color: '#FF7000',
              '&.Mui-checked': {
                color: '#FF7000',
              },
            }}
          />
        }
        label={label}
        sx={{
          '.MuiFormControlLabel-label': { fontSize:"14px" },
        }}
      />
    </FormGroup>
  );
};

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

CheckboxField.defaultProps = {
  checked: false,
  disabled: false,
};

export default CheckboxField;
