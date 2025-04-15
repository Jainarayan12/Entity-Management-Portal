import { useState, useEffect } from 'react';
import { Box, Grid, Typography, IconButton, Button } from '@mui/material';
import Input from '../../../../common/InputField/Input';
import Date from '../../../../common/Date/Date';
import Dropdown from '../../../../common/Dropdown/Dropdown';
import PropTypes from 'prop-types';
import addCircle from '../../../../../assets/images/add-circle.svg';
import deleteIcon from '../../../../../assets/images/delete.svg';
import useApi from '../../../../../core/api-service/useApi';
import React from 'react';
import dayjs from 'dayjs';

const AddressTab = ({ formData, updateSection }) => {
  const { get } = useApi();
  const [registeredCountries, setRegisteredCountries] = useState([]);
  const [operatingCountries, setOperatingCountries] = useState([]);
  const [additionalCountries, setAdditionalCountries] = useState([]);

  useEffect(() => {
    const fetchRegistered = async () => {
      // try {
      //   const res = await get('/dropdown/countries/registered');
      //   setRegisteredCountries(res?.data || []);
      // } catch {
      setRegisteredCountries([
        { id: 'IN', name: 'India (Reg)' },
        { id: 'UK', name: 'UK (Reg)' },
      ]);
      // }
    };

    const fetchOperating = async () => {
      // try {
      //   const res = await get('/dropdown/countries/operating');
      //   setOperatingCountries(res?.data || []);
      // } catch {
      setOperatingCountries([
        { id: 'US', name: 'USA (Ops)' },
        { id: 'CA', name: 'Canada (Ops)' },
      ]);
      // }
    };

    const fetchAdditional = async () => {
      // try {
      //   const res = await get('/dropdown/countries/additional');
      //   setAdditionalCountries(res?.data || []);
      // } catch {
      setAdditionalCountries([
        { id: 'DE', name: 'Germany (Add)' },
        { id: 'FR', name: 'France (Add)' },
      ]);
      // }
    };

    if (!formData?.address) {
      updateSection('address', {
        additionalAddresses: [{ address: '', country: '' }],
      });
    } else if (!formData.address.additionalAddresses?.length) {
      updateSection('address', {
        ...formData.address,
        additionalAddresses: [{ address: '', country: '' }],
      });
    }

    fetchRegistered();
    fetchOperating();
    fetchAdditional();
  }, []);

  const handleChange = (key, value) => {
    updateSection('address', {
      [key]: value,
    });
  };

  const handleAdditionalChange = (index, key, value) => {
    const current = formData?.address?.additionalAddresses || [];
    const updated = [...current];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    updateSection('address', {
      additionalAddresses: updated,
    });
  };

  const handleAddField = () => {
    const current = formData?.address?.additionalAddresses || [];
    if (current.length < 3) {
      updateSection('address', {
        additionalAddresses: [...current, { address: '', country: '' }],
      });
    }
  };

  const handleRemoveField = (index) => {
    const current = formData?.address?.additionalAddresses || [];
    const updated = current.filter((_, i) => i !== index);
    updateSection('address', {
      additionalAddresses: updated,
    });
  };

  return (
    <Box sx={{ width: '98%' }}>
      <Typography variant="h6" fontWeight={600} mb={2} fontSize="20px">
        Add an address
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Date
                label=""
                labelName="Event Date"
                value={
                  formData?.address?.eventDate
                    ? dayjs(formData.address.eventDate)
                    : null
                }
                onChange={(val) => {
                  const formattedDate = val ? val.format('YYYY-MM-DD') : '';
                  handleChange('eventDate', formattedDate);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label=""
            labelName="Registered Address"
            value={formData?.address?.registeredAddress || ''}
            onChange={(e) => handleChange('registeredAddress', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Dropdown
            label=""
            labelName="Country Of Registered Address"
            options={registeredCountries}
            value={formData?.address?.registeredCountry || ''}
            onChange={(e) => handleChange('registeredCountry', e.target.value)}
            labelKey="name"
            valueKey="id"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Input
            label=""
            labelName="Operating Address"
            value={formData?.address?.operatingAddress || ''}
            onChange={(e) => handleChange('operatingAddress', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Dropdown
            label=""
            labelName="Country Of Operating Address"
            options={operatingCountries}
            value={formData?.address?.operatingCountry || ''}
            onChange={(e) => handleChange('operatingCountry', e.target.value)}
            labelKey="name"
            valueKey="id"
          />
        </Grid>

        {/* Additional Addresses */}
        {(formData?.address?.additionalAddresses || []).map((item, index) => (
          <React.Fragment key={`additional-${index}`}>
            <Grid item xs={12} sm={6}>
              <Input
                label=""
                labelName={`Additional Address ${index + 1}`}
                value={item.address}
                onChange={(e) =>
                  handleAdditionalChange(index, 'address', e.target.value)
                }
                InputProps={{
                  endAdornment:
                    index > 0 ? (
                      <IconButton
                        onClick={() => handleRemoveField(index)}
                        sx={{ outline: 'none !important' }}
                      >
                        <Box
                          component="img"
                          src={deleteIcon}
                          alt="remove"
                          sx={{ width: 24, height: 24 }}
                        />
                      </IconButton>
                    ) : null,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Dropdown
                label=""
                labelName={`Country Of Additional Address ${index + 1}`}
                options={additionalCountries}
                value={item.country}
                onChange={(e) =>
                  handleAdditionalChange(index, 'country', e.target.value)
                }
                labelKey="name"
                valueKey="id"
              />
            </Grid>
          </React.Fragment>
        ))}

        {/* Add Additional Address Button */}
        {(formData?.address?.additionalAddresses || []).length < 3 && (
          <Grid item xs={12} textAlign="end">
            <Button
              onClick={handleAddField}
              sx={{
                mt: 1,
                textTransform: 'capitalize',
                color: '#FF7000',
                fontWeight: '600',
                lineHeight: '20px',
                gap: '6px',
                outline: 'none !important',
              }}
            >
              <Box
                component="img"
                src={addCircle}
                alt="Add"
                sx={{ width: 24, height: 24 }}
              />
              Add Additional Address
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

AddressTab.propTypes = {
  formData: PropTypes.shape({
    address: PropTypes.object.isRequired,
  }).isRequired,
  updateSection: PropTypes.func.isRequired,
};

export default AddressTab;
