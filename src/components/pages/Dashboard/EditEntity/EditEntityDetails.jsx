import { useState } from 'react';
import EntityDetailsTab from '../CreateEntity/Tabs/EntityDetailsTab';
import DocumentsTab from '../CreateEntity/Tabs/DocumnetsTab';
import { Typography, Box, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RequestChangesModal from './Modal/RequestChangeModal';
import ConfirmDialog from '../../../common/Modal/ModalComponent';

const EntityDetailsPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [formData, setFormData] = useState({
    entityDetails: {
      entityDetails: {
        eventDate: '',
        legalName: '',
        companyType: '',
      },
      location: {
        country: '',
        geographicalZone: '',
      },
      organization: {
        groupType: '',
        operatingGroup: '',
        businessActivity: '',
        status: '',
        statusEffectiveDate: '',
        companyRegistrationNumber: '',
        otherIdentification1: '',
        otherIdentification2: '',
        currency: '',
        incorporationDate: '',
        incorporationPlace: '',
        businessUnit: '',
        subBusinessUnit: '',
        corpsecAgent: '',
        executiveInCharge: '',
        legalContact: '',
        contactPerson: '',
        financialController: '',
        regionalFinanceHead: '',
        countryHead: '',
      },
      shareCertificate: {
        shareCertificateNumber: '',
        locality: '',
      },
      taxAudit: {
        taxNumber: '',
        externalTaxAdvisor: '',
        dateOfAGM: '',
        dateOfLastFinancial: '',
      },
    },
    address: {
      eventDate: '',
      registeredAddress: '',
      registeredCountry: '',
      operatingAddress: '',
      operatingCountry: '',
      additionalAddresses: [{ address: '', country: '' }],
    },
    documents: [
      {
        eventDate: '',
        documentTitle: '',
        documentCategory: '',
        documentType: '',
        author: '',
        documentStatus: '',
        version: '',
        expiryDate: '',
        upload: [],
      },
    ],
  });

  const updateSection = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const handleReview = () => {
    console.log('upddddddd', formData);
  };

  return (
    <Box style={{ padding: '20px', background: '#FAFAFA' }}>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        fontSize="20px"
        sx={{
          whiteSpace: 'nowrap',
          pr: 2,
          lineHeight: '20px',
          marginBottom: '24px',
        }}
      >
        Edit Details
      </Typography>
      <EntityDetailsTab formData={formData} updateSection={updateSection} />
      <Box style={{ marginTop: '40px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            fontSize="20px"
            sx={{ whiteSpace: 'nowrap', pr: 2, lineHeight: '20px' }}
          >
            Documents
          </Typography>
          <Box sx={{ flex: 1, borderBottom: '2px dotted #2E2D2C' }} />
        </Box>
        <DocumentsTab
          formData={formData}
          updateSection={updateSection}
          isDisplay={false}
        />
      </Box>

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
                setIsModalCancel(true);
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item display="flex" gap="25px">
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
              onClick={() => setModalOpen(true)}
            >
              Update & Review
            </Button>
          </Grid>
        </Grid>
        <ConfirmDialog
          open={isModalCancel}
          onClose={() => setIsModalCancel(false)}
          onConfirm={() => navigate('/edit-entity')}
          title="Confirm Cancellation"
          description="You have unsaved changes. If you cancel now, all progress will be lost."
          confirmText="Yes, Cancel"
          cancelText="Go Back & Save"
          note="Are you sure you want to cancel?"
        />
      </Box>
      <RequestChangesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
};

export default EntityDetailsPage;
