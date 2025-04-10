import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateField = ({
  label,
  value,
  onChange,
  disabled,
  labelName,
  isRequired,
}) => {
  return (
    <>
      <Typography
        color={'#2e2d2c'}
        sx={{
          fontSize: '14px',
          lineHeight: '22px',
          letterSpacing: '0.1px',
          marginBottom: '5px',
          fontWeight: '400',
          textTransform: 'capitalize',
        }}
      >
        {labelName} {isRequired && <span style={{ color: 'red' }}>*</span>}
      </Typography>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
            sx: {
              background: disabled ? '#E9E9E9' : '#fff',
              '& .MuiOutlinedInput-root': {
                fontSize: '14px',
                '& fieldset': {
                  borderColor: '#9E9E9E',
                },
                '&:hover fieldset': {
                  borderColor: '#9E9E9E !important',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#9E9E9E',
                },
                outline: 'none !important',
              },
            },
          },
        }}
      />
    </>
  );
};

DateField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  labelName: PropTypes.string,
  isRequired: PropTypes.bool,
};

DateField.defaultProps = {
  value: null,
  disabled: false,
};

export default React.memo(DateField);
