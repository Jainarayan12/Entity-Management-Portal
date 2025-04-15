import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

const tabItems = [
  'Capital Stock',
  'Capital Details',
  'Shareholders',
  'Transaction',
  'Org Chart',
];

const CapitalShareholdersTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const renderTabComponent = () => {
    // switch (tabIndex) {
    //   case 0:
    //     return <CapitalStockTab />;
    //   case 1:
    //     return <CapitalDetailsTab />;
    //   case 2:
    //     return <ShareholdersTab />;
    //   case 3:
    //     return <TransactionTab />;
    //   case 4:
    //     return <OrgChartTab />;
    //   default:
    //     return null;
    // }
  };

  return (
    <Box sx={{ outline: 'none !important',}}>
      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        sx={{
          mb: 3,
          borderBottom: '1px solid #eee',
          '& .MuiTabs-flexContainer': { gap: '8px' },
          '& .MuiTab-root': {
            textTransform: 'none',
            minHeight: 'auto',
            padding: '8px 16px',
            fontWeight: 500,
            fontSize: '14px',
            borderRadius: '4px 4px 0 0',
            backgroundColor: '#E9E9E9',
            color: '#2E2D2C',
            outline: 'none !important',
          },
          '& .Mui-selected': {
            backgroundColor: '#FF7000',
            color: '#fff !important',
            fontWeight: 'bold',
            outline: 'none !important',
          },
        }}
        TabIndicatorProps={{ style: { display: 'none' } }}
      >
        {tabItems.map((label, index) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
      <Box>{renderTabComponent()}</Box>
    </Box>
  );
};

export default CapitalShareholdersTabs;
