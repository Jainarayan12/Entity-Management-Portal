import PropTypes from 'prop-types';
import { entityFormFields } from '../formSchema';
import Input from '../../../../common/InputField/Input';
import Date from '../../../../common/Date/Date';
import { Box, Typography, Grid } from '@mui/material';
import Dropdown from '../../../../common/Dropdown/Dropdown';
import useApi from '../../../../../core/api-service/useApi';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const EntityDetailsTab = ({ formData, updateSection }) => {
  const { get } = useApi();
  const [dropdownOptions, setDropdownOptions] = useState({});

  const sections = [
    {
      key: 'entityDetails', // matches the nested object key in formData
      title: 'Entity Details',
      fields: entityFormFields.entityDetails,
    },
    {
      key: 'location',
      title: 'Location',
      fields: entityFormFields.location,
    },
    {
      key: 'organization',
      title: 'Organization',
      fields: entityFormFields.organization,
    },
    {
      key: 'shareCertificate',
      title: 'Share Certificate',
      fields: entityFormFields.shareCertificate,
    },
    {
      key: 'taxAudit',
      title: 'Tax & Audit',
      fields: entityFormFields.taxAudit,
    },
  ];

  useEffect(() => {
    const injectDummyDropdowns = () => {
      const allDropdownFields = sections
        .flatMap((section) => section.fields)
        .filter((field) => field.type === 'select');

      const dummyMap = {
        country: [
          { label: 'India', value: 'IN' },
          { label: 'USA', value: 'US' },
          { label: 'UK', value: 'UK' },
        ],
        geographicalZone: [
          { label: 'North', value: 'north' },
          { label: 'South', value: 'south' },
          { label: 'East', value: 'east' },
          { label: 'West', value: 'west' },
        ],
        groupType: [
          { label: 'Group', value: 'group' },
          { label: 'Non-Group', value: 'non-group' },
        ],
        operatingGroup: [
          { label: 'Operations A', value: 'op-a' },
          { label: 'Operations B', value: 'op-b' },
        ],
        status: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
        currency: [
          { label: 'USD', value: 'USD' },
          { label: 'INR', value: 'INR' },
          { label: 'EUR', value: 'EUR' },
        ],
        incorporationPlace: [
          { label: 'New York', value: 'ny' },
          { label: 'Mumbai', value: 'mumbai' },
          { label: 'London', value: 'london' },
        ],
        businessUnit: [
          { label: 'Unit A', value: 'unit-a' },
          { label: 'Unit B', value: 'unit-b' },
        ],
        subBusinessUnit: [
          { label: 'Sub A1', value: 'sub-a1' },
          { label: 'Sub B1', value: 'sub-b1' },
        ],
      };

      const optionsMap = {};
      allDropdownFields.forEach((field) => {
        optionsMap[field.key] = dummyMap[field.key] || [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ];
      });

      setDropdownOptions(optionsMap);
    };

    injectDummyDropdowns();
  }, []);

  // useEffect(() => {
  //   const fetchDropdowns = async () => {
  //     const allDropdownFields = sections
  //       .flatMap((section) => section.fields)
  //       .filter((field) => field.type === 'select' && field.apiEndpoint);

  //     const results = await Promise.all(
  //       allDropdownFields.map(async (field) => {
  //         try {
  //           const response = await get(field.apiEndpoint);
  //           return { key: field.key, options: response?.data || [] };
  //         } catch (err) {
  //           console.error(`Failed to fetch ${field.key} dropdown:`, err);
  //           return { key: field.key, options: [] };
  //         }
  //       })
  //     );

  //     const optionsMap = {};
  //     results.forEach(({ key, options }) => {
  //       optionsMap[key] = options;
  //     });

  //     setDropdownOptions(optionsMap);
  //   };

  //   fetchDropdowns();
  // }, []);

  const handleChange = (sectionKey, fieldKey, value) => {
    updateSection('entityDetails', {
      ...formData.entityDetails,
      [sectionKey]: {
        ...formData.entityDetails[sectionKey],
        [fieldKey]: value,
      },
    });
  }

  const renderField = (field, subSectionKey) => {
    const value = formData?.entityDetails?.[subSectionKey]?.[field.key] || '';

    switch (field.type) {
      case 'input':
        return (
          <Input
            label=""
            labelName={field.label}
            isRequired={field.isRequired}
            placeholder={`Enter ${field.label}`}
            value={value}
            onChange={(e) =>
              handleChange(subSectionKey, field.key, e.target.value)
            }
          />
        );
      case 'select':
        return (
          <Dropdown
            labelName={field.label}
            isRequired={field.isRequired}
            label=""
            placeholder={`Select ${field.label}`}
            options={dropdownOptions[field.key] || []}
            value={value}
            onChange={(e) =>
              handleChange(subSectionKey, field.key, e.target.value)
            }
            labelKey="label"
            valueKey="value"
            showClearIcon={true}
          />
        );
      case 'date':
        return (
          <Date
            key={field.key}
            labelName={field.label}
            isRequired={field.isRequired}
            label=""
            value={
              formData.entityDetails[subSectionKey][field.key]
                ? dayjs(formData.entityDetails[subSectionKey][field.key])
                : null
            }
            onChange={(val) => {
              const formatted = val ? val.format('YYYY-MM-DD') : '';
              handleChange(subSectionKey, field.key, formatted);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      {sections.map((section) => (
        <Box key={section.title} sx={{ pb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              fontSize="20px"
              sx={{ whiteSpace: 'nowrap', pr: 2, lineHeight: '20px' }}
            >
              {section.title}
            </Typography>
            <Box sx={{ flex: 1, borderBottom: '2px dotted #2E2D2C' }} />
          </Box>

          <Grid container spacing={2}>
            {section.fields.map((field) => (
              <Grid item xs={12} sm={6} md={4} key={field.key}>
                {renderField(field, section.key)}
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

EntityDetailsTab.propTypes = {
  formData: PropTypes.shape({
    entityDetails: PropTypes.object,
  }).isRequired,
  updateSection: PropTypes.func.isRequired,
};

export default EntityDetailsTab;
