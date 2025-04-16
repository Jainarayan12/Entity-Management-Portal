import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import sentBack from '../../../../assets/images/sentBack.svg';
import greenDot from '../../../../assets/images/greenDot.svg';
import eyeIcon from '../../../../assets/images/eye.svg';
import back from '../../../../assets/images/arrow-left.svg';
import { useNavigate } from 'react-router-dom';

const dummyData = [
  {
    fieldName: 'Business Unit',
    current: 'Agri-Products',
    new: 'Food Ingredient',
    submittedBy: 'Ananth R',
    status: 'Approved',
    originRemarks: 'Subject to seasonal availability',
    corpsecRemarks:
      'Request has been reviewed and approved. No further action required.',
  },
  {
    fieldName: 'Sub Business Unit',
    current: 'Rice',
    new: 'Spices',
    submittedBy: 'Ananth R',
    status: 'Approved',
    originRemarks: 'Subject to seasonal availability',
    corpsecRemarks: '',
  },
  {
    fieldName: 'Executive In Charge',
    current: 'John Doe',
    new: 'David Wong',
    submittedBy: 'Ananth R',
    status: 'Sent back',
    originRemarks: 'Updated due to internal restructuring',
    corpsecRemarks:
      'Supporting documents required for approval of the new appointment.',
  },
  {
    fieldName: 'Contact Person',
    current: 'Sarah Lee',
    new: 'Lisa Carter',
    submittedBy: 'Ananth R',
    status: 'Approved',
    originRemarks: 'Updated to reflect the latest point of contact',
    corpsecRemarks: '',
  },
  {
    fieldName: 'Financial Controller',
    current: 'Michael Tan',
    new: 'Robert Singh',
    submittedBy: 'Ananth R',
    status: 'Approved',
    originRemarks: 'New appointment following organizational change',
    corpsecRemarks: '',
  },
];

const tabOptions = [
  { label: 'ALL', value: 'All' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Sent Back', value: 'Sent back' },
];

export default function ViewRequestStatus() {
  const [tab, setTab] = useState('All');
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const fetchData = (status) => {
    let filtered = [...dummyData];
    if (status !== 'All') {
      filtered = filtered.filter((row) => row.status === status);
    }
    setRows(filtered);
  };

  useEffect(() => {
    fetchData(tab);
  }, [tab]);

  const commonCellStyle = {
    border: '1px solid #ccc',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  };

  return (
    <Container maxWidth="xl" sx={{ overflow: 'auto', height: '100vh' }}>
      <Box mt={4} mb={2}>
        <Typography variant="h6" fontWeight={600}>
          jai
        </Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          View Request Status
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Tabs
            value={tab}
            onChange={(e, newTab) => setTab(newTab)}
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{ minHeight: 40 }}
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
                }}
              />
            ))}
          </Tabs>
          <Button
            sx={{
              height: 36,
              border: '1px solid #2E2D2C',
              gap: '5px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#2E2D2C',
              outline: 'none !important',
              '&:hover': {
                border: '1px solid #2E2D2C',
              },
            }}
            onClick={()=>{navigate('/view-request')}}
          >
            <Box component="img" src={eyeIcon} alt="Approved"  /> View
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead backgroundColor="#F8F9FA">
            <TableRow>
              <TableCell
                sx={{
                  ...commonCellStyle,
                }}
              >
                Fields Name
              </TableCell>
              <TableCell
                sx={{
                  ...commonCellStyle,
                }}
              >
                Current
              </TableCell>
              <TableCell
                sx={{
                  ...commonCellStyle,
                }}
              >
                New
              </TableCell>
              <TableCell
                sx={{
                  ...commonCellStyle,
                }}
              >
                Submitted By
              </TableCell>
              <TableCell
                sx={{
                  ...commonCellStyle,
                }}
              >
                Reviewed By
              </TableCell>
              <TableCell
                sx={{
                  ...commonCellStyle,
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  ...commonCellStyle,
                }}
              >
                Origin Remarks
              </TableCell>
              <TableCell
                sx={{
                  ...commonCellStyle,
                }}
              >
                Corpsec Remarks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx} whiteSpace="nowrap">
                <TableCell
                  sx={{ border: '1px solid #ccc', whiteSpace: 'nowrap' }}
                >
                  {row.fieldName}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>
                  {row.current}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>
                  {row.new}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>
                  {row.submittedBy}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>--</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>
                  <Box
                    borderRadius="20px"
                    padding="5px"
                    backgroundColor={
                      row?.status === 'Approved' ? '#D0F4DE' : '#FFF3E0'
                    }
                  >
                    {row?.status === 'Approved' ? (
                      <Box display="flex" gap="5px" whiteSpace="nowrap">
                        <Box component="img" src={greenDot} alt="Approved" />
                        Approved
                      </Box>
                    ) : (
                      <Box display="flex" gap="5px" whiteSpace="nowrap">
                        <Box component="img" src={sentBack} alt="Sent Back" />
                        Sent Back
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>
                  {row.originRemarks || '--'}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>
                  {row.corpsecRemarks || '--'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#fff',
          borderTop: '1px solid #ddd',
          py: 2,
          px: 4,
          zIndex: 1200,
        }}
      >
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Button
              variant="text"
              color="inherit"
              sx={{ textTransform: 'capitalize', outline: 'none !important' }}
              onClick={() => {
                navigate('/edit-entity');
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item display="flex" gap="25px">
            <Box
              display="flex"
              alignItems="center"
              gap="5px"
              padding="0 10px"
              border="1px solid #2E2D2C"
              onClick={() => {
                navigate('/edit-entity');
              }}
            >
              <Box
                component="img"
                src={back}
                alt="pdf"
                marginLeft="10px"
                width="15px"
                height="15px"
                sx={{ cursor: 'pointer' }}
              />
              Back
            </Box>
            <Button
              sx={{
                textTransform: 'capitalize',
                background: '#FF7000',
                color: '#FFf',
                outline: 'none !important',
                '&:hover': {
                  background: '#FF7000',
                },
              }}
              onClick={() => {
                navigate('/entity-details');
              }}
            >
              Modify & Resubmit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
