import PropTypes from 'prop-types';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';

const Dropdown = React.memo(
  ({
    label,
    options,
    value,
    onChange,
    placeholder,
    labelKey,
    valueKey,
    showClearIcon,
    disabled,
    labelName,
    isRequired,
  }) => {
    const handleClear = () => {
      onChange({ target: { value: '' } });
    };
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
        <FormControl
          fullWidth
          size="small"
          sx={{
            letterSpacing: '0.1px',
            background: '#fff',
            '& .MuiInputLabel-root': {
              fontSize: '14px',
            },
            ' & .MuiInputBase-input.MuiOutlinedInput-input': {
              paddingRight: '0 !important',
            },
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
        >
          {label && <InputLabel>{label}</InputLabel>}
          <Select
            value={value}
            onChange={onChange}
            label={label}
            displayEmpty
            disabled={disabled}
            sx={{
              background: disabled ? '#E9E9E9' : '',
              '&.Mui-disabled .MuiSelect-select': {
                color: '#2E2D2C',
                WebkitTextFillColor: '#2E2D2C',
              },
            }}
            input={
              <OutlinedInput
                endAdornment={
                  showClearIcon &&
                  value && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClear}
                        edge="end"
                        size="small"
                        sx={{ outline: 'none !important' }}
                      >
                        <ClearIcon
                          sx={{ marginRight: '10px', fontSize: '16px' }}
                        />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              />
            }
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: '#aaa',fontSize:'12px' }}>{placeholder}</span>;
              }
              const selectedOption = options.find(
                (option) => option[valueKey] === selected,
              );
              return selectedOption ? selectedOption[labelKey] : placeholder;
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxWidth: '200px',
                  minWidth: '200px',
                  textOverflow: 'ellipsis',
                },
              },
            }}
          >
            {options?.map((option) => (
              <MenuItem
                key={option?.id}
                value={option[valueKey]}
                sx={{
                  textOverflow: 'ellipsis',
                  width: 'auto',
                  overflow: 'hidden',
                  display: 'block',
                  background: 'none',
                }}
              >
                <Tooltip
                  key={option?.id}
                  title={option[labelKey]}
                  arrow
                  placement="top"
                >
                  {option[labelKey]}
                </Tooltip>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  },
);

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  labelKey: PropTypes.string.isRequired,
  valueKey: PropTypes.any.isRequired,
  showClearIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  labelName: PropTypes.string,
  isRequired: PropTypes.bool,
};

Dropdown.defaultProps = {
  value: '',
  placeholder: 'Select an option',
  showClearIcon: false,
  disabled: false,
};

export default Dropdown;
