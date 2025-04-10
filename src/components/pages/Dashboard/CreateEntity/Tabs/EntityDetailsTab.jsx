import PropTypes from 'prop-types';
import { entityFormFields } from '../formSchema';
import Input from '../../../../common/InputField/Input';
import Date from '../../../../common/Date/Date';
import { Box, Typography, Grid } from '@mui/material';
import Dropdown from '../../../../common/Dropdown/Dropdown';

const EntityDetailsTab = ({ formData, updateSection }) => {
  const sections = [
    {
      title: 'Entity Details',
      fields: entityFormFields.entityDetails || [],
    },
    {
      title: 'Location',
      fields: entityFormFields.location || [],
    },
    {
      title: 'Organization',
      fields: entityFormFields.organization || [],
    },
    {
      title: 'Share Certificate',
      fields: entityFormFields.shareCertificate || [],
    },
    {
      title: 'Tax & Audit',
      fields: entityFormFields.taxAudit || [],
    },
  ];

  const handleChange = (key, value) => {
    updateSection('entityDetails', {
      ...formData.entityDetails,
      [key]: value,
    });
  };
  
  const renderField = (field) => {
    console.log('formData?', formData);
    const value = formData?.entityDetails?.[field.key] || '';
    console.log('hhhhh', value);
    switch (field.type) {
      case 'input':
        return (
          <Input
            label=""
            labelName={field.label}
            isRequired={field.isRequired}
            placeholder={`Enter ${field.label}`}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
          />
        );
      case 'select':
        return (
          <Dropdown
            labelName={field.label}
            isRequired={field.isRequired}
            label=""
            placeholder={`Select ${field.label}`}
            options={field.options || []}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
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
            value={formData?.entityDetails?.[field.key] || null}
            onChange={(value) => handleChange(field.key, value)}
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
                {renderField(field)}
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
