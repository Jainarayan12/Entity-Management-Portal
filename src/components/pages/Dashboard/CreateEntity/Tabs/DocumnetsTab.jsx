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

const DocumentsTab = ({ formValues, setFormValues }) => {
  const MAX_SECTIONS = 3;
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTicketIndex, setDeleteTicketIndex] = useState();
  const { post } = useApi();

  const handleFieldChange = (index, key, value) => {
    const updated = [...documentSections];
    updated[index].fields[key] = value;
    setDocumentSections(updated);
  };

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

  const handleAddSection = () => {
    if (documentSections.length >= MAX_SECTIONS) {
      toastError(`Only ${MAX_SECTIONS} sections allowed.`);
      return;
    }
    setDocumentSections((prev) => [
      ...prev,
      { id: Date.now(), fields: initializeFields(), uploadedFiles: [] },
    ]);
  };

  const formatFileSize = (size) => {
    return size < 1024 * 1024
      ? `${(size / 1024).toFixed(0)} KB`
      : `${(size / 1024 / 1024).toFixed(1)} MB`;
  };

  const getDocumentId = (file, isMatched) => {
    if (file.documentId) {
      return file.documentId;
    } else if (isMatched?.documentId) {
      return isMatched.documentId;
    } else {
      return null;
    }
  };

  const handleFileUpload = async (event) => {
    const fileInput = event.target;
    const data = Array.from(event.nativeEvent.srcElement.files).map(
      (file) => file,
    );

    // validate new files
    const validFiles = data.filter((file) => {
      // file size check
      if (file.size > 15 * 1024 * 1024) {
        toastError(
          `${file.name} size exceeds 5 MB. PDF size should not exceed 5 MB.`,
        );
        return false;
      }

      // check for duplicates
      const isDuplicate = uploadedFiles.some(
        (uploadedFile) => uploadedFile.file.name === file.name,
      );

      if (isDuplicate) {
        toastError(`${file.name} is already uploaded.`);
        return false;
      }

      // check file type
      if (file.type !== 'application/pdf') {
        toastError(`${file.name} is not a PDF. Only PDF files are allowed.`);
        return false;
      }

      return true;
    });

    // max length check
    if (uploadedFiles.length + validFiles.length > 1) {
      toastError('Upload limit exceeded. You cannot upload more than 1 files');
      return;
    }

    if (validFiles.length == 0) {
      return;
    }

    const newFiles = validFiles.map((file) => ({
      file: file,
      progress: 0,
      size: formatFileSize(file.size),
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    const formData = new FormData();
    newFiles.forEach((file) => {
      formData.append('uploadFile', file.file);
    });

    let overallProgress = 0;
    let interval;
    try {
      interval = setInterval(() => {
        overallProgress = Math.min(overallProgress + 10, 95);
        setUploadedFiles((prev) =>
          prev.map((file) => ({
            ...file,
            progress:
              file.progress < 100 ? Math.min(file.progress + 10, 95) : 100,
          })),
        );
      }, 500);

      const response = await post(
        `${API_ENDPOINTS.ticket.uploadFile}?moduleId=1`,
        formData,
      );

      if (response?.data?.responseCode == 200) {
        const responseData = response.data.entity.documentDetails;
        clearInterval(interval);
        const updatedFiles = [...uploadedFiles, ...newFiles].map((file) => {
          const isMatched = responseData.find(
            (res) => res.fileName === file.file.name,
          );

          return {
            ...file,
            progress: file.progress < 100 ? 100 : file.progress,
            documentId: getDocumentId(file, isMatched),
          };
        });
        toastSuccess(response.data?.message);
        setUploadedFiles(updatedFiles);
      }
    } catch (error) {
      clearInterval(interval);
      setUploadedFiles((prev) =>
        prev.map((file) => ({
          ...file,
          progress: file.progress < 100 ? 0 : file.progress,
        })),
      );

      toastError('Upload failed!');
    }

    fileInput.value = '';
  };
  const handleFileRemove = async () => {
    const indexDocumentId = uploadedFiles[deleteTicketIndex]?.documentId;
    if (indexDocumentId) {
      const obj = {
        documentId: indexDocumentId,
      };
      const data = await post(`${API_ENDPOINTS.ticket.deleteFile}`, obj);
      if (data?.data?.responseCode == 200) {
        toastSuccess(data?.data?.message);
        const updatedFiles = uploadedFiles.filter(
          (_, i) => i !== deleteTicketIndex,
        );

        setUploadedFiles(updatedFiles);
        setIsModalOpen(false);
      }
    } else {
      const updatedFiles = uploadedFiles.filter(
        (_, i) => i !== deleteTicketIndex,
      );
      setUploadedFiles(updatedFiles);
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = (file) => {
    setDeleteTicketIndex(file);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderField = (index, field, value) => {
    console.log('fffffffff', field);
    // const value = formValues?.documents?.[field.key] || '';

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
            options={field.options || []}
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
            value={formValues?.entityDetails?.[field.key] || null}
            onChange={(value) => handleFieldChange(index, field.key, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
        onClick={handleAddSection}
      >
        <Typography variant="h6" fontWeight={600} fontSize="20px">
          Add Documents
        </Typography>
        <Button
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
          Add Additional Documents
        </Button>
      </Box>
      {documentSections.map((section, index) => (
        <Box
          key={section.id}
          sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 3 }}
        >
          <Grid container spacing={2}>
            {documentsSchema.map((field) => (
              <Grid item xs={12} sm={6} md={3} key={field.key}>
                {renderField(index, field, field.value)}
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '20px',
                color: '#2E2D2C',
                marginBottom: '10px',
              }}
            >
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
                onClick={() => document.getElementById('file-input').click()}
              >
                <Box
                  component="img"
                  src={upload}
                  alt="Logo"
                  marginRight="10px"
                />
                <Typography variant="body1">
                  Drag & Drop or
                  <Typography
                    component="span"
                    sx={{
                      color: '#FF7000',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      marginLeft: '5px',
                    }}
                  >
                    Browse
                  </Typography>
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    marginTop: '8px',
                    color: '#00000099',
                    fontWeight: '400px',
                    fontSize: '12px',
                  }}
                >
                  File supportive docx, pdf, xlxs, txt - Max 5MB
                </Typography>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept=".pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e)}
                />
              </Box>
            </Box>
          </Grid>
          {section.uploadedFiles.length > 0 && (
            <Grid item xs={12} marginTop="16px">
              {section.uploadedFiles.map((file, index) => (
                <Box
                  key={index}
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
                        onClick={() => {
                          handleFileRemove();
                        }}
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
                          onClick={() => handleOpenModal(index)}
                          sx={{
                            cursor: 'pointer',
                          }}
                        />
                      </Tooltip>
                    </Box>
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
  formValues: PropTypes.object.isRequired,
  setFormValues: PropTypes.func.isRequired,
};

export default DocumentsTab;
