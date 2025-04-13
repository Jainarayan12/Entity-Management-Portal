import  { useEffect, useState } from 'react';
import EditEntityTabs from './EditEntityTabs';
import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../../core/utils/apiEndpoints';
import useApi from '../../../../core/api-service/useApi';

const EditEntity = () => {
  const { entityId } = useParams();
  const { get } = useApi();
  const [entityData, setEntityData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEntityData = async () => {
    try {
      const response = await get(`${API_ENDPOINTS.entity.getEntity}/${entityId}`);
      if (response?.data?.responseCode === 200) {
        setEntityData(response?.data?.entity);
      }
    } catch (error) {
      console.error('Error fetching entity data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchEntityData();
  }, [entityId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2}>
      <EditEntityTabs entityData={entityData} />
    </Box>
  );
};

export default EditEntity;