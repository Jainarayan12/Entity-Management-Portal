import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';

const CustomPagination = ({
  page,
  rowsPerPage,
  onRowsPerPageChange,
  onPageChange,
  totalRecords,
  startIndex,
  endIndex,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            lineHeight: '20px',
            letterSpacing: '0.4px',
            fontSize: '12px',
          }}
        >
          Rows per page:
        </Typography>
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
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiSelect-icon.MuiSelect-iconOutlined': {
              right: '-5px',
            },
          }}
        >
          {[10, 20, 50].map((rows) => (
            <MenuItem key={rows} value={rows} sx={{ textAlign: 'center' }}>
              {rows}
            </MenuItem>
          ))}
        </Select>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            lineHeight: '20px',
            letterSpacing: '0.4px',
            fontSize: '12px',
          }}
        >
          {startIndex}-{endIndex} of {totalRecords}
        </Typography>
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
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;