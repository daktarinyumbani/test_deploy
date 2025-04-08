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

const RequestListResults = ({ requests, ...rest }) => {
  const columns = [
    {
      field: 'name',
      headerName: 'Patient Name',
      width: 200,
      valueFormatter: (params) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        `${params.row.user.first_name} ${params.row.user.last_name}`
    },
    {
      field: 'service_provider_name',
      headerName: 'Service Provider Name',
      width: 150,
      valueFormatter: (params) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        `${params.row.service_provider.user.first_name} ${params.row.service_provider.user.last_name}`
    },
    {
      field: 'date',
      headerName: 'Date Time',
      width: 150
    },
    {
      field: 'requests_count',
      headerName: 'Requests',
      width: 150
    },
    {
      field: 'created_at',
      headerName: 'Requested At',
      width: 200
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
            rows={requests}
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

RequestListResults.propTypes = {
  requests: PropTypes.array.isRequired
};

export default RequestListResults;
