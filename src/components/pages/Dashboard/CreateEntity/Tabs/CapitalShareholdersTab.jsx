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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import { capitalShareFormFields } from '../formSchema';
import Date from '../../../../common/Date/Date';
import Dropdown from '../../../../common/Dropdown/Dropdown';
import Input from '../../../../common/InputField/Input';
import addCircle from '../../../../../assets/images/addBtn.svg';
import { useEffect } from 'react';
import useApi from '../../../../../core/api-service/useApi';

const CapitalShareholdersTab = ({ formData, updateSection }) => {
  const { get } = useApi();
  const [dependentDropdowns, setDependentDropdowns] = useState({
    subscriberType: [],
    shareOwner: [],
  });
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [shareTypeList, setShareTypeList] = useState([]);
  const [shareholderList, setShareholderList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [shareholderEditIndex, setShareholderEditIndex] = useState(null);

  useEffect(() => {
    const dummyMap = {
      transaction: [
        { label: 'Issue', value: 'issue' },
        { label: 'Buyback', value: 'buyback' },
      ],
      transactionType: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
      shareType: [
        { label: 'Equity', value: 'equity' },
        { label: 'Preference', value: 'preference' },
      ],
      currency: [
        { label: 'INR', value: 'INR' },
        { label: 'USD', value: 'USD' },
      ],
      // subscriberType: [
      //   { label: 'Individual', value: 'individual' },
      //   { label: 'Company', value: 'company' },
      // ],
      // shareOwner: [
      //   { label: 'Promoter', value: 'promoter' },
      //   { label: 'Investor', value: 'investor' },
      // ],
    };

    const allDropdownFields = Object.values(capitalShareFormFields)
      .flatMap((fields) => fields)
      .filter((field) => field.type === 'select');

    const optionsMap = {};
    allDropdownFields.forEach((field) => {
      optionsMap[field.key] = dummyMap[field.key] || [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ];
    });

    setDropdownOptions(optionsMap);
  }, []);

  const handleFieldChange = async (section, key, value) => {
    if (section === 'shareType') {
      const current = { ...formData.capital.shareType, [key]: value };

      if (key === 'parValueCheckbox' && value) {
        current.nominalValueCheckbox = false;
        current.nominalValue = '';
        current.capitalShare = '';
      } else if (key === 'nominalValueCheckbox' && value) {
        current.parValueCheckbox = false;
        current.parValue = '';
        current.capitalShare = '';
      }

      if (key === 'parValueCheckbox' && !value) {
        current.parValue = '';
        current.capitalShare = '';
      }

      if (key === 'nominalValueCheckbox' && !value) {
        current.nominalValue = '';
        current.capitalShare = '';
      }

      const sharesIssued = parseFloat(current.sharesIssued || 0);
      const parValue = parseFloat(current.parValue || 0);
      const nominalValue = parseFloat(current.nominalValue || 0);

      if (current.parValueCheckbox && key !== 'capitalShare') {
        current.capitalShare = (sharesIssued * parValue).toFixed(2);
      } else if (current.nominalValueCheckbox && key !== 'capitalShare') {
        current.capitalShare = (sharesIssued * nominalValue).toFixed(2);
      }

      updateSection('capital', {
        ...formData.capital,
        shareType: current,
      });
      return;
    }

    if (section === 'shareholderType') {
      const current = { ...formData.capital.shareholderType, [key]: value };

      if (key === 'shareType') {
        // try {
        // const res = await get(`/dropdown/subscriberType/${value}`);
        // setDependentDropdowns((prev) => ({
        //   ...prev,
        //   subscriberType: res?.data || [],
        //   shareOwner: [],
        // }));
        // current.subscriberType = '';
        // current.shareOwner = '';
        // } catch {
        setDependentDropdowns((prev) => ({
          ...prev,
          subscriberType: [
            { label: 'Default Subscriber A', value: 'sub-a' },
            { label: 'Default Subscriber B', value: 'sub-b' },
          ],
          shareOwner: [],
        }));
        // }
      }

      if (key === 'subscriberType') {
        // try {
        //   const res = await get(`/dropdown/shareOwner/${value}`);
        //   setDependentDropdowns((prev) => ({
        //     ...prev,
        //     shareOwner: res?.data || [],
        //   }));
        //   current.shareOwner = '';
        // } catch {
        setDependentDropdowns((prev) => ({
          ...prev,
          shareOwner: [
            { label: 'Default Owner A', value: 'owner-a' },
            { label: 'Default Owner B', value: 'owner-b' },
          ],
        }));
        // }
      }

      updateSection('capital', {
        ...formData.capital,
        shareholderType: current,
      });
      return;
    }

    updateSection('capital', {
      ...formData.capital,
      [section]: {
        ...formData.capital[section],
        [key]: value,
      },
    });
  };

  const isFormValid = (section) =>
    capitalShareFormFields[section].every((field) => {
      console.log('Checking field:', field.key, 'in section:', section);
      return !field.required || formData.capital?.[section]?.[field.key];
    });

  const handleAddOrEdit = (section) => {
    if (!isFormValid(section)) return;

    const list = section === 'shareType' ? shareTypeList : shareholderList;
    const index = section === 'shareType' ? editIndex : shareholderEditIndex;
    const current = formData.capital?.[section];

    const updatedList =
      index !== null
        ? [...list.slice(0, index), current, ...list.slice(index + 1)]
        : [...list, current];

    updateSection('capital', {
      ...formData.capital,
      [section]: {},
      [`${section}List`]: updatedList,
    });

    section === 'shareType'
      ? setEditIndex(null)
      : setShareholderEditIndex(null);

    section === 'shareType'
      ? setShareTypeList(updatedList)
      : setShareholderList(updatedList);
  };

  const handleEdit = (section, index) => {
    const record =
      section === 'shareType' ? shareTypeList[index] : shareholderList[index];

    updateSection('capital', {
      ...formData.capital,
      [section]: { ...record },
    });

    section === 'shareType'
      ? setEditIndex(index)
      : setShareholderEditIndex(index);
  };

  const renderField = (field, section) => {
    const isNumericField = [
      'sharesIssued',
      'votingRightsIssued',
      'capitalShare',
    ].includes(field.key);
    const value = formData.capital?.[section]?.[field.key] || '';
    const shareTypeData = formData.capital?.shareType || {};
    const isParChecked = shareTypeData.parValueCheckbox;
    const isNominalChecked = shareTypeData.nominalValueCheckbox;

    const isDisabled = (() => {
      if (section !== 'shareType') return false;
      if (field.key === 'parValue') return !isParChecked;
      if (field.key === 'nominalValue') return !isNominalChecked;
      if (field.key === 'capitalShare') return isParChecked || isNominalChecked;
      return false;
    })();

    const options =
      section === 'shareholderType' && field.key === 'subscriberType'
        ? dependentDropdowns.subscriberType
        : section === 'shareholderType' && field.key === 'shareOwner'
          ? dependentDropdowns.shareOwner
          : dropdownOptions[field.key] || [];

    switch (field.type) {
      case 'input':
        return (
          <Input
            label=""
            labelName={field.label}
            isRequired={field.isRequired}
            placeholder={`Enter ${field.label}`}
            value={value}
            onChange={(e) => {
              const inputValue = e.target.value;
              // Allow only numbers and decimal points
              if (!isNumericField || /^\d*\.?\d*$/.test(inputValue)) {
                handleFieldChange(section, field.key, inputValue);
              }
            }}
            disabled={isDisabled}
          />
        );
      case 'date':
        return (
          <Date
            key={field.key}
            labelName={field.label}
            isRequired={field.isRequired}
            label=""
            value={value ? dayjs(value) : null}
            onChange={(val) => {
              const formatted = val ? val.format('YYYY-MM-DD') : '';
              handleFieldChange(section, field.key, formatted);
            }}
          />
        );
      case 'select':
        return (
          <Dropdown
            labelName={field.label}
            isRequired={field.isRequired}
            label=""
            placeholder={`Select ${field.label}`}
            options={options}
            value={value}
            onChange={(e) =>
              handleFieldChange(section, field.key, e.target.value)
            }
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
                checked={!!value}
                onChange={(e) =>
                  handleFieldChange(section, field.key, e.target.checked)
                }
              />
            }
            label={
              <Typography sx={{ fontSize: '14px' }}>{field.label}</Typography>
            }
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
          <Box position="relative">
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
          </Box>
        )}
        {(section === 'shareType' ? shareTypeList : shareholderList).filter(
          (_, idx) =>
            section === 'shareType'
              ? idx !== editIndex
              : idx !== shareholderEditIndex,
        ).length > 0 && (
          <Paper
            elevation={0}
            sx={{
              mt: 3,
              border: '1px solid #D3D3D3',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow sx={{ fontSize: '12px', fontWeight: '600' }}>
                  {capitalShareFormFields[section]
                    .filter((field) => field.type !== 'checkbox')
                    .map((field) => (
                      <TableCell
                        key={field.key}
                        sx={{ border: '1px solid #D3D3D3' }}
                      >
                        {field.label}
                      </TableCell>
                    ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(section === 'shareType' ? shareTypeList : shareholderList)
                  .filter((_, idx) =>
                    section === 'shareType'
                      ? idx !== editIndex
                      : idx !== shareholderEditIndex,
                  )
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ fontSize: '12px', fontWeight: '400' }}
                    >
                      {capitalShareFormFields[section]
                        .filter((field) => field.type !== 'checkbox')
                        .map((field) => (
                          <TableCell
                            key={field.key}
                            sx={{ border: '1px solid #D3D3D3' }}
                          >
                            {row[field.key] || '-'}
                          </TableCell>
                        ))}
                      <TableCell>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <IconButton
                            onClick={() => handleEdit(section, index)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              const updated = [
                                ...(section === 'shareType'
                                  ? shareTypeList
                                  : shareholderList),
                              ];
                              updated.splice(index, 1);
                              updateSection('capital', {
                                ...formData.capital,
                                [`${section}List`]: updated,
                              });
                              section === 'shareType'
                                ? setShareTypeList(updated)
                                : setShareholderList(updated);
                            }}
                          >
                            <Box
                              component="img"
                              src="/icons/delete.svg"
                              alt="Delete"
                              sx={{ width: 20, height: 20 }}
                            />
                          </IconButton>
                        </Box>
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
  formData: PropTypes.object.isRequired,
  updateSection: PropTypes.func.isRequired,
};

export default CapitalShareholdersTab;
