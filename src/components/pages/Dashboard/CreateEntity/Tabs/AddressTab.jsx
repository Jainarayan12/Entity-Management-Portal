import { useState } from 'react';
import { Box, Grid, Typography, IconButton, Button } from '@mui/material';
import Input from '../../../../common/InputField/Input';
import Date from '../../../../common/Date/Date';
import Dropdown from '../../../../common/Dropdown/Dropdown';
import PropTypes from 'prop-types';
import React from 'react';
import addCircle from '../../../../../assets/images/add-circle.svg';
import deleteIcon from '../../../../../assets/images/delete.svg';

const countryOptions = [
  { id: 'IN', name: 'India' },
  { id: 'US', name: 'USA' },
  { id: 'SG', name: 'Singapore' },
];

const AddressTab = ({ formValues, setFormValues }) => {
  const [additionalAddresses, setAdditionalAddresses] = useState(['']);

  const handleChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value },
    }));
  };

  const handleAdditionalChange = (index, value) => {
    const updated = [...additionalAddresses];
    updated[index] = value;
    setAdditionalAddresses(updated);
    setFormValues((prev) => ({
      ...prev,
      address: { ...prev.address, additionalAddresses: updated },
    }));
  };

  const handleAddField = () => {
    if (additionalAddresses.length < 3) {
      const updated = [...additionalAddresses, ''];
      setAdditionalAddresses(updated);
      setFormValues((prev) => ({
        ...prev,
        address: { ...prev.address, additionalAddresses: updated },
      }));
    }
  };

  const handleRemoveField = (index) => {
    const updated = [...additionalAddresses];
    updated.splice(index, 1);
    setAdditionalAddresses(updated);
    setFormValues((prev) => ({
      ...prev,
      address: { ...prev.address, additionalAddresses: updated },
    }));
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
                value={formValues?.address?.eventDate || null}
                onChange={(val) => handleChange('eventDate', val)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Input
            label=""
            labelName="Registered Address"
            value={formValues?.address?.registeredAddress || ''}
            onChange={(e) => handleChange('registeredAddress', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Dropdown
            label=""
            labelName="Country Of Registered Address"
            options={countryOptions}
            value={formValues?.address?.registeredCountry || ''}
            onChange={(val) => handleChange('registeredCountry', val)}
            labelKey="name"
            valueKey="id"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Input
            label=""
            labelName="Operating Address"
            value={formValues?.address?.operatingAddress || ''}
            onChange={(e) => handleChange('operatingAddress', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Dropdown
            label=""
            labelName="Country Of Operating Address"
            options={countryOptions}
            value={formValues?.address?.operatingCountry || ''}
            onChange={(val) => handleChange('operatingCountry', val)}
            labelKey="name"
            valueKey="id"
          />
        </Grid>

        {additionalAddresses.map((addr, index) => (
          <React.Fragment key={`address-${index}`} sx={{ width: '90%' }}>
            <Grid item xs={12} sm={6}>
              <Input
                label=""
                labelName={`Additional Address ${index + 1}`}
                value={addr}
                onChange={(e) => handleAdditionalChange(index, e.target.value)}
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
                          alt="scope"
                          sx={{ width: 24, height: 24 }}
                        />
                      </IconButton>
                    ) : null,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
              <Dropdown
                label=""
                labelName={`Country Of Additional Address ${index + 1}`}
                options={countryOptions}
                value={
                  formValues?.address?.[`additionalCountry${index + 1}`] || ''
                }
                onChange={(val) =>
                  handleChange(`additionalCountry${index + 1}`, val)
                }
                labelKey="name"
                valueKey="id"
                sx={{ flex: 1 }}
              />
              {index > 0 && (
                <IconButton
                  onClick={() => handleRemoveField(index)}
                  sx={{
                    ml: 1,
                    position: 'absolute',
                    outline: 'none !important',
                  }}
                >
                  <Box
                    component="img"
                    src={deleteIcon}
                    alt="scope"
                    sx={{ width: 24, height: 24 }}
                  />
                </IconButton>
              )}
            </Grid>
          </React.Fragment>
        ))}

        {additionalAddresses.length < 3 && (
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
                alt="scope"
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
  formValues: PropTypes.shape({
    address: PropTypes.object.isRequired,
  }).isRequired,
  setFormValues: PropTypes.func.isRequired,
};

export default AddressTab;
