import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import greenDot from '../../../../assets/images/greenDot.svg';

const commonCellStyle = {
  border: '1px solid #ccc',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  backgroundColor:'#F8F9FA'
};

const dummyData = [
  {
    fieldName: 'Business Unit',
    current: 'Agri-Products',
    new: 'Food Ingredients',
    submittedBy: 'Ananth R',
    reviewedBy: '--',
    status: 'Approved',
    originRemarks: 'Subject to seasonal availability.',
    corpsecRemarks:
      'Request has been reviewed and approved. No further action required.',
  },
  {
    fieldName: 'Sub Business Unit',
    current: 'Rice',
    new: 'Spices',
    submittedBy: 'Ananth R',
    reviewedBy: '--',
    status: 'Approved',
    originRemarks: 'Subject to seasonal availability.',
    corpsecRemarks: '--',
  },
  {
    fieldName: 'Executive In Charge',
    current: 'John Doe',
    new: 'David Wong',
    submittedBy: 'Ananth R',
    reviewedBy: '--',
    status: 'Approved',
    originRemarks: 'Updated due to internal restructuring',
    corpsecRemarks:
      'Supporting documents required for approval of the new appointment.',
  },
  {
    fieldName: 'Contact Person',
    current: 'Sarah Lee',
    new: 'Lisa Carter',
    submittedBy: 'Ananth R',
    reviewedBy: '--',
    status: 'Approved',
    originRemarks: 'Updated to reflect the latest point of contact.',
    corpsecRemarks: '--',
  },
  {
    fieldName: 'Financial Controller',
    current: 'Michael Tan',
    new: 'Robert Singh',
    submittedBy: 'Ananth R',
    reviewedBy: '--',
    status: 'Approved',
    originRemarks: 'New appointment following organizational change',
    corpsecRemarks: '--',
  },
];

export default function ViewRequest() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setRows(dummyData);
    }, 500);
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4, position: 'relative', minHeight: '100vh' }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        View Requests
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: '70vh',
          overflowY: 'auto',
          border: '1px solid #ccc',
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
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
          <TableBody sx={{ backgroundColor: '#EEE' }}>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid #ccc' }}>
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
                  <TableCell sx={{ border: '1px solid #ccc' }}>
                    {row.reviewedBy}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>
                    <Box
                      borderRadius="20px"
                      padding="5px"
                      backgroundColor={
                        row?.status === 'Approved' ? '#D0F4DE' : '#FFF3E0'
                      }
                    >
                      {row?.status === 'Approved' && (
                        <Box display="flex" gap="5px" whiteSpace="nowrap">
                          <Box component="img" src={greenDot} alt="Approved" />
                          Approved
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Ok button pinned bottom right */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 24,
          zIndex: 1200,
        }}
      >
        <Button variant="contained" color="warning">
          Ok
        </Button>
      </Box>
    </Container>
  );
}
