import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import historyIcon from '../../../../assets/images/historyIcon.svg';
import reportIcon from '../../../../assets/images/reportIcon_black.svg';
import deleteIcon from '../../../../assets/images/delete.svg';

const labelMap = {
  eventDate: 'Event Date',
  entity: 'Entity',
  documentTitle: 'Document Title',
  documentCategory: 'Document Category',
  documentType: 'Document Type',
  author: 'Author',
  documentStatus: 'Document Status',
  version: 'Version',
  expiryDate: 'Expiry Date',
};

const StaticFieldDisplay = ({ sectionKey, fields }) => {
  const isDocumentSection = sectionKey === 'documents';

  if (isDocumentSection) {
    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {Object.keys(fields[0] || {}).map((key) => (
                <TableCell
                  key={key}
                  sx={{
                    fontWeight: 600,
                    border: '1px solid #ddd',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  {labelMap[key] || key}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontWeight: 600,
                  backgroundColor: '#f9f9f9',
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.keys(row).map((key) => (
                  <TableCell key={key} sx={{ border: '1px solid #ddd' }}>
                    {row[key] || '--'}
                  </TableCell>
                ))}
                <TableCell >
                  <Box display="flex" gap={2}>
                    <IconButton
                      sx={{ padding: '0', outline: 'none !important' }}
                    >
                      <Box
                        component="img"
                        src={reportIcon}
                        alt="Generate Report"
                      />
                    </IconButton>
                    <IconButton
                      sx={{ padding: '0', outline: 'none !important' }}
                    >
                      <Box
                        component="img"
                        src={historyIcon}
                        alt="History icon"
                      />
                    </IconButton>
                    <IconButton
                      sx={{ padding: '0', outline: 'none !important' }}
                    >
                      <Box component="img" src={deleteIcon} alt="Delete Icon" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Grid container spacing={2} mb={3}>
      {fields.map(({ label, value, isRequired }, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Box display="flex" gap="10px" alignItems="flex-start">
            <Typography
              fontSize="14px"
              fontWeight={500}
              color="#777"
              sx={{
                minWidth: '180px',
                maxWidth: '250px',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
            >
              {label}
              {isRequired && (
                <Typography component="span" color="error" ml={0.5}>
                  *
                </Typography>
              )}
            </Typography>
            <Typography
              fontWeight={600}
              fontSize="16px"
              color="#2E2D2C"
              sx={{
                wordBreak: 'break-word',
                flex: 1,
              }}
            >
              {value || '--'}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

StaticFieldDisplay.propTypes = {
  sectionKey: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        isRequired: PropTypes.bool,
      }),
      PropTypes.object,
    ]),
  ).isRequired,
};

export default StaticFieldDisplay;
