import { Box, Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';
import EntityDetailsTab from './Tabs/EntityDetailsTab';
import entityIconActive from '../../../../assets/images/entitydetailsblack.svg';
import entityIconInactive from '../../../../assets/images/entitydetailsgrey.svg';
import addressIconActive from '../../../../assets/images/addressblack.svg';
import addressIconInactive from '../../../../assets/images/addressgrey.svg';
import capitalIconActive from '../../../../assets/images/capitalblack.svg';
import capitalIconInactive from '../../../../assets/images/capitalgrey.svg';
import documentIconActive from '../../../../assets/images/documentsblack.svg';
import documentIconInactive from '../../../../assets/images/documentsgrey.svg';
import AddressTab from './Tabs/AddressTab';
import DocumentsTab from './Tabs/DocumnetsTab';
import CapitalShareholdersTab from './Tabs/CapitalShareholdersTab';

const tabConfig = [
  {
    label: 'Entity Details',
    activeIcon: entityIconActive,
    inactiveIcon: entityIconInactive,
    key: 'entityDetails',
  },
  {
    label: 'Address',
    activeIcon: addressIconActive,
    inactiveIcon: addressIconInactive,
    key: 'address',
  },
  {
    label: 'Capital Shareholders',
    activeIcon: capitalIconActive,
    inactiveIcon: capitalIconInactive,
    key: 'capital',
  },
  {
    label: 'Documents',
    activeIcon: documentIconActive,
    inactiveIcon: documentIconInactive,
    key: 'documents',
  },
];

const EntityTabs = ({ formData, updateSection, tabIndex, setTabIndex }) => {
  const handleChange = (event, newValue) => setTabIndex(newValue);

  const renderTabComponent = () => {
    console.log('formValues', formData, updateSection);
    const props = { formData, updateSection };
    console.log('props', props);
    console.log('aaaaaaaaaa', tabConfig[tabIndex], tabConfig, tabIndex);
    switch (tabConfig[tabIndex].key) {
      case 'entityDetails':
        return <EntityDetailsTab {...props} />;
      case 'address':
        return <AddressTab {...props} />;
      case 'capital':
        return <CapitalShareholdersTab {...props} />;
      case 'documents':
        return <DocumentsTab {...props} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        sx={{
          mb: 3,
          ' .MuiTabs-indicator': {
            backgroundColor: '#FF7000',
          },
          ' .MuiButtonBase-root.MuiTab-root': {
            outline: 'none !important',
          },
        }}
      >
        {tabConfig.map((tab, index) => (
          <Tab
            key={tab.key}
            label={
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: index === tabIndex ? '600' : '400',
                  lineHeight: '30px',
                  fontSize: '16px',
                  color: index === tabIndex ? '#2E2D2C' : '#999',
                }}
              >
                <Box
                  component="img"
                  src={index === tabIndex ? tab.activeIcon : tab.inactiveIcon}
                  alt={tab.label}
                  width={18}
                  height={18}
                />
                {tab.label}
              </Box>
            }
          />
        ))}
      </Tabs>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 160px)',
          px: 2,
          py: 1,
          background: '#FAFAFA',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {renderTabComponent()}
      </Box>
    </Box>
  );
};

EntityTabs.propTypes = {
  formData: PropTypes.object.isRequired,
  updateSection: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
  setTabIndex: PropTypes.number.isRequired,
};

export default EntityTabs;
