import { useState } from 'react';
import { Box } from '@mui/material';
import EntityTabs from './EntityTabs';
import EntityFooter from '../../../../Layout/Footer';

const EntityCreation = () => {
  const [formData, setFormData] = useState({
    entityDetails: {},
    address: {},
    capital: {},
    documents: {},
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
