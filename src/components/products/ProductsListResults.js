/* eslint-disable */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, TextField, IconButton, Avatar } from '@material-ui/core';
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

const ProductsListResults = ({ products, ...rest }) => {
  const navigate = useNavigate();
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 280,
      valueFormatter: (params) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        `${params.row.brand.name}`
    },

    {
      field: 'generic',
      headerName: 'Generic',
      width: 250,
      valueFormatter: (params) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        `${params.row.brand.generic.name}`

    },

    {
      field: 'images',
      headerName: 'Avator',
      width: 300,
      renderCell: (params) =>
        //   params?.row.images.map(image => {
        <img src={params?.row.images[0]?.img_url || "http://via.placeholder.com/300"}
          style={{
            width: 100,
            height: 200,

          }}
        />

      //   })
    },

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

  console.log('products', products)
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState(products);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = products.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field] ? row[field].toString() : '');
      });
    });
    setRows(filteredRows);
  };

  useEffect(() => {
    setRows(products);
  }, [products]);

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
          {products && (
            <DataGrid
              autoHeight
              rowHeight={100}
              rowSpacingType="border"
              sx={{ border: 2 }}
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

ProductsListResults.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductsListResults;
