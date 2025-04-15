import { Box, Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';
import EditEntityDetailsTab from './Tabs/EditEntityDetailsTab';
import DirectorshipTab from './Tabs/DirectorshipTab';
import OwnershipTab from './Tabs/OwnershipTab';
import CapitalShareholdersTabs from './Tabs/CapitalShareholdersTab';
import React from 'react';
import entityIconActive from '../../../../assets/images/entitydetailsblack.svg';
import entityIconInactive from '../../../../assets/images/entitydetailsgrey.svg';
import directorshipIconActive from '../../../../assets/images/directorshipIconActive.svg';
import directorshipIconInactive from '../../../../assets/images/directorshipIconInactive.svg';
import ownershipIconActive from '../../../../assets/images/ownershipIconActive.svg';
import ownershipIconInactive from '../../../../assets/images/ownershipIconInactive.svg';
import capitalIconActive from '../../../../assets/images/capitalblack.svg';
import capitalIconInactive from '../../../../assets/images/capitalgrey.svg';

const tabConfig = [
  {
    label: 'Entity Details',
    activeIcon: entityIconActive,
    inactiveIcon: entityIconInactive,
    key: 'entityDetails',
  },
  {
    label: 'Directorship',
    activeIcon: directorshipIconActive,
    inactiveIcon: directorshipIconInactive,
    key: 'directorship',
  },
  {
    label: 'Ownership',
    activeIcon: ownershipIconActive,
    inactiveIcon: ownershipIconInactive,
    key: 'ownership',
  },
  {
    label: 'Capital Shareholders',
    activeIcon: capitalIconActive,
    inactiveIcon: capitalIconInactive,
    key: 'capital',
  },
];

const EditEntityTabs = ({ entityData }) => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  const renderTabComponent = () => {
    switch (tabConfig[tabIndex].key) {
      case 'entityDetails':
        return <EditEntityDetailsTab data={entityData?.entityDetails} />;
      case 'directorship':
        return <DirectorshipTab data={entityData?.directorship} />;
      case 'ownership':
        return <OwnershipTab data={entityData?.ownership} />;
      case 'capital':
        return <CapitalShareholdersTabs data={entityData?.capital} />;
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

EditEntityTabs.propTypes = {
  entityData: PropTypes.object.isRequired,
};

export default EditEntityTabs;
