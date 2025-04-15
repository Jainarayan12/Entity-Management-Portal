import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchInput from '../../../../common/SearchInput/SearchInput';
import Date from '../../../../common/Date/Date';
import Dropdown from '../../../../common/Dropdown/Dropdown';
import filter from '../../../../../assets/images/filter.svg';
import filterActive from '../../../../../assets/images/filteractive.svg';

const dummyData = [
  {
    modifiedDate: '1/1/200',
    changeType: 'jai',
    modifiedBy: 'jai',
    currentValue: 'Active',
    status: 'Approved',
  },
  {
    modifiedDate: '1/3/200',
    changeType: 'jai',
    modifiedBy: 'jai',
    currentValue: 'Active',
    status: 'Pending',
  },
  {
    modifiedDate: '1/2/200',
    changeType: 'jai',
    modifiedBy: 'jai',
    currentValue: 'Active',
    status: 'Draft',
  },
  {
    modifiedDate: '1/1/200',
    changeType: 'jai',
    modifiedBy: 'jai',
    currentValue: 'Active',
    status: 'Approved',
  },
  {
    modifiedDate: '1/1/200',
    changeType: 'jai',
    modifiedBy: 'jai',
    currentValue: 'Active',
    status: 'Approved',
  },
  {
    modifiedDate: '1/3/200',
    changeType: 'jai',
    modifiedBy: 'jai',
    currentValue: 'Active',
    status: 'Pending',
  },
  {
    modifiedDate: '1/2/200',
    changeType: 'jai',
    modifiedBy: 'jai',
    currentValue: 'Active',
    status: 'Draft',
  },
  {
    modifiedDate: '1/3/200',
    changeType: 'jai',
    modifiedBy: 'jai',
    currentValue: 'Active',
    status: 'Pending',
  },
  {
    modifiedDate: '1/2/200',
    changeType: 'jai',
    modifiedBy: 'jai',
    currentValue: 'Active',
    status: 'Draft',
  },
];

const statusColors = {
  Approved: '#D0F4DE',
  Pending: '#FFF9C4',
  Draft: '#EEE',
};

const DirectorshipHistoryModal = ({ open, onClose }) => {
  const [filteredData, setFilteredData] = useState(dummyData);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');
  const [dateRange, setDateRange] = useState(null);

  const handleFilter = () => {
    const filtered = dummyData.filter((item) => {
      const matchSearch = item.modifiedBy
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchPosition = position ? item.currentValue === position : true;

      const matchStatus = status
        ? item.status.toLowerCase() === status.toLowerCase()
        : true;

      return matchSearch && matchPosition && matchStatus;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [search, position, status, dateRange]);

  useEffect(() => {
    if (open) {
      setFilteredData(dummyData);
    }
  }, [open]);

  const handleClose = () => {
    setSearch('');
    setPosition('');
    setStatus('');
    setShowFilters(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#FF7000',
          fontWeight: 600,
        }}
      >
        History of Directorship
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />

      <DialogContent>
        <Box px={1} pt={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            flexWrap="wrap"
          >
            <Typography fontWeight={600} fontSize="16px">
              jai
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <SearchInput
                placeholder="Search "
                value={search}
                showClearIcon={true}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Box backgroundColor={showFilters ? '#FF7000' : '#fff'}>
                <IconButton
                  onClick={() => setShowFilters(!showFilters)}
                  sx={{ outline: 'none !important' }}
                >
                  <Box
                    component="img"
                    src={showFilters ? filterActive : filter}
                    alt="filter"
                    sx={{ width: 24, height: 24 }}
                  ></Box>
                </IconButton>
              </Box>
            </Box>
          </Box>

          {showFilters && (
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={4}>
                <Typography fontSize="14px" fontWeight={500} mb={0.5}>
                  Select Position<span style={{ color: 'red' }}>*</span>
                </Typography>
                <Dropdown
                  labelName=""
                  placeholder="Select Position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  labelKey="label"
                  valueKey="value"
                  showClearIcon={true}
                  options={[
                    { label: 'Jai', value: 'user1' },
                    { label: 'Singh', value: 'user2' },
                    { label: 'Narayan', value: 'user2' },
                  ]}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Date
                  labelName="Date Range"
                  isRequired
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography fontSize="14px" fontWeight={500} mb={0.5}>
                  Select Status<span style={{ color: 'red' }}>*</span>
                </Typography>
                <Dropdown
                  labelName=""
                  placeholder="Select Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  labelKey="label"
                  valueKey="value"
                  showClearIcon={true}
                  options={[
                    { label: 'Approved', value: 'user1' },
                    { label: 'Pending', value: 'user2' },
                    { label: 'Draft', value: 'user2' },
                  ]}
                />
              </Grid>
            </Grid>
          )}

          <Table>
            <TableHead>
              <TableRow>
                {[
                  'Modified Date',
                  'Change Type',
                  'Modified By',
                  'Current Value',
                  'Status',
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: 'bold',
                      color: '#555',
                      background: '#FAFAFA',
                      border: '1px solid #ddd',
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{}}>
              {filteredData?.length > 0 ? (
                filteredData?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ border: '1px solid #ddd' }}>
                      {row.modifiedDate}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #ddd' }}>
                      {row.changeType}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #ddd' }}>
                      {row.modifiedBy}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #ddd' }}>
                      {row.currentValue}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #ddd' }}>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          backgroundColor: statusColors[row.status] || '#eee',
                          fontSize: '12px',
                          display: 'inline-block',
                          fontWeight: 600,
                        }}
                      >
                        {/* <Box
                                    component="img"
                                    src={row.dot}
                                    alt="scope"
                                    sx={{ width: 24, height: 24 }}
                                  /> */}
                        {row.status}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No history found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

DirectorshipHistoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DirectorshipHistoryModal;
