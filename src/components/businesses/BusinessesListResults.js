import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card } from '@material-ui/core';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport
} from '@material-ui/data-grid';
import { useNavigate } from 'react-router';

const BusinessesListResults = ({ providers, ...rest }) => {
  const navigate = useNavigate();
  const columns = [
    {
      field: 'name',
      headerName: 'Business Name',
      width: 200
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      valueFormatter: (params) => params.row.business_type.charAt(0).toUpperCase() + params.row.business_type.slice(1)
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 200,
      valueFormatter: (params) => params.row.address
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 200
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 150,
      valueFormatter: (params) => (params.row.active ? 'Yes' : 'No')
    }
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          {providers && (
            <DataGrid
              autoHeight
              rows={providers}
              columns={columns}
              onRowClick={(params) => {
                navigate(`${params.row.id.toString()}/details`);
              }}
              components={{
                Toolbar: CustomToolbar
              }}
            />
          )}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

BusinessesListResults.propTypes = {
  providers: PropTypes.array.isRequired
};

export default BusinessesListResults;
