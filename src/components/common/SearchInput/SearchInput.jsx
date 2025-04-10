import PropTypes from 'prop-types';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchInput = ({ placeholder, value, onChange, showClearIcon }) => {
  const handleInputChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <TextField
      placeholder={placeholder}
      value={value || ''}
      onChange={handleInputChange}
      variant="outlined"
      size="small"
      fullWidth
      InputProps={{
        endAdornment: (
          <>
            {showClearIcon && value && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClear}
                  edge="end"
                  size="small"
                  sx={{ outline: 'none !important' }}
                >
                  <ClearIcon sx={{ fontSize: '16px' }} />
                </IconButton>
              </InputAdornment>
            )}
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          </>
        ),
      }}
      sx={{
        minWidth: '240px',
        '& .MuiInputBase-root': {
          fontSize: '14px',
          letterSpacing: '0.25px',
          lineHeight: '20px',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#9E9E9E',
          },
          '&:hover fieldset': {
            borderColor: '#9E9E9E',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#9E9E9E',
          },
        },
        '& .MuiInputBase-input::placeholder': {
          fontSize: '12px',
          color: '#222222',
          fontWeight: '600',
        },
      }}
    />
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  showClearIcon: PropTypes.bool,
};

SearchInput.defaultProps = {
  value: '',
  showClearIcon: false,
};

export default SearchInput;
