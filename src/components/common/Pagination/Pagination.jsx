import PropTypes from 'prop-types';
import { Box, Select, MenuItem, Typography, Pagination } from '@mui/material';

const CustomPagination = ({
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalRecords,
  label = 'Rows Per Page',
}) => {
  if (!data || data.length === 0) return null;

  const startIndex = (page - 1) * rowsPerPage + 1;
  const endIndex = Math.min(page * rowsPerPage, totalRecords);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      {' '}
      <Box display="flex" alignItems="center">
        {' '}
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            lineHeight: '20px',
            letterSpacing: '0.4px',
            fontSize: '12px',
          }}
        >
          {' '}
          {label}:{' '}
        </Typography>{' '}
        <Select
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
          sx={{
            width: '60px',
            textAlign: 'center',
            height: '1px',
            padding: 0,
            margin: '10px',
            outline: 'none !important',
            '& .MuiOutlinedInput-input ': {
              padding: '0px',
              paddingRight: '5px !important',
              borderBottom: '1.4px solid #0000006B',
              borderRadius: '0px',
              textAlign: 'center',
            },
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiSelect-icon.MuiSelect-iconOutlined': { right: '-5px' },
          }}
        >
          {' '}
          {[10, 20, 50].map((rows) => (
            <MenuItem key={rows} value={rows} sx={{ textAlign: 'center' }}>
              {' '}
              {rows}{' '}
            </MenuItem>
          ))}{' '}
        </Select>{' '}
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            lineHeight: '20px',
            letterSpacing: '0.4px',
            fontSize: '12px',
          }}
        >
          {' '}
          {startIndex}-{endIndex} of {totalRecords}{' '}
        </Typography>{' '}
      </Box>
      <Pagination
        count={Math.ceil(totalRecords / rowsPerPage)}
        page={page}
        onChange={onPageChange}
        color="primary"
        sx={{
          '& .Mui-selected.MuiPaginationItem-page ': {
            backgroundColor: '#FF7000',
            outline: 'none !important',
          },
          '& .Mui-selected.MuiPaginationItem-page:hover': {
            backgroundColor: '#FF7000',
            outline: 'none !important',
          },
        }}
      />
    </Box>
  );
};

CustomPagination.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  totalRecords: PropTypes.number.isRequired,
  label: PropTypes.string,
};

export default CustomPagination;
