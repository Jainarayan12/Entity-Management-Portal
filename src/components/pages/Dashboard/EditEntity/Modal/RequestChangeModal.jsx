import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
  Grid,
  Paper,
  LinearProgress,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import pdf from '../../../../../assets/images/excel.png';
import close from '../../../../../assets/images/close.svg';
import upload from '../../../../../assets/images/upload-icon.svg';
import Tooltip from '@mui/material/Tooltip';
import ConfirmDialog from '../../../../common/Modal/ModalComponent';
import CloseIcon from '@mui/icons-material/Close';
import successicon from '../../../../../assets/images/success.svg';
import { API_ENDPOINTS } from '../../../../../core/utils/apiEndpoints';
import { toastSuccess, toastError } from '../../../../common/Toast/Toast';
import useApi from '../../../../../core/api-service/useApi';
import ApprovedReviewModal from './ApprovedReviewModal';
import { useNavigate } from 'react-router-dom';

const tableHeaders = [
  'Fields Name',
  'Current',
  'New',
  'Submitted By',
  'Reviewed By',
  'Origin Remarks',
];

const dummyData = {
  changes: [
    {
      field: 'Business Unit',
      current: 'Agri-Products',
      new: 'Food Ingredients',
      submittedBy: 'Anandh R',
      reviewedBy: '--',
      originRemarks: 'Subject to seasonal availability',
    },
    {
      field: 'Sub Business Unit',
      current: 'Rice',
      new: 'Spices',
      submittedBy: 'Anandh R',
      reviewedBy: '--',
      originRemarks: 'Subject to seasonal availability',
    },
    {
      field: 'Executive In Charge',
      current: 'John Doe',
      new: 'David Wong',
      submittedBy: 'Anandh R',
      reviewedBy: '--',
      originRemarks: 'Updated due to internal restructuring',
    },
    {
      field: 'Contact Person',
      current: 'Sarah Lee',
      new: 'Lisa Carter',
      submittedBy: 'Anandh R',
      reviewedBy: '--',
      originRemarks: 'Updated to reflect the latest point of contact',
    },
    {
      field: 'Financial Controller',
      current: 'Michael Tan',
      new: 'Robert Singh',
      submittedBy: 'Anandh R',
      reviewedBy: '--',
      originRemarks: 'New appointment following organizational change',
    },
  ],
  files: [],
};

const RequestChangesModal = ({ open, onClose }) => {
  const [changeData, setChangeData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [displayReviewModal, setDisplayReviewModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [deleteTicketIndex, setDeleteTicketIndex] = useState();
  const { post } = useApi();
  const navigate = useNavigate();
  const handleOpenModal = (file) => {
    setDeleteTicketIndex(file);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (open) {
      setChangeData(dummyData.changes);
      setUploadedFiles(dummyData.files);
    }
  }, [open]);

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
    const files = Array.from(fileInput.files);
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
    ];

    const validFiles = files.filter((file) => {
      if (file.size > 250 * 1024 * 1024) {
        toastError(`${file.name} exceeds 250 MB.`);
        return false;
      }

      if (uploadedFiles.some((f) => f.file.name === file.name)) {
        toastError(`${file.name} already uploaded.`);
        return false;
      }

      if (!allowedTypes.includes(file.type)) {
        toastError(`${file.name} is not a supported format.`);
        return false;
      }

      return true;
    });

    if (uploadedFiles.length + validFiles.length > 20) {
      toastError('Only 20 files allowed.');
      return;
    }

    if (validFiles.length === 0) return;

    const newFiles = validFiles.map((file) => ({
      file,
      progress: 0,
      size: formatFileSize(file.size),
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    const formData = new FormData();
    newFiles.forEach((file) => formData.append('uploadFile', file.file));

    let overallProgress = 0;
    let interval = setInterval(() => {
      overallProgress = Math.min(overallProgress + 10, 95);
      setUploadedFiles((prev) =>
        prev.map((file) => ({
          ...file,
          progress:
            file.progress < 100 ? Math.min(file.progress + 10, 95) : 100,
        })),
      );
    }, 500);

    try {
      const response = await post(
        ` ${API_ENDPOINTS.ticket.uploadFile}?moduleId=1`,
        formData,
      );

      clearInterval(interval);

      if (response?.data?.responseCode === 200) {
        const responseData = response.data.entity.documentDetails || [];

        const updatedFiles = [...uploadedFiles, ...newFiles].map((file) => {
          const match = responseData.find(
            (res) => res.fileName === file.file.name,
          );
          return {
            ...file,
            progress: 100,
            documentId: getDocumentId?.(file, match),
          };
        });

        setUploadedFiles(updatedFiles);
        toastSuccess(response.data.message);
      } else {
        toastError('Upload failed!');
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

  const handleFileRemove = async (setFieldValue) => {
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
        setFieldValue('files', updatedFiles);
        setUploadedFiles(updatedFiles);
        setIsModalOpen(false);
      }
    } else {
      const updatedFiles = uploadedFiles.filter(
        (_, i) => i !== deleteTicketIndex,
      );
      setFieldValue('files', updatedFiles);
      setUploadedFiles(updatedFiles);
      setIsModalOpen(false);
    }
  };

  const handleSingleReupload = async (file) => {
    const formData = new FormData();
    formData.append('uploadFile', file.file);

    let overallProgress = 10;
    let interval;

    try {
      interval = setInterval(() => {
        if (overallProgress < 95) {
          overallProgress = Math.min(overallProgress + 10, 95);
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.file.name === file.file.name
                ? { ...f, progress: overallProgress }
                : f,
            ),
          );
        } else {
          clearInterval(interval);
        }
      }, 500);

      const response = await post(
        `${API_ENDPOINTS.ticket.uploadFile}?moduleId=1`,
        formData,
      );

      clearInterval(interval);

      if (response?.data?.responseCode === 200) {
        const responseData = response.data.entity.documentDetails || [];

        const updatedFiles = uploadedFiles.map((f) => {
          const isMatched = responseData.find(
            (r) => r.fileName === f.file.name,
          );

          return f.file.name === file.file.name
            ? {
                ...f,
                progress: 100,
                documentId: getDocumentId(f, isMatched),
              }
            : f;
        });

        setUploadedFiles(updatedFiles);
        toastSuccess(response.data.message);
      } else {
        toastError('Upload failed.');
      }
    } catch (error) {
      clearInterval(interval);
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.file.name === file.file.name ? { ...f, progress: 0 } : f,
        ),
      );
      toastError('Re-upload failed!');
    }
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    setDisplayReviewModal(true);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        Olam International DMCC
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 16, top: 16 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Request for changes
        </Typography>

        <Paper variant="outlined" sx={{ mb: 3 }}>
          <Table sx={{ border: '1px solid #ddd', borderCollapse: 'collapse' }}>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      border: '1px solid #ddd',
                      fontWeight: 600,
                      backgroundColor: '#f9f9f9',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {changeData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    {row.field}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    {row.current}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    {row.new}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    {row.submittedBy}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    {row.reviewedBy}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    {row.originRemarks}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Attached Docs
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
            <Box component="img" src={upload} alt="upload" />
            <Typography>
              Drag & Drop or
              <span style={{ color: '#FF7000', textDecoration: 'underline' }}>
                Browse
              </span>
            </Typography>
            <Typography variant="caption">
              docx, pdf, xlxs, txt - max 20 files, with a total size limit of
              250 MB
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
        {uploadedFiles?.length > 0 && (
          <Grid item xs={12} mt={2}>
            {uploadedFiles?.map((file, index) => (
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
                <Box component="img" src={pdf} alt="pdf" marginLeft="10px" />
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
                    {file?.file?.name}
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
                        {Math.ceil(((100 - file.progress) / 10) * 1)} secs left
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
                  <>
                    <Tooltip title="Delete" placement="top">
                      <Box
                        component="img"
                        src={close}
                        alt="close"
                        marginLeft="10px"
                        sx={{
                          cursor: 'pointer',
                        }}
                        onClick={() => handleOpenModal(index)}
                      />
                    </Tooltip>
                    <Tooltip title="re-upload">
                      <IconButton
                        onClick={() => handleSingleReupload(file)}
                        sx={{
                          color: 'orange',
                          outline: 'none !important',
                          cursor: 'pointer',
                          marginLeft: '10px',
                          padding: 0,
                        }}
                      >
                        <ReplayIcon />
                      </IconButton>
                    </Tooltip>
                  </>
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
      </DialogContent>
      <DialogActions sx={{ padding: '20px' }}>
        <Button
          onClick={() => {
            // onClose()
            setIsModalCancel(true);
          }}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#FF7000',
            textTransform: 'none',
            '&:hover': {
              background: '#FF7000',
            },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>

      <ApprovedReviewModal
        open={displayReviewModal}
        onClose={() => {
          setIsModalOpen(false)
          setDisplayReviewModal(false);
        }}
        onReview={() => navigate('/view-request-status')}
      />
      <ConfirmDialog
        open={isModalCancel}
        onClose={() => setIsModalCancel(false)}
        onConfirm={() => navigate('/edit-entity')}
        title="Confirm Cancellation"
        description="You have unsaved changes. If you cancel now, all progress will be lost."
        confirmText="Yes, Cancel"
        cancelText="Go Back & Save"
        note="Are you sure you want to cancel?"
      />
    </Dialog>
  );
};

RequestChangesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RequestChangesModal;
