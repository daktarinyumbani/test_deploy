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

const CreateAmbulance = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [address, setAddress] = useState('');
  const [latLng, setLatLng] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    phone: '',
    password: '000000000',
    qualification: '',
    reg_number: '',
    board_status: '',
    current_hospital: '',
    latitude: '',
    longitude: '',
    address: '',
    bio: '',
    cost: 0
  });

  const { id } = useParams();

  const [details, setDetails] = useState(null);
  const [mode, setMode] = useState('create');

  function getDetails(serviceProviderId) {
    makeGetRequest(`ambulances/${serviceProviderId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setDetails(responseJson.data.ambulance);
          setMode('edit');

          setAddress(responseJson.data.ambulance.address);
          setLatLng({
            lat: responseJson.data.ambulance.latitude,
            lng: responseJson.data.ambulance.longitude
          });

          const serviceProvider = responseJson.data.ambulance;

          setInitialValues({
            first_name: serviceProvider.user.first_name,
            last_name: serviceProvider.user.last_name,
            company_name: serviceProvider.company_name,
            phone: serviceProvider.user.phone,
            qualification: serviceProvider.qualification,
            reg_number: serviceProvider.reg_number,
            board_status: serviceProvider.board_status,
            current_hospital: serviceProvider.current_hospital,
            latitude: serviceProvider.latitude,
            longitude: serviceProvider.longitude,
            address: serviceProvider.address,
            bio: serviceProvider.bio,
            cost: serviceProvider.cost
          });
        } else {
          console.log('bad status returned for ambulance');
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
      .post(`${process.env.REACT_APP_API_URL}ambulances`, values, {
        responseType: 'application/json'
      })
      .then((response) => {
        console.log(response);
        if (response.status) {
          if (response.data.status) {
            navigate('/app/ambulances');
            console.log('Log in success.');
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
      .post(`${process.env.REACT_APP_API_URL}ambulances/${id}`, values, {
        responseType: 'application/json'
      })
      .then((response) => {
        console.log(response);
        if (response.status) {
          if (response.data.status) {
            navigate(`/app/ambulances/${id}/details`);
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
        <title>Create Ambulance</title>
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
                    first_name: Yup.string()
                      .max(64)
                      .required('First name is required'),
                    last_name: Yup.string().required('Last name is required'),
                    company_name: Yup.string().required(
                      'Company name is required'
                    ),
                    phone: Yup.string().required('Phone is required'),
                    reg_number: Yup.string()
                      .max(64)
                      .required('Reg. Number is required'),
                    board_status: Yup.string().required(
                      'Board status is required'
                    ),
                    current_hospital: Yup.string()
                      .max(64)
                      .required('Current Hospital is required'),
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
                            ? 'Update Ambulance'
                            : 'Register Ambulance'}
                        </Typography>
                      </Box>

                      <Grid container spacing={3}>
                        <Grid item xs={4}>
                          <TextField
                            error={Boolean(
                              touched.first_name && errors.first_name
                            )}
                            fullWidth
                            helperText={touched.first_name && errors.first_name}
                            label="First Name"
                            margin="normal"
                            name="first_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.first_name}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={4}>
                          <TextField
                            error={Boolean(
                              touched.last_name && errors.last_name
                            )}
                            fullWidth
                            helperText={touched.last_name && errors.last_name}
                            label="Last Name"
                            margin="normal"
                            name="last_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.last_name}
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
                            error={Boolean(
                              touched.company_name && errors.company_name
                            )}
                            fullWidth
                            helperText={
                              touched.company_name && errors.company_name
                            }
                            label="Company Name"
                            margin="normal"
                            name="company_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.company_name}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={4}>
                          <TextField
                            error={Boolean(
                              touched.reg_number && errors.reg_number
                            )}
                            fullWidth
                            helperText={touched.reg_number && errors.reg_number}
                            label="Registration Number"
                            margin="normal"
                            name="reg_number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.reg_number}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={4}>
                          <TextField
                            select
                            error={Boolean(
                              touched.board_status && errors.board_status
                            )}
                            fullWidth
                            helperText={
                              touched.board_status && errors.board_status
                            }
                            label="Board Status"
                            margin="normal"
                            name="board_status"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.board_status}
                            variant="outlined"
                          >
                            <MenuItem value="registered">
                              Not allowed to practice
                            </MenuItem>
                            <MenuItem value="allowed">
                              Allowed to practice
                            </MenuItem>
                          </TextField>
                        </Grid>

                        <Grid item xs={4}>
                          <TextField
                            error={Boolean(
                              touched.current_hospital &&
                                errors.current_hospital
                            )}
                            fullWidth
                            helperText={
                              touched.current_hospital &&
                              errors.current_hospital
                            }
                            label="Current Hospital"
                            margin="normal"
                            name="current_hospital"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.current_hospital}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={4}>
                          <TextField
                            error={Boolean(touched.cost && errors.cost)}
                            fullWidth
                            helperText={touched.cost && errors.cost}
                            label="Cost"
                            margin="normal"
                            name="cost"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.cost}
                            variant="outlined"
                          />
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

export default CreateAmbulance;
