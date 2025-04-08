/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable no-shadow */
/* eslint-disable operator-linebreak */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { makeGetRequest } from 'src/services/httpservice';
import axios from 'axios';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useNavigate, useParams } from 'react-router';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const CreateBusiness = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [address, setAddress] = useState('');
  const [latLng, setLatLng] = useState('');

  const [initialValues, setInitialValues] = useState({
    name: '',
    phone: '',
    business_type: '',
    latitude: '',
    longitude: '',
    address: '',
    bio: '',
    active: ''
  });

  const { id } = useParams();

  const [details, setDetails] = useState(null);
  const [mode, setMode] = useState('create');

  function getDetails(serviceProviderId) {
    makeGetRequest(`businesses/${serviceProviderId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setDetails(responseJson.data.business);
          setMode('edit');

          setAddress(responseJson.data.business.address);
          setLatLng({
            lat: responseJson.data.business.latitude,
            lng: responseJson.data.business.longitude
          });

          const serviceProvider = responseJson.data.business;

          setInitialValues({
            name: serviceProvider.name,
            phone: serviceProvider.phone,
            business_type: serviceProvider.business_type,
            latitude: serviceProvider.latitude,
            longitude: serviceProvider.longitude,
            address: serviceProvider.address,
            bio: serviceProvider.bio,
            active: serviceProvider.active
          });
        } else {
          console.log('bad status returned for businesses');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (id) {
      getDetails(id);
    }
  }, [id]);

  const handleAddressChange = (address) => {
    setAddress(address);
  };

  const handleAddressSelect = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setLatLng(latLng))
      .catch((error) => console.error('Error', error));
  };

  function createServiceProvider(values) {
    axios
      .post(`${process.env.REACT_APP_API_URL}businesses`, values, {
        responseType: 'application/json'
      })
      .then((response) => {
        console.log(response);
        if (response.status) {
          if (response.data.status) {
            navigate('/app/businesses');
          } else {
            setMessage(response.data.message);
            console.log(message);
          }
        } else {
          setMessage('Something went wrong. Please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage('Something went wrong. Please try again.');
      });
  }

  function updateServiceProvider(values) {
    axios
      .post(`${process.env.REACT_APP_API_URL}businesses/${id}`, values, {
        responseType: 'application/json'
      })
      .then((response) => {
        console.log(response);
        if (response.status) {
          if (response.data.status) {
            navigate(`/app/businesses/${id}/details`);
            console.log('Log in success.');
          } else {
            setMessage(response.data.message);
            console.log(message);
          }
        } else {
          setMessage(
            'Something went wrong updating details. Please try again.'
          );
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage('Something went wrong. Please try again.');
      });
  }

  return (
    <>
      <Helmet>
        <title>Create Business</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper style={{ padding: 30 }}>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    name: Yup.string()
                      .max(64)
                      .required('Business name is required'),
                    phone: Yup.string().required('Phone is required'),
                    business_type: Yup.string().required('Business type is required'),
                    active: Yup.string().required('Business status is required'),
                    bio: Yup.string().required('Bio is required')
                  })}
                  onSubmit={async (values) => {
                    // eslint-disable-next-line no-param-reassign
                    // values.location = { address, coordinates: latLng };
                    // eslint-disable-next-line no-param-reassign
                    values.address = address;
                    // eslint-disable-next-line no-param-reassign
                    values.latitude = latLng.lat;
                    // eslint-disable-next-line no-param-reassign
                    values.longitude = latLng.lng;

                    // console.log(values);

                    if (mode === 'edit') {
                      // eslint-disable-next-line no-underscore-dangle
                      values._method = 'PUT';
                    }

                    mode === 'edit'
                      ? updateServiceProvider(values)
                      : createServiceProvider(values);
                  }}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                    touched,
                    values
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Box sx={{ mb: 3 }}>
                        <Typography color="textPrimary" variant="h3">
                          {mode === 'edit'
                            ? 'Update Business'
                            : 'Register Business'}
                        </Typography>
                      </Box>

                      <Grid container spacing={3}>
                        <Grid item xs={4}>
                          <TextField
                            select
                            error={Boolean(touched.type && errors.business_type)}
                            fullWidth
                            helperText={touched.type && errors.business_type}
                            label="Business Type"
                            margin="normal"
                            name="business_type"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.business_type}
                            variant="outlined"
                          >
                            <MenuItem value="retailer">Retailer</MenuItem>
                            <MenuItem value="wholesaler">Wholesaler</MenuItem>
                            <MenuItem value="dialysis">Dialysis</MenuItem>
                            <MenuItem value="insurance">
                              Insurance agency
                            </MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            error={Boolean(touched.name && errors.name)}
                            fullWidth
                            helperText={touched.name && errors.name}
                            label="Business Name"
                            margin="normal"
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.name}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={4}>
                          <Grid item paddingTop={2} xs={12}>
                            <PhoneInput
                              country="tz"
                              onlyCountries={['tz']}
                              masks={{ tz: '(...) ... - ...' }}
                              prefix="+"
                              countryCodeEditable={false}
                              value={values.phone}
                              onChange={(value) => {
                                console.log(value);
                                setFieldValue('phone', `+${value}`);
                              }}
                            />
                          </Grid>
                        </Grid>

                        <Grid item xs={4}>
                          <TextField
                            select
                            error={Boolean(touched.type && errors.active)}
                            fullWidth
                            helperText={touched.type && errors.active}
                            label="Business status"
                            margin="normal"
                            name="active"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.active}
                            variant="outlined"
                          >
                            <MenuItem value="0">In active</MenuItem>
                            <MenuItem value="1">Active</MenuItem>

                          </TextField>
                        </Grid>

                        <Grid item xs={12}>
                          <PlacesAutocomplete
                            value={address}
                            onChange={handleAddressChange}
                            onSelect={handleAddressSelect}
                            searchOptions={{
                              componentRestrictions: { country: ['tza'] }
                            }}
                          >
                            {({
                              getInputProps,
                              suggestions,
                              getSuggestionItemProps,
                              loading
                            }) => (
                              <div>
                                <TextField
                                  fullWidth
                                  label="Search Places..."
                                  margin="normal"
                                  name="location"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  type="text"
                                  variant="outlined"
                                  {...getInputProps()}
                                />

                                <div className="autocomplete-dropdown-container">
                                  {loading && (
                                    <Typography
                                      variant="body2"
                                      color="textPrimary"
                                    >
                                      Loading...
                                    </Typography>
                                  )}
                                  {suggestions.map((suggestion) => {
                                    const className = suggestion.active
                                      ? 'suggestion-item--active'
                                      : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                      ? {
                                        backgroundColor: '#fafafa',
                                        cursor: 'pointer'
                                      }
                                      : {
                                        backgroundColor: '#ffffff',
                                        cursor: 'pointer'
                                      };
                                    return (
                                      <div
                                        {...getSuggestionItemProps(suggestion, {
                                          className,
                                          style
                                        })}
                                      >
                                        <Grid
                                          container
                                          alignItems="center"
                                          style={{
                                            marginBottom: 5,
                                            padding: 10
                                          }}
                                        >
                                          <Grid item>
                                            <LocationOnIcon
                                              style={{ marginRight: 5 }}
                                            />
                                          </Grid>
                                          <Grid item xs>
                                            <span style={{ fontWeight: 400 }}>
                                              <Typography
                                                variant="body1"
                                                color="textPrimary"
                                              >
                                                {
                                                  suggestion.formattedSuggestion
                                                    .mainText
                                                }
                                              </Typography>
                                            </span>

                                            <Typography
                                              variant="body2"
                                              color="textSecondary"
                                            >
                                              {suggestion.description}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                        {/* <span>{suggestion.description}</span> */}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </PlacesAutocomplete>
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            multiline
                            rows={2}
                            rowsMax={4}
                            error={Boolean(touched.bio && errors.bio)}
                            fullWidth
                            helperText={touched.bio && errors.bio}
                            label="Bio"
                            margin="bio"
                            name="bio"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.bio}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>

                      {message && <Box sx={{ mb: 3 }}>{message}</Box>}

                      <Box sx={{ py: 2 }}>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          {mode === 'edit' ? 'Update' : 'Register'}
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CreateBusiness;
