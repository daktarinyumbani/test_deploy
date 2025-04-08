/* eslint-disable */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, TextField, IconButton } from '@material-ui/core';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton
} from '@material-ui/data-grid';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { useNavigate } from 'react-router';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const ServiceProvidersListResults = ({ providers, ...rest }) => {
  const navigate = useNavigate();
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 130,
      valueFormatter: (params) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        `${params.row.user.first_name} ${params.row.user.last_name}`
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
      field: 'category',
      headerName: 'Category',
      width: 150,
      valueFormatter: (params) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        `${params.row.specialty.category.name} - ${params.row.specialty.name}`
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

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  const defaultTheme = createTheme();
  const useStyles = makeStyles(
    (theme) => ({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      },
      textField: {
        [theme.breakpoints.down('xs')]: {
          width: '100%'
        },
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5)
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${theme.palette.divider}`
        }
      }
    }),
    { defaultTheme }
  );

  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState(providers);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = providers.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field] ? row[field].toString() : '');
      });
    });
    setRows(filteredRows);
  };

  useEffect(() => {
    setRows(providers);
  }, [providers]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  function QuickSearchToolbar(props) {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <div>
          <GridToolbarFilterButton />
          <GridToolbarExport />
        </div>
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          className={classes.textField}
          placeholder="Search…"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )
          }}
        />
      </div>
    );
  }

  QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          {providers && (
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              onRowClick={(params) => {
                navigate(`${params.row.id.toString()}/details`);
              }}
              components={{
                Toolbar: QuickSearchToolbar
              }}
              componentsProps={{
                toolbar: {
                  value: searchText,
                  onChange: (event) => requestSearch(event.target.value),
                  clearSearch: () => requestSearch('')
                }
              }}
            />
          )}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

ServiceProvidersListResults.propTypes = {
  providers: PropTypes.array.isRequired
};

export default ServiceProvidersListResults;
