import PropTypes from 'prop-types';
import { TextField, Typography } from '@mui/material';

import React from 'react';

const TextFieldComponent = ({
  label,
  value,
  onChange,
  placeholder,
  disabled,
  labelName,
  isRequired,
  multiline,
  rows
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
        {labelName}
        {isRequired && <span style={{ color: 'red' }}>*</span>}
      </Typography>
      <TextField
        fullWidth
        size="small"
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        multiline={multiline}
        rows={rows}
        sx={{
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
          },
        }}
      />
    </>
  );
};

TextFieldComponent.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  labelName: PropTypes.string,
  isRequired: PropTypes.bool,
  multiline:PropTypes.bool,
  rows:PropTypes.number
};

TextFieldComponent.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  multiline:false,
  rows:1,
};

export default React.memo(TextFieldComponent);
