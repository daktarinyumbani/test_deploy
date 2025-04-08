/* eslint-disable */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const CreateUser = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  function createUser(values) {
    axios
      .post(`${process.env.REACT_APP_API_URL}users/create-admin`, values, {
        responseType: 'application/json'
      })
      .then((response) => {
        console.log(response);
        if (response.status) {
          if (response.data.status) {
            navigate('/app/users');
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

  return (
    <>
      <Helmet>
        <title>Create Admin</title>
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
                  initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    password: ''
                  }}
                  validationSchema={Yup.object().shape({
                    first_name: Yup.string()
                      .max(64)
                      .required('First name is required'),
                    last_name: Yup.string().required('Last name is required'),
                    phone: Yup.string().required('Phone is required'),
                    email: Yup.string()
                      .email('Must be a valid email')
                      .max(255)
                      .required('Email is required'),
                    password: Yup.string().required('Password is required')
                  })}
                  onSubmit={async (values) => {
                    console.log('subnmit');
                    createUser(values);
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
                        <Grid item xs={6}>
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

                        <Grid item xs={6}>
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

                        <Grid item xs={6}>
                          <TextField
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            label="Email"
                            margin="normal"
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="email"
                            value={values.email}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={6}>
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

                        <Grid item xs={6}>
                          <TextField
                            error={Boolean(touched.password && errors.password)}
                            fullWidth
                            helperText={touched.password && errors.password}
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.password}
                            variant="outlined"
                          />
                        </Grid>

                        {message && <Box sx={{ mb: 3 }}>{message}</Box>}
                      </Grid>

                      <Box sx={{ py: 2 }}>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Register
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

export default CreateUser;
