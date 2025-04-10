import PropTypes from 'prop-types';
import {
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  flexRender,
  useMaterialReactTable,
} from 'material-react-table';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; 
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Button,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { default as MetaLogo } from '../../../assets/images/meta.svg';
import { default as WorkplaceLogo } from '../../../assets/images/workplace.svg';

const CustomSearchBar = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

const TableComponent = ({
  columns,
  data,
  pageSizeOptions ,
  defaultPageSize ,
  enableRowSelection,
  initialPageIndex ,
  // toolbarTitle,
  customRenderers = {},
}) => {
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection,
    initialState: {
      pagination: { pageSize: defaultPageSize, pageIndex: initialPageIndex },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: pageSizeOptions,
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
  });


  return (
    
    <Stack sx={{ m: '0', padding: '20px', backgroundColor: '#ffffff' }}>
      <Box
        variant="h5"
        sx={{
        display:'flex',
        flexDirection:'column',
        width:'250px',
        height:'53px'
        }}
      >
        <Box style={{display: 'flex',gap:'8px',alignItems:'center'}}>
        <img src={WorkplaceLogo}></img>
        <Typography sx={{color :'#4427CE',fontSize:'19px',fontWeight:700}}>Groups </Typography>
        </Box>
        <img src={MetaLogo} alt="meta-logo"  
        style={{ 
           width: '77px',
           display: 'flex',
           marginLeft: 'auto',
           marginTop:'3px'
        }}/>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mb: 2,
          gap:2
        }}
      >
        <CustomSearchBar
          placeholder="Search By All"
          size="small"
          onChange={(e) => table.setGlobalFilter(e.target.value)}
        />
         <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Selected Rows
          </Button>
      </Box>
      <TableContainer
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          padding: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    align="left" 
                    variant="head"
                    key={header.id}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '14px',
                      backgroundColor: '#eceff1',
                      borderBottom: '2px solid #ccc',
                      padding: header.id === "mrt-row-select" ?'0':'12px',
                    }}
                  >
                
                          {header.id === "mrt-row-select" ? (
            <Checkbox
              checked={table.getIsAllRowsSelected()} 
              indeterminate={table.getIsSomeRowsSelected()} 
              onChange={table.getToggleAllRowsSelectedHandler()} 
            />
          ) : (
            flexRender(
              header.column.columnDef.header,
              header.getContext()
            )
          )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow key={row.id} selected={row.getIsSelected()} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    align="left" 
                    variant="body"
                    key={cell.id}
                    sx={{
                      padding: '10px 8px',
                      borderBottom: '1px solid #ddd',
                      color: '#555',
                    }}
                  >
                    {customRenderers[cell.column.id] ? (
                      customRenderers[cell.column.id](cell.getValue(), row)
                    ) : (
                      <MRT_TableBodyCellValue
                        cell={cell}
                        table={table}
                        staticRowIndex={rowIndex}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
        }}
      >
        <MRT_TablePagination table={table} 
        muiPaginationProps={{
          sx: {
            '& .MuiInputLabel-root': {
              display: 'none', 
            },
          },
        }}/>
      </Box>
      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
    </Stack>
  );
};

TableComponent.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      accessorKey: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  defaultPageSize: PropTypes.number,
  initialPageIndex: PropTypes.number,
  enableRowSelection:PropTypes.bool,
  toolbarTitle: PropTypes.string,
  customRenderers: PropTypes.objectOf(PropTypes.func),
};

// TableComponent.defaultProps = {
//   pageSizeOptions: [5, 10, 15],
//   defaultPageSize: 5,
//   initialPageIndex: 0,
//   toolbarTitle: 'Workplace Details',
//   customRenderers: {},
// };

export default TableComponent;