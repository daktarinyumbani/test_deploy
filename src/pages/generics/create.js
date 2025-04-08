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

const CreateGeneric = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    function createGeneric(values) {
        axios
            .post(`${process.env.REACT_APP_API_URL}generics/`, values, {
                responseType: 'application/json'
            })
            .then((response) => {
                console.log(response);
                if (response.status) {
                    if (response.data.status) {
                        navigate('/app/generics');
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
                <title>Create Generic</title>
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
                                        name: '',

                                    }}
                                    validationSchema={Yup.object().shape({
                                        name: Yup.string()
                                            .max(64)
                                            .required('First name is required'),
                                    })}
                                    onSubmit={async (values) => {
                                        console.log('subnmit');
                                        createGeneric(values);
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
                                                    Create Generic
                                                </Typography>
                                            </Box>

                                            <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        error={Boolean(
                                                            touched.name && errors.name
                                                        )}
                                                        fullWidth
                                                        helperText={touched.name && errors.name}
                                                        label="Generic Name"
                                                        margin="normal"
                                                        name="name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        type="text"
                                                        value={values.name}
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
                                                    Create
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

export default CreateGeneric;
