import { useState } from 'react';
import { Box } from '@mui/material';
import EntityTabs from './EntityTabs';
import EntityFooter from '../../../../Layout/Footer';

const EntityCreation = () => {
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
    capital: {
      generalInfo: {
        eventDate: '',
        authorizedCapital: '',
        paidUpCapital: '',
      },
      shareType: {
        transaction: '',
        transactionType: '',
        shareType: '',
        sharesIssued: '',
        votingRightsIssued: '',
        parValueCheckbox: false,
        nominalValueCheckbox: false,
        parValue: '',
        nominalValue: '',
        capitalShare: '',
        currency: '',
        comments: '',
      },
      shareholderType: {
        shareType: '',
        subscriberType: '',
        shareOwner: '',
        subscribedAmount: '',
        vote: '',
        currency: '',
      },
    },
    documents: {
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
  });

  const updateSection = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const [tabIndex, setTabIndex] = useState(0);

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
  };

  const handleSubmit = () => {
    console.log('Submitting form:', formData);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <EntityTabs
        formData={formData}
        updateSection={updateSection}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />
      <EntityFooter
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        tabCount={4}
        onSaveDraft={handleSaveDraft}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default EntityCreation;
