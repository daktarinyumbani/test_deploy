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

const CreateServiceProvider = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [services, setServices] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [address, setAddress] = useState('');
  const [latLng, setLatLng] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    password: '000000000',
    specialty_id: '',
    qualification: '',
    reg_number: '',
    board_status: '',
    current_hospital: '',
    latitude: '',
    longitude: '',
    address: '',
    bio: '',
    cost: 0,
    services: ''
  });

  const { id } = useParams();

  const [details, setDetails] = useState(null);
  const [mode, setMode] = useState('create');

  const onServiceChecked = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((x) => x !== id));
    } else {
      setSelectedServices((selectedServices) => [...selectedServices, id]);
    }
  };

  function getDetails(serviceProviderId) {
    makeGetRequest(`service-providers/${serviceProviderId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setDetails(responseJson.data.provider);
          setMode('edit');

          setAddress(responseJson.data.provider.address);
          setLatLng({
            lat: responseJson.data.provider.latitude,
            lng: responseJson.data.provider.longitude
          });

          const serviceProvider = responseJson.data.provider;

          serviceProvider.services.map((service) => {
            onServiceChecked(service.id);
          });

          setInitialValues({
            first_name: serviceProvider.user.first_name,
            last_name: serviceProvider.user.last_name,
            phone: serviceProvider.user.phone,
            specialty_id: serviceProvider.specialty_id,
            qualification: serviceProvider.qualification,
            reg_number: serviceProvider.reg_number,
            board_status: serviceProvider.board_status,
            current_hospital: serviceProvider.current_hospital,
            latitude: serviceProvider.latitude,
            longitude: serviceProvider.longitude,
            address: serviceProvider.address,
            bio: serviceProvider.bio,
            cost: serviceProvider.cost,
            services: ''
          });
        } else {
          console.log('bad status returned for provider');
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

  function getSpecialties() {
    makeGetRequest('specialties')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setSpecialties(responseJson.data.specialties);
        } else {
          console.log('bad status returned for specialties');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getServices() {
    makeGetRequest('services')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setServices(responseJson.data.services);
        } else {
          console.log('bad status returned for services');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function createServiceProvider(values) {
    axios
      .post(`${process.env.REACT_APP_API_URL}service-providers`, values, {
        responseType: 'application/json'
      })
      .then((response) => {
        console.log(response);
        if (response.status) {
          if (response.data.status) {
            navigate('/app/service-providers');
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
      .post(`${process.env.REACT_APP_API_URL}service-providers/${id}`, values, {
        responseType: 'application/json'
      })
      .then((response) => {
        console.log(response);
        if (response.status) {
          if (response.data.status) {
            navigate(`/app/service-providers/${id}/details`);
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

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    getSpecialties();
  }, []);

  return (
    <>
      <Helmet>
        <title>Create Service Provider</title>
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
                    phone: Yup.string().required('Phone is required'),
                    specialty_id: Yup.string()
                      .max(64)
                      .required('Specialty is required'),
                    qualification: Yup.string().required(
                      'Qualification is required'
                    ),
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
                    // eslint-disable-next-line no-param-reassign
                    values.services = selectedServices;

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
                          Register Service Provider
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
                            select
                            error={Boolean(
                              touched.specialty_id && errors.specialty_id
                            )}
                            fullWidth
                            helperText={
                              touched.specialty_id && errors.specialty_id
                            }
                            label="Specialty"
                            margin="normal"
                            name="specialty_id"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.specialty_id}
                            variant="outlined"
                          >
                            <MenuItem value="">Select category</MenuItem>
                            {specialties.map((specialty) => (
                              <MenuItem key={specialty.id} value={specialty.id}>
                                {`${specialty.category.name} - ${specialty.name}`}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            error={Boolean(
                              touched.qualification && errors.qualification
                            )}
                            fullWidth
                            helperText={
                              touched.qualification && errors.qualification
                            }
                            label="Qualification"
                            margin="normal"
                            name="qualification"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.qualification}
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
                                {/* <input
                                  style={{ width: '100%' }}
                                  {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className:
                                      'text-input form-control-text custom-form-select'
                                  })}
                                /> */}
                                {/* {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => (
                                  <Grid container alignItems="center">
                                    <Grid item>
                                      <LocationOnIcon
                                        style={{ marginRight: 2 }}
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <span style={{ fontWeight: 400 }}>
                                        {suggestion.description}
                                      </span>

                                      <Typography
                                        variant="body2"
                                        color="textSecondary"
                                      >
                                        {suggestion.description}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                ))} */}
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

                        <Grid item xs={12}>
                          {services.map((service) => {
                            if (service.visible) {
                              return (
                                <FormControlLabel
                                  label={service.name}
                                  control={
                                    <Checkbox
                                      checked={selectedServices.includes(
                                        service.id
                                      )}
                                      onChange={() =>
                                        // eslint-disable-next-line implicit-arrow-linebreak
                                        onServiceChecked(service.id)
                                      }
                                      inputProps={{
                                        'aria-label': 'primary checkbox'
                                      }}
                                    />
                                  }
                                />
                              );
                            }
                          })}
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

export default CreateServiceProvider;
