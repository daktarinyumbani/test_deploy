/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card } from '@material-ui/core';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport
} from '@material-ui/data-grid';

const UsersListResults = ({ users, ...rest }) => {
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      valueFormatter: (params) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        `${params.row.first_name} ${params.row.last_name}`
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 150,
      valueFormatter: (params) =>
        params.row.location ? params.row.location.address : ''
    },
    {
      field: 'requests_count',
      headerName: 'Requests',
      width: 150
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
          <DataGrid
            autoHeight
            rows={users}
            columns={columns}
            components={{
              Toolbar: CustomToolbar
            }}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

UsersListResults.propTypes = {
  users: PropTypes.array.isRequired
};

export default UsersListResults;
