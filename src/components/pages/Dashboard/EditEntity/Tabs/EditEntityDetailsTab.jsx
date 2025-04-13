import { Box, Typography, IconButton, Button, Divider } from '@mui/material';
// import EntitySubTabs from './EntitySubTabs';
import PropTypes from 'prop-types';
import editIcon from '../../../../../assets/images/editIcon.svg';
import historyIcon from '../../../../../assets/images/historyIcon.svg';
import viewLogIcon from '../../../../../assets/images/viewLogIcon.svg';
import reportIcon from '../../../../../assets/images/reportIcon.svg';
import EntityDetailsSubtabs from '../EntityDetailsSubtabs';
import { useState } from 'react';

const EditEntityDetailsTab = ({ data }) => {
  const [activeSubTab, setActiveSubTab] = useState(0);
  const entityInfo = data?.entityDetails?.entityDetails || {};
  const locationInfo = data?.entityDetails?.location || {};

  const entityDetailsFields = [
    { label: 'Entity Id', value: entityInfo.entityId, isRequired: true },
    { label: 'Legal Name', value: entityInfo.legalName, isRequired: true },
    { label: 'Company Type', value: entityInfo.companyType, isRequired: true },
  ];

  const fields=[
    {
      eventDate: '28/02/2021',
      entity: 'jai',
      documentTitle: 'jai',
      documentCategory: 'jai',
      documentType: 'jai',
      author: 'jai',
      documentStatus: 'Approved',
      version: '1.2',
      expiryDate: '01/02/222',
    },
    {
        eventDate: '28/02/2021',
        entity: 'jai',
        documentTitle: 'jai',
        documentCategory: 'jai',
        documentType: 'jai',
        author: 'jai',
        documentStatus: 'Approved',
        version: '1.2',
        expiryDate: '01/02/222',
    },
  ]

  const locationFields = [
    { label: 'Country', value: locationInfo.country, isRequired: true },
    {
      label: 'Geographical Zone',
      value: locationInfo.geographicalZone,
      isRequired: false,
    },
  ];
  return (
    <>
      <Box
        sx={{
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.04)',
          padding: '15px',
          background: '#FFF',
          marginBottom: '20px',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6" fontWeight={600} fontSize="20px">
            {data?.legalName || 'Entity Name'}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <IconButton size="small">
              <Box component="img" src={editIcon} alt="Edit" />
            </IconButton>
            <IconButton size="small">
              <Box component="img" src={historyIcon} alt="History" />
            </IconButton>
            <IconButton size="small">
              <Box component="img" src={viewLogIcon} alt="View Log" />
            </IconButton>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FF7000',
                textTransform: 'none',
                fontWeight: 600,
                ml: 1,
                '&:hover': { backgroundColor: '#e66500' },
              }}
              startIcon={
                <Box component="img" src={reportIcon} alt="Generate Report" />
              }
            >
              Generate Report
            </Button>
          </Box>
        </Box>

        <Typography variant="subtitle1" fontWeight={600} fontSize="16px" mb={2}>
          Entity Name
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          mb={1}
          flexDirection="column"
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontSize="14px" color="#777">
              Entity Id:
            </Typography>
            <Typography fontWeight={600}>{data?.entityId || '--'}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontSize="14px" color="#777">
              Legal Name:
            </Typography>
            <Typography fontWeight={600}>{data?.legalName || '--'}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontSize="14px" color="#777">
              Company Type:
            </Typography>
            <Typography fontWeight={600}>
              {data?.companyType || '--'}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.04)',
          padding: '15px',
          background: '#FFF',
        }}
      >
        <EntityDetailsSubtabs
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
          formData={fields}
        />
      </Box>
    </>
  );
};

EditEntityDetailsTab.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EditEntityDetailsTab;
