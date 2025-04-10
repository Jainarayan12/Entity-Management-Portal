import { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import SearchInput from '../../common/SearchInput/SearchInput';
import close from '../../../assets/images/close.svg';
import drag from '../../../assets/images/drag.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ManageGridPreferences = ({
  open,
  onClose,
  columns,
  selectedColumns,
  onColumnChange,
  onDragEnd,
  onSave,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        container: document.getElementById('drawer-root'),
        style: { zIndex: 1300 },
      }}
      PaperProps={{
        sx: {
          zIndex: 1400,
          position: 'fixed',
          top: 0,
          height: '100vh',
        },
      }}
    >
      <Box
        sx={{
          width: 320,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          right: 0,
          backgroundColor: '#fff',
          zIndex: 1301,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #BDBDBD',
          }}
        >
          <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
            Manage Grid Preferences
          </Typography>
          <IconButton onClick={onClose} sx={{ padding: 0 }}>
            <Box
              component="img"
              src={close}
              alt="close"
              sx={{ width: 24, height: 24 }}
            />
          </IconButton>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Search column
          </Typography>
          <SearchInput
            placeholder="Search column"
            value={searchTerm}
            showClearIcon={true}
            onChange={handleSearch}
          />
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', minHeight: 250 }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="columns">
              {(provided) => (
                <List ref={provided.innerRef} {...provided.droppableProps}>
                  {columns.map((col, index) => {
                    const matchesSearch = col.label
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                    return (
                      <Draggable
                        key={`col-${col.key}`}
                        draggableId={`col-${col.key}`}
                        index={index}
                      >
                        {(provided) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              opacity: matchesSearch ? 1 : 0.5, // Adjust visibility instead of display
                              visibility: matchesSearch ? 'visible' : 'hidden', // Hide but keep in DOM
                              alignItems: 'center',
                              gap: 1,
                              px: 2,
                              py: 1,
                              cursor: 'grab',
                            }}
                          >
                            <Box
                              component="img"
                              src={drag}
                              alt="drag"
                              sx={{ width: 24, height: 24 }}
                            />
                            <Checkbox
                              checked={selectedColumns.includes(col.key)}
                              onChange={() => onColumnChange(col.key)}
                              sx={{
                                color: '#FF7000',
                                '&.Mui-checked': {
                                  color: '#FF7000',
                                },
                              }}
                            />
                            <ListItemText primary={col.label} />
                          </ListItem>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: 2, p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={onClose}
            sx={{ borderColor: '#999', color: '#333', textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#FF7000', textTransform: 'none' }}
            onClick={() => onSave(selectedColumns)}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

ManageGridPreferences.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  onColumnChange: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ManageGridPreferences;
