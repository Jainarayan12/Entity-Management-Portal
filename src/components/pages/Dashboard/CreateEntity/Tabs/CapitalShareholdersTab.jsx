import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { capitalShareFormFields } from '../formSchema';
import Date from '../../../../common/Date/Date';
import Dropdown from '../../../../common/Dropdown/Dropdown';
import Input from '../../../../common/InputField/Input';
import addCircle from '../../../../../assets/images/addBtn.svg';

const CapitalShareholdersTab = ({ formValues, setFormValues }) => {
  const [formData, setFormData] = useState({
    generalInfo: {},
    shareType: {},
    shareholderType: {},
  });

  const [shareTypeList, setShareTypeList] = useState([]);
  const [shareholderList, setShareholderList] = useState([]);

  const [editIndex, setEditIndex] = useState(null);
  const [shareholderEditIndex, setShareholderEditIndex] = useState(null);

  const handleFieldChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const isFormValid = (section) =>
    capitalShareFormFields[section].every(
      (field) => !field.required || formData[section][field.key],
    );

  const handleAddOrEdit = (section) => {
    if (!isFormValid(section)) return;

    const list = section === 'shareType' ? shareTypeList : shareholderList;
    const index = section === 'shareType' ? editIndex : shareholderEditIndex;

    if (index !== null) {
      const updated = [...list];
      updated[index] = { ...formData[section] };
      section === 'shareType'
        ? setShareTypeList(updated)
        : setShareholderList(updated);
    } else {
      section === 'shareType'
        ? setShareTypeList([...list, { ...formData[section] }])
        : setShareholderList([...list, { ...formData[section] }]);
    }

    setFormData((prev) => ({ ...prev, [section]: {} }));
    section === 'shareType'
      ? setEditIndex(null)
      : setShareholderEditIndex(null);
  };

  const handleEdit = (section, index) => {
    const record =
      section === 'shareType' ? shareTypeList[index] : shareholderList[index];
    setFormData((prev) => ({ ...prev, [section]: { ...record } }));
    section === 'shareType'
      ? setEditIndex(index)
      : setShareholderEditIndex(index);
  };

  const renderField = (field, section) => {
    const value = formData[section][field.key] || '';
    const handleChange = (val) => handleFieldChange(section, field.key, val);

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
      case 'date':
        return (
          <Date
            key={field.key}
            labelName={field.label}
            isRequired={field.isRequired}
            label=""
            value={formValues?.entityDetails?.[field.key] || null}
            onChange={(value) => handleChange(field.key, value)}
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
      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                // checked={!!values[field.key]}
                onChange={(e) => handleChange(field.key, e.target.checked)}
              />
            }
            label={<Typography sx={{ fontSize: '14px' }}>{field.label}</Typography>}
          />
        );
      default:
        return null;
    }
  };

  const renderSection = (section, title) => {
    const columnMap = {
      generalInfo: 4,
      shareType: 2.4,
      shareholderType: 3,
    };

    const mdCols = columnMap[section] || 4;

    return (
      <Box
        key={section}
        sx={{
          mb: 4,
          position: 'relative',
          ...(title ? { background: '#ffff' } : {}),
        }}
      >
        {title && (
          <Box sx={{ background: '#FFF9EF' }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              mb={2}
              sx={{
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: '130%',
                padding: '10px',
              }}
            >
              {title}
            </Typography>
          </Box>
        )}
        <Grid container spacing={2} padding="10px">
          {capitalShareFormFields[section].map((field) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={mdCols}
              key={field.key}
              sx={{ padding: '15px' }}
            >
              {renderField(field, section)}
            </Grid>
          ))}
        </Grid>
        {section !== 'generalInfo' && (
          <Box mt={2} sx={{ position: 'absolute', right: 25, bottom: 25 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                backgroundColor: isFormValid(section) ? '#00A859' : '#D3D3D3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isFormValid(section) ? 'pointer' : 'not-allowed',
              }}
              onClick={() => {
                if (isFormValid(section)) {
                  handleAddOrEdit(section);
                }
              }}
            >
              <Box component="img" src={addCircle} />
            </Box>
          </Box>
        )}
        {(section === 'shareType' ? shareTypeList : shareholderList).length >
          0 && (
          <Paper elevation={1} sx={{ mt: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {capitalShareFormFields[section].map((field) => (
                    <TableCell key={field.key}>{field.label}</TableCell>
                  ))}
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(section === 'shareType'
                  ? shareTypeList
                  : shareholderList
                ).map((row, index) => (
                  <TableRow key={index}>
                    {capitalShareFormFields[section].map((field) => (
                      <TableCell key={field.key}>
                        {row[field.key] || '-'}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton onClick={() => handleEdit(section, index)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    );
  };

  return (
    <Box>
      {renderSection('generalInfo', '')}
      {renderSection(
        'shareType',
        'Please select the share type and relevant information. Click on the validate icon to validate each entry',
      )}
      {renderSection(
        'shareholderType',
        'Please select the share’s holders type for each share type and click the validate icon to validate each entry',
      )}
    </Box>
  );
};

CapitalShareholdersTab.propTypes = {
  formValues: PropTypes.object.isRequired,
  setFormValues: PropTypes.func.isRequired,
};

export default CapitalShareholdersTab;
