import { Box, Tabs, Tab, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import StaticFieldDisplay from './StaticFieldDisplay';

const entitySubTabConfig = [
  { label: 'Location', key: 'location' },
  { label: 'Organization', key: 'organization' },
  { label: 'Share Certificate', key: 'shareCertificate' },
  { label: 'Tax & Audit', key: 'taxAudit' },
  { label: 'Address & Contact', key: 'address' },
  { label: 'Documents', key: 'documents' },
];

const EntityDetailsSubtabs = ({ activeSubTab, setActiveSubTab, formData }) => {
  console.log('formda', formData);
  const handleChange = (event, newValue) => setActiveSubTab(newValue);

  return (
    <Box>
      <Tabs
        value={activeSubTab}
        onChange={handleChange}
        sx={{
          borderBottom: '1px solid #eee',
          ' .MuiTabs-indicator': {
            backgroundColor: '#FF7000',
          },
        }}
      >
        {entitySubTabConfig.map((tab, index) => (
          <Tab
            key={tab.key}
            label={tab.label}
            sx={{
              textTransform: 'capitalize',
              fontWeight: index === activeSubTab ? 600 : 400,
              fontSize: '14px',
              color:
                index === activeSubTab
                  ? '#2E2D2C !important'
                  : 'rgba(0, 0, 0, 0.54)',
              outline: 'none !important',
            }}
          />
        ))}
      </Tabs>

      <Box mt={2}>
        <Typography
          sx={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}
        >
          {entitySubTabConfig[activeSubTab].label}
        </Typography>
        <StaticFieldDisplay
          sectionKey={entitySubTabConfig[activeSubTab].key}
          fields={formData}
        />
      </Box>
    </Box>
  );
};

EntityDetailsSubtabs.propTypes = {
  activeSubTab: PropTypes.number.isRequired,
  setActiveSubTab: PropTypes.func.isRequired,
  formData: PropTypes.any,
};

export default EntityDetailsSubtabs;
