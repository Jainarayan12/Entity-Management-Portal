import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
} from '@mui/material';
import ReactDOM from 'react-dom';
import CustomPagination from '../../common/Pagination/Pagination';
import SearchInput from '../../common/SearchInput/SearchInput';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '../../../assets/images/delete.svg';
import ScopeIcon from '../../../assets/images/scope.svg';
import Active from '../../../assets/images/active.svg';
import Draft from '../../../assets/images/draft.svg';
import Dissolved from '../../../assets/images/dissolved.svg';
import Deregistered from '../../../assets/images/deregistered.svg';
import Sold from '../../../assets/images/sold.svg';
import EntityProfileIcon from '../../../assets/images/profile.svg';
import ShareholdingIcon from '../../../assets/images/shareholding.svg';
import ManageColumn from '../../../assets/images/managecolumn.svg';
import { useEffect, useState } from 'react';
import ManageGridPreferences from './MangeGridPreference';

const entityData = [
  {
    name: 'Jai',
    zone: 'iNDIA',
    country: 'iNDIA',
    companyType: 'jai',
    nature: 'jai',
    category: 'jai',
    group: 'jai',
    status: 'Active',
  },
  {
    name: 'NARAYAN',
    zone: 'iNDIA',
    country: 'iNDIA',
    companyType: 'jai',
    nature: 'jai',
    category: 'jai',
    group: 'jai',
    status: 'Draft',
  },
];

const statusStyles = {
  Active: { bg: '#D0F4DE', color: '#2E2D2C', dot: Active },
  Draft: { bg: '#FFFDE7', color: '#2E2D2C', dot: Draft },
  Dormant: { bg: '#E3F2FD', color: '#2E2D2C', dot: Active },
  Dissolved: { bg: '#FFEBEE', color: '#2E2D2C', dot: Dissolved },
  Sold: { bg: '#FCE4EC', color: '#2E2D2C', dot: Sold },
  Deregistered: { bg: '#E9E9E9', color: '#2E2D2C', dot: Deregistered },
};

const allColumns = [
  { key: 'name', label: 'Name' },
  { key: 'zone', label: 'Geographical Zone' },
  { key: 'country', label: 'Country' },
  { key: 'companyType', label: 'Company Type' },
  { key: 'nature', label: 'Nature' },
  { key: 'category', label: 'Category' },
  { key: 'group', label: 'Operating Group' },
  { key: 'status', label: 'Status' },
  { key: 'scope', label: 'Scope' },
  { key: 'profile', label: 'Entity Full Profile' },
  { key: 'shareholding', label: 'Shareholding' },
  { key: 'action', label: 'Action' },
];

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [columns, setColumns] = useState(allColumns); 
  const [selectedColumns, setSelectedColumns] = useState(columns.map(col => col.key));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleColumnChange = (key) => {
    setSelectedColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };


  const handleDragEnd = (result) => {
    console.log("result",result)
    const { source, destination } = result;
    if (!destination) return;
  
    const reorderedColumns = Array.from(columns);
    const [removed] = reorderedColumns.splice(source.index, 1);
    reorderedColumns.splice(destination.index, 0, removed);
  
    setColumns(reorderedColumns);
  };

  const columnsToDisplay = allColumns.filter((col) =>
    selectedColumns.includes(col.key),
  );

  useEffect(() => {
    const newStart = (page - 1) * rowsPerPage + 1;
    const newEnd = Math.min(page * rowsPerPage, 10);
    setStartIndex(newStart);
    setEndIndex(newEnd);
  }, [page, rowsPerPage, entityData.totalRecordCount]);

  const handleSearch = (value) => {
    setPage(1);
    setRowsPerPage(10);
    setSearchTerm(value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const renderCellValue = (row, key) => {
    if (key === 'status') {
      const status = row[key];
      const style = statusStyles[status] || {};

      return (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.5,
            py: 0.5,
            borderRadius: '16px',
            backgroundColor: style.bg,
            color: style.color,
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: '18px',
            width: 'fit-content',
          }}
        >
          <Box
            component="img"
            src={style.dot}
            alt="scope"
            sx={{ width: 24, height: 24 }}
          />
          {status}
        </Box>
      );
    } else if (key === 'scope') {
      return (
        <Box
          component="img"
          src={ScopeIcon}
          alt="scope"
          sx={{ width: 24, height: 24 }}
        />
      );
    } else if (key === 'profile') {
      return (
        <Box
          component="img"
          src={EntityProfileIcon}
          alt="profile"
          sx={{ width: 24, height: 24 }}
        />
      );
    } else if (key === 'shareholding') {
      return (
        <Box
          component="img"
          src={ShareholdingIcon}
          alt="shareholding"
          sx={{ width: 24, height: 24 }}
        />
      );
    } else if (key === 'action') {
      return (
        <Box
          component="img"
          src={DeleteIcon}
          alt="shareholding"
          sx={{ width: 24, height: 24 }}
        />
      );
    } else {
      return (
        <Tooltip title={row[key] || ''} placement="top">
          <Box
            sx={{
              maxWidth: 160,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {row[key] || '-'}
          </Box>
        </Tooltip>
      );
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight={600} mr={2}>
          Entity List
        </Typography>
        <Box display="flex" gap="16px" alignItems="center">
          <SearchInput
            placeholder="Search entity"
            value={searchTerm}
            showClearIcon={true}
            onChange={handleSearch}
          />
          <Box
            sx={{
              width: '1px',
              height: '35px',
              backgroundColor: '#999999',
              marginRight: '5px',
            }}
          ></Box>
          <Box
            component="img"
            src={ManageColumn}
            alt="Manage Column"
            sx={{ width: '24px', height: '24px', cursor: 'pointer' }}
            onClick={() => setIsDrawerOpen(true)}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#FF7000',
              textTransform: 'none',
              width: '100%',
            }}
          >
            Create New Entity
          </Button>
        </Box>
        {isDrawerOpen &&
         ReactDOM.createPortal(
            <ManageGridPreferences
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              columns={columns}
              selectedColumns={selectedColumns}
              onColumnChange={handleColumnChange}
              onDragEnd={handleDragEnd}
            />,
            document.getElementById('drawer-root'),
          )}
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: 4,
          },
        }}
      >
        <Table size="small">
          <Table size="small" stickyHeader sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                {columnsToDisplay.map((col, index) => (
                  <TableCell
                    key={col.key}
                    align="center"
                    sx={{
                      fontWeight: 600,
                      textAlign: 'center',
                      color: '#2E2D2C',
                      borderRight:
                        index !== columnsToDisplay.length - 1
                          ? '1px solid #E9E9E9'
                          : 'none',
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {entityData.map((row, index) => (
                <TableRow key={index}>
                  {columnsToDisplay.map((col, index) => (
                    <TableCell
                      key={col.key}
                      sx={{
                        maxWidth: 160,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'center',
                        color: '#2E2D2C',
                        verticalAlign: 'middle',
                        borderRight:
                          index !== columnsToDisplay.length - 1
                            ? '1px solid #E9E9E9'
                            : 'none',
                      }}
                    >
                      {renderCellValue(row, col.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Table>
      </TableContainer>

      {entityData && entityData.length > 0 && (
        <CustomPagination
          count={entityData?.totalRecordCount}
          page={page}
          rowsPerPage={rowsPerPage}
          totalRecords={10}
          startIndex={startIndex}
          endIndex={endIndex}
          onRowsPerPageChange={handleRowsPerPageChange}
          onPageChange={handleChangePage}
        />
      )}
    </Box>
  );
};
export default Dashboard;
