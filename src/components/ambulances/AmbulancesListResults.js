import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card } from '@material-ui/core';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport
} from '@material-ui/data-grid';
import { useNavigate } from 'react-router';

const AmbulancesListResults = ({ providers, ...rest }) => {
  const navigate = useNavigate();
  const columns = [
    {
      field: 'name',
      headerName: 'Contact Name',
      width: 130,
      valueFormatter: (params) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        `${params.row.user.first_name} ${params.row.user.last_name}`
    },
    {
      field: 'company_name',
      headerName: 'Company Name',
      width: 150
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150,
      valueFormatter: (params) => params.row.user.phone
    },
    {
      field: 'reg_number',
      headerName: 'Registration Number',
      width: 150
    },
    {
      field: 'board_status',
      headerName: 'Board status',
      width: 150,
      // eslint-disable-next-line no-confusing-arrow
      valueFormatter: (params) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        params.row.board_status === 'registered' ? 'Not Allowed' : 'Allowed'
    },
    {
      field: 'current_hospital',
      headerName: 'Current Hospital',
      width: 150
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 150,
      valueFormatter: (params) => params.row.address
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 150
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

AmbulancesListResults.propTypes = {
  providers: PropTypes.array.isRequired
};

export default AmbulancesListResults;
