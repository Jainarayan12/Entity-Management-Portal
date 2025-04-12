import { Box, Grid, Typography, Button, LinearProgress } from '@mui/material';
import DatePicker from '../../../../common/Date/Date';
import Dropdown from '../../../../common/Dropdown/Dropdown';
import Input from '../../../../common/InputField/Input';
import PropTypes from 'prop-types';
import { documentsSchema } from '../formSchema';
import addCircle from '../../../../../assets/images/add-circle.svg';
import { API_ENDPOINTS } from '../../../../../core/utils/apiEndpoints';
import { toastError, toastSuccess } from '../../../../common/Toast/Toast';
import { useState } from 'react';
import useApi from '../../../../../core/api-service/useApi';
import upload from '../../../../../assets/images/upload-icon.svg';
import Tooltip from '@mui/material/Tooltip';
import successicon from '../../../../../assets/images/success.svg';
import close from '../../../../../assets/images/close.svg';
import ConfirmDialog from '../../../../common/Modal/ModalComponent';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const DocumentsTab = ({ formData, updateSection }) => {
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTicketIndex, setDeleteTicketIndex] = useState({
    sectionIndex: null,
    fileIndex: null,
  });

  const MAX_SECTIONS = 3;
  const { post } = useApi();

  const handleOpenModal = (sectionIndex, fileIndex) => {
    console.log('ss', sectionIndex, fileIndex);
    setDeleteTicketIndex({ sectionIndex, fileIndex });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (formData?.documents?.length) {
      const sections = formData.documents.map((doc) => ({
        id: Date.now(),
        fields: {
          ...doc,
          eventDate: doc.eventDate ? dayjs(doc.eventDate) : null,
          expiryDate: doc.expiryDate ? dayjs(doc.expiryDate) : null,
        },
        uploadedFiles: doc.upload || [],
      }));
      setDocumentSections(sections);
    }
  }, []);

  useEffect(() => {
    const injectDummyDropdowns = () => {
      const allDropdownFields = documentsSchema.filter(
        (field) => field.type === 'select',
      );

      const dummyMap = {
        documentCategory: [
          { label: 'Legal', value: 'legal' },
          { label: 'Financial', value: 'financial' },
          { label: 'HR', value: 'hr' },
        ],
        documentStatus: [
          { label: 'Approved', value: 'approved' },
          { label: 'Pending', value: 'pending' },
          { label: 'Rejected', value: 'rejected' },
        ],
        documentType: [
          { label: 'PDF', value: 'pdf' },
          { label: 'Word', value: 'doc' },
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

  // Uncomment this block if your fields contain apiEndpoint keys
  /*
  useEffect(() => {
    const fetchDropdowns = async () => {
      const dropdownFieldsWithApi = documentsSchema.filter(
        (field) => field.type === 'select' && field.apiEndpoint
      );
  
      const results = await Promise.all(
        dropdownFieldsWithApi.map(async (field) => {
          try {
            const response = await get(field.apiEndpoint);
            return { key: field.key, options: response?.data || [] };
          } catch (err) {
            console.error(Failed to fetch ${field.key} dropdown:, err);
            return { key: field.key, options: [] };
          }
        })
      );
  
      const optionsMap = {};
      results.forEach(({ key, options }) => {
        optionsMap[key] = options;
      });
  
      setDropdownOptions(optionsMap);
    };
  
    fetchDropdowns();
  }, []);
  */

  const initializeFields = () => {
    const fields = {};
    documentsSchema.forEach((field) => {
      fields[field.key] = field.type === 'date' ? null : '';
    });
    return fields;
  };

  const [documentSections, setDocumentSections] = useState([
    { id: Date.now(), fields: initializeFields(), uploadedFiles: [] },
  ]);

  const handleFieldChange = (index, key, value) => {
    const updated = [...documentSections];
    updated[index].fields[key] = value;
    setDocumentSections(updated);
    syncDocumentsToFormData(updated);
  };

  const handleAddSection = () => {
    if (documentSections.length >= MAX_SECTIONS) {
      toastError(`Only ${MAX_SECTIONS} sections allowed.`);
      return;
    }

    const newSection = {
      id: Date.now(),
      fields: initializeFields(),
      uploadedFiles: [],
    };

    const updated = [...documentSections, newSection];
    setDocumentSections(updated);
    syncDocumentsToFormData(updated);
  };

  const formatFileSize = (size) => {
    return size < 1024 * 1024
      ? `${(size / 1024).toFixed(0)} KB`
      : `${(size / 1024 / 1024).toFixed(1)} MB`;
  };

  const handleFileUpload = async (event, index) => {
    const fileInput = event.target;
    const data = Array.from(fileInput.files);
    const currentSection = [...documentSections];
    const uploadedFiles = currentSection[index].uploadedFiles || [];

    const validFiles = data.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toastError(`${file.name} exceeds 5 MB.`);
        return false;
      }
      if (uploadedFiles.some((f) => f.file.name === file.name)) {
        toastError(`${file.name} already uploaded.`);
        return false;
      }
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
      ];

      if (!allowedTypes.includes(file.type)) {
        toastError(`${file.name} is not a supported format.`);
        return false;
      }
      return true;
    });

    if (uploadedFiles.length + validFiles.length > 1) {
      toastError('Only 1 file allowed per section.');
      return;
    }

    if (validFiles.length === 0) return;

    const newFiles = validFiles.map((file) => ({
      file,
      fileName: file.name,
      progress: 10,
      size: formatFileSize(file.size),
      documentId: null,
    }));

    currentSection[index].uploadedFiles = [...uploadedFiles, ...newFiles];
    syncDocumentsToFormData([...currentSection]);
    setDocumentSections([...currentSection]);

    const formData = new FormData();
    newFiles.forEach((file) => formData.append('uploadFile', file.file));

    try {
      const res = await post(
        `${API_ENDPOINTS.ticket.uploadFile}?moduleId=1`,
        formData,
      );

      if (res?.data?.responseCode === 200) {
        const responseData = res?.data?.entity?.documentDetails || [];

        const updatedFiles = currentSection[index].uploadedFiles.map((file) => {
          const match = responseData.find((f) => f.fileName === file.file.name);
          return match
            ? {
                ...file,
                progress: 100,
                documentId: match?.documentId || null,
              }
            : {
                ...file,
                progress: file.progress,
              };
        });

        currentSection[index].uploadedFiles = updatedFiles;
        setDocumentSections(currentSection);
        syncDocumentsToFormData(currentSection);
        toastSuccess(res?.data?.message);
      } else {
        toastError('Upload failed.');
      }
    } catch (error) {
      toastError('Upload failed.');
    }

    fileInput.value = '';
  };

  const renderField = (index, field) => {
    const value = documentSections[index].fields[field.key];

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
              handleFieldChange(index, field.key, e.target.value)
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
              handleFieldChange(index, field.key, e.target.value)
            }
            labelKey="label"
            valueKey="value"
            showClearIcon={true}
          />
        );
      case 'date':
        return (
          <DatePicker
            key={field.key}
            labelName={field.label}
            isRequired={field.isRequired}
            label=""
            value={value}
            onChange={(val) => handleFieldChange(index, field.key, val)}
          />
        );
      default:
        return null;
    }
  };

  const syncDocumentsToFormData = (sections) => {
    const updated = sections.map((section) => {
      const formattedFields = { ...section.fields };

      ['eventDate', 'expiryDate'].forEach((key) => {
        const val = section.fields[key];
        if (val && dayjs(val).isValid()) {
          formattedFields[key] = dayjs(val).format('YYYY-MM-DD');
        }
      });

      return {
        ...formattedFields,
        upload: section.uploadedFiles,
      };
    });

    updateSection('documents', updated);
  };

  const handleFileRemove = async () => {
    const { sectionIndex, fileIndex } = deleteTicketIndex;
    console.log('documentSections', documentSections);
    const section = documentSections[sectionIndex];
    const file = section.uploadedFiles[fileIndex];
    console.log('file', file);
    if (!file) return;

    const documentId = file?.documentId;
    const updatedSections = [...documentSections];

    if (!documentId) {
      updatedSections[sectionIndex].uploadedFiles.splice(fileIndex, 1);
      syncDocumentsToFormData(updatedSections);
      setDocumentSections(updatedSections);
      setIsModalOpen(false);
      return;
    }

    try {
      const res = await post(`${API_ENDPOINTS.ticket.deleteFile}`, {
        documentId,
      });

      if (res?.data?.responseCode === 200) {
        toastSuccess(res.data.message);
      } else {
        toastError('Server error while deleting');
      }
    } catch (err) {
      toastError('API call failed while deleting file');
    }

    updatedSections[sectionIndex].uploadedFiles.splice(fileIndex, 1);
    setDocumentSections(updatedSections);
    setIsModalOpen(false);
    syncDocumentsToFormData(updatedSections);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight={600} fontSize="20px">
          Add Documents
        </Typography>
        <Button
          onClick={handleAddSection}
          sx={{
            mt: 1,
            textTransform: 'capitalize',
            color: '#FF7000',
            fontWeight: '600',
            outline: 'none !important',
          }}
        >
          <Box
            component="img"
            src={addCircle}
            alt="scope"
            sx={{ width: 24, height: 24, marginRight: '5px' }}
          />
          Add Additional Documents
        </Button>
      </Box>
      {documentSections.map((section, index) => (
        <Box key={section.id} sx={{ borderRadius: 2, p: 2, mb: 3 }}>
          <Grid container spacing={2}>
            {documentsSchema.map((field) => (
              <Grid item xs={12} sm={6} md={3} key={field.key}>
                {renderField(index, field)}
              </Grid>
            ))}
          </Grid>
          <Typography mt={2} mb={1}>
            Upload Document
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                flex: 1,
                border: '2px dashed #ccc',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#fff',
              }}
              onClick={() =>
                document.getElementById(`file-input-${index}`).click()
              }
            >
              <Box component="img" src={upload} alt="upload" />
              <Typography>
                Drag & Drop or
                <span style={{ color: '#FF7000', textDecoration: 'underline' }}>
                  Browse
                </span>
              </Typography>
              <Typography variant="caption">
                Only PDF files allowed - Max 5MB
              </Typography>
              <input
                id={`file-input-${index}`}
                type="file"
                multiple
                accept=".pdf,.docx,.xlsx,.txt"
                style={{ display: 'none' }}
                onChange={(e) => handleFileUpload(e, index)}
              />
            </Box>
          </Box>
          {section.uploadedFiles.length > 0 && (
            <Grid item xs={12} mt={2}>
              {section.uploadedFiles.map((file, fIndex) => (
                <Box
                  key={fIndex}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '16px',
                    padding: '8px',
                    border: '1px solid #6A6A6A',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    justifyContent: 'end',
                  }}
                >
                  <Box component="img" src={''} alt="pdf" marginLeft="10px" />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {file.file.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ marginBottom: '4px', color: '#666' }}
                    >
                      {file.size} |
                      {file.progress < 100 ? `${file.progress}%` : 'Uploaded'}
                      {file.progress < 100 && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#ff9800',
                            fontWeight: 'bold',
                            marginLeft: '10px',
                          }}
                        >
                          {Math.ceil(((100 - file.progress) / 10) * 1)} secs
                          left
                        </Typography>
                      )}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={file.progress}
                      sx={{
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor:
                            file.progress < 100 ? '#ff9800' : '#0056E0',
                        },
                      }}
                    />
                  </Box>

                  {file.progress < 100 ? (
                    <Tooltip title="Delete" placement="top">
                      <Box
                        component="img"
                        src={close}
                        alt="close"
                        marginLeft="10px"
                        sx={{
                          cursor: 'pointer',
                        }}
                        onClick={() => handleOpenModal(index, fIndex)}
                      />
                    </Tooltip>
                  ) : (
                    <Box display="flex" gap="5px">
                      <Box
                        component="img"
                        src={successicon}
                        alt="close"
                        marginLeft="10px"
                      />
                      <Tooltip title="Delete" placement="top">
                        <Box
                          component="img"
                          src={close}
                          alt="close"
                          marginLeft="10px"
                          onClick={() => handleOpenModal(index, fIndex)}
                          sx={{
                            cursor: 'pointer',
                          }}
                        />
                      </Tooltip>
                    </Box>
                  )}
                  {isModalOpen && (
                    <ConfirmDialog
                      open={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onConfirm={handleFileRemove}
                      title=" Delete"
                      description="Are you sure you want to delete this document? This action cannot be undone."
                      confirmText="Delete Document"
                      cancelText="Cancel"
                    />
                  )}
                </Box>
              ))}
            </Grid>
          )}
        </Box>
      ))}
    </Box>
  );
};

DocumentsTab.propTypes = {
  formData: PropTypes.object.isRequired,
  updateSection: PropTypes.func.isRequired,
};

export default DocumentsTab;
