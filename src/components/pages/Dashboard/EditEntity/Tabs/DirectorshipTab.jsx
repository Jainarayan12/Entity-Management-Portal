import {
  Box,
  Tab,
  Tabs,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import ReactDOM from 'react-dom';
import CommentDialog from '../Modal/DirectorshipCommentModal';
import DirectorshipAssignModal from '../Modal/DirectorshipAssignModal';
import assign from '../../../../../assets/images/assign.svg';
import editIcon from '../../../../../assets/images/editIcon.svg';
import historyIcon from '../../../../../assets/images/historyIcon.svg';
import deleteIcon from '../../../../../assets/images/delete.svg';
import commentsIcon from '../../../../../assets/images/comments.svg';
import SearchInput from '../../../../common/SearchInput/SearchInput';
import { useEffect, useState } from 'react';
import useApi from '../../../../../core/api-service/useApi';
import CustomPagination from '../../../../common/Pagination/Pagination';
import HistoryOfDirectorshipModal from '../Modal/DirectorshipHistoryModal';

const tabOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Expired', value: 'expired' },
  { label: 'All', value: 'all' },
];

const dummyData = {
  active: [
    {
      name: 'jai',
      position: 'software',
      appointmentDate: '27/12/2024',
      endDate: '27/12/2024',
    },
  ],
  expired: [],
  all: [
    {
      name: 'narayan ',
      position: 'developer',
      appointmentDate: '1/2/3',
      endDate: '2/2/4',
    },
    {
      name: ' Singh ',
      position: 'jai',
      appointmentDate: '1/2/3',
      endDate: '--',
    },
    {
      name: ' jai',
      position: 'web developer',
      appointmentDate: '2/2/3',
      endDate: '--',
    },
  ],
};

const DirectorshipTab = () => {
  const [tab, setTab] = useState('all');
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { get } = useApi();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('assign');
  const [editData, setEditData] = useState(null);

  const handleAssignClick = () => {
    setModalType('assign');
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (row) => {
    setModalType('edit');
    setEditData(row);
    setIsModalOpen(true);
  };

  const handleSubmit = (formValues) => {
    if (modalType === 'edit') {
      console.log('Edit Submitted:', formValues);
    } else {
      console.log('Assign Submitted:', formValues);
    }
    setIsModalOpen(false);
  };

  const fetchData = async (status, query = '') => {
    try {
      // const res = await get(/api/directorship?status=${status}&search=${query});
      //  // setRows(res.data);
      setRows(
        dummyData[status].filter((row) =>
          row.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    } catch (err) {
      console.error('Fetch error', err);
    }
  };

  useEffect(() => {
    fetchData(tab);
  }, [tab]);

  const handleSearch = (value) => {
    setPage(1);
    setRowsPerPage(10);
    setSearchTerm(value);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) =>
    setRowsPerPage(parseInt(event.target.value, 10));

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Tabs
          value={tab}
          onChange={(e, newTab) => setTab(newTab)}
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{ minHeight: '40px' }}
        >
          {tabOptions.map((opt) => (
            <Tab
              key={opt.value}
              label={opt.label}
              value={opt.value}
              sx={{
                outline: 'none !important',
                textTransform: 'capitalize',
                fontWeight: tab === opt.value ? 600 : 400,
                fontSize: '14px',
                minHeight: '36px',
                height: '36px',
                borderRadius: 0,
                px: 3,
                backgroundColor: tab === opt.value ? '#FF7000' : '#fff',
                color: tab === opt.value ? '#fff !important' : '#222',
                '&:not(:last-of-type)': { borderRight: 'none' },
              }}
            />
          ))}
        </Tabs>
        <Box display="flex" gap={2} alignItems="center">
          <Box
            sx={{
              borderRadius: '4px',
              px: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SearchInput
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              showClearIcon={true}
            />
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FF7000',
              textTransform: 'none',
              fontWeight: 600,
              ml: 1,
              outline: 'none !important',
              '&:hover': { backgroundColor: '#e66500' },
            }}
            startIcon={
              <Box component="img" src={assign} alt="Generate Report" />
            }
            onClick={handleAssignClick}
          >
            Assign New Position
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ background: '#FAFAFA' }}>
            <TableRow>
              {[
                'Name',
                'Position',
                'Appointment Date',
                'End Date',
                'Actions',
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{ fontWeight: '600', border: '1px solid #ccc' }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ border: '1px solid #ccc' }}>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>
                    {row.position}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>
                    {row.appointmentDate}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>
                    {row.endDate}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>
                    <IconButton
                      size="small"
                      onClick={handleEditClick}
                      sx={{ outline: 'none !important' }}
                    >
                      <Box component="img" src={editIcon} alt="Edit" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ outline: 'none !important' }}
                    >
                      <Box component="img" src={deleteIcon} alt="Delete" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ outline: 'none !important' }}
                      onClick={() => {
                        setIsCommentsModalOpen(true);
                      }}
                    >
                      <Box
                        component="img"
                        src={commentsIcon}
                        alt="comment"
                        sx={{ outline: 'none !important' }}
                      />
                    </IconButton>

                    <IconButton
                      size="small"
                      sx={{ outline: 'none !important' }}
                      onClick={() => {
                        setIsHistoryModalOpen(true);
                      }}
                    >
                      <Box component="img" src={historyIcon} alt="History" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        data={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleRowsPerPageChange}
        totalRecords={rows.length}
      />
      {isModalOpen &&
        ReactDOM.createPortal(
          <DirectorshipAssignModal
            open={isModalOpen}
            mode={modalType}
            data={editData}
            onClose={() => {
              setIsModalOpen(false);
            }}
            onSubmit={handleSubmit}
          />,
          document.getElementById('drawer-root'),
        )}
      <HistoryOfDirectorshipModal
        open={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        personName="jai"
      />
      <CommentDialog
        open={isCommentsModalOpen}
        onClose={() => setIsCommentsModalOpen(false)}
      />
    </Box>
  );
};

export default DirectorshipTab;
