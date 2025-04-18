import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';
// import { Alert, AlertTitle } from '@material-ui/lab';

const Login = ({ setToken, setUser }) => {
  // const navigate = useNavigate();

  const [message, setMessage] = useState('');

  return (
    <>
      <Helmet>
        <title>Login | Daktari Nyumbani</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              // alert(JSON.stringify(values, null, 2));

                if (!values.email || !values.password) {
                setToken({ id: 1, name: 'Guest User' });
                setUser({ id: 1, name: 'Guest User' });
                window.location.reload(false);
                } else {
                axios
                  .get(`${process.env.REACT_APP_PUBLIC_URL}/sanctum/csrf-cookie`)
                  .then(() => {
                  axios
                    .post(
                    `${process.env.REACT_APP_API_URL}auth/login`,
                    values,
                    {
                      responseType: 'application/json'
                    }
                    )
                    .then((response) => {
                    console.log(response);
                    if (response.status) {
                      if (response.data.status) {
                      console.log('Log in success.');
                      setToken(response.data.user);
                      setUser(response.data.user);
                      window.location.reload(false);
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
                  });
                }
                      console.log(response);
                      if (response.status) {
                        if (response.data.status) {
                          console.log('Log in success.');
                          setToken(response.data.user);
                          setUser(response.data.user);
                          // navigate('/');
                          window.location.reload(false);
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
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                </Box>

                {message && <Box sx={{ mb: 3 }}>{message}</Box>}

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
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
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

Login.propTypes = {
  setToken: PropTypes.func,
  setUser: PropTypes.func
};

export default Login;
