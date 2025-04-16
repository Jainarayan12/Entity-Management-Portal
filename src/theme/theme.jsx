import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1E6091',
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          outline: 'none !important',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          outline: 'none !important',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            fontSize: '12px',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2E2D2C',
            borderWidth: '1px',
          },
          input: {
            '&::placeholder': {
              fontSize: '12px',
            },
          },
        },
      },
    },
  },
});

export default theme;
