/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-array-constructor */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-indent-props */
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
/* eslint-disable react/jsx-indent */
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
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { makeGetRequest } from 'src/services/httpservice';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router';

import 'react-phone-input-2/lib/material.css';
import { storage } from '../../firebase';

const CreateProduct = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [generics, setGenerics] = useState([]);
    const [files, setFile] = useState([]);
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const [imageValue, setImageValue] = useState('');

    console.log('images', images);

    const handlerFile = (e) => {
        console.log(e.target.files);

        const allfiles = [];
        for (let i = 0; i < e.target.files.length; i++) {
            allfiles.push(e.target.files[i]);
            const newImage = e.target.files[i];
            newImage.id = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
        if (allfiles.length > 0) {
            setFile(allfiles);
        }
    };

    const [initialValues, setInitialValues] = useState({
        generic: '',
        name: '',
        images: []
    });

    const { id } = useParams();

    const [details, setDetails] = useState(null);
    const [mode, setMode] = useState('create');

    function getDetails(ProductId) {
        makeGetRequest(`products/${ProductId}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status) {
                    setDetails(responseJson.data.product);
                    setMode('edit');

                    const { product } = responseJson.data;
                    setImageValue(product?.images[0]?.img_url);

                    setInitialValues({
                        generic: product.generic.id,
                        name: product.brand.name,
                        images: product.images
                    });
                } else {
                    console.log('bad status returned for provider');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getGenerics() {
        makeGetRequest('generics')
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status) {
                    setGenerics(responseJson.data.generics);
                } else {
                    console.log('bad status returned for  generics');
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

    useEffect(() => {
        getGenerics();
    }, []);

    const urlsF = [];
    const createProduct = (values) => {
        const promises = [];

        images.map((image) => {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            promises.push(uploadTask);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    await storage
                        .ref('images')
                        .child(image.name)
                        .getDownloadURL()
                        .then((urls) => {
                            axios.post(`${process.env.REACT_APP_API_URL}products`, {
                                generic: values.generic,
                                name: values.name,
                                images: urls
                            }, {
                                responseType: 'application/json'
                            })
                                .then((response) => {
                                    console.log(response);
                                    if (response.status) {
                                        if (response.data.status) {
                                            navigate('/app/products');
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
            );
        });

        Promise.all(promises)
            .then((data) => {
                alert('All images uploaded');
            })
            .catch((err) => console.log(err));

        return Promise.resolve(urlsF);
    };

    function updateProduct(values) {
        if (images.length > 0) {
            const promises = [];
            images.map((image) => {
                const uploadTask = storage.ref(`images/${image.name}`).put(image);
                promises.push(uploadTask);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        await storage
                            .ref('images')
                            .child(image.name)
                            .getDownloadURL()
                            .then((urls) => {
                                axios
                                    .post(`${process.env.REACT_APP_API_URL}products/${id}`, {
                                        generic: values.generic,
                                        name: values.name,
                                        images: urls
                                    }, {
                                        responseType: 'application/json'
                                    })
                                    .then((response) => {
                                        console.log(response);
                                        if (response.status) {
                                            if (response.data.status) {
                                                navigate('/app/products');
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
                );
            });

            Promise.all(promises)
                .then((data) => {
                    alert('All images uploaded');
                })
                .catch((err) => console.log(err));

            return Promise.resolve(urlsF);
        }
        if (images <= 0) {
            values.images = imageValue;
            axios
                .post(`${process.env.REACT_APP_API_URL}products/${id}`, values, {
                    responseType: 'application/json'
                })
                .then((response) => {
                    console.log(response);
                    if (response.status) {
                        if (response.data.status) {
                            navigate(`/app/products/${id}/details`);
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
    }

    return (
        <>
            <Helmet>
                <title>Create Product</title>
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
                                        name: Yup.string().required('Brand name is required'),
                                        generic: Yup.string()
                                            .max(64)
                                            .required('Generic is required'),
                                    })}
                                    onSubmit={async (values) => {
                                        if (mode === 'edit') {
                                            // eslint-disable-next-line no-underscore-dangle
                                            //  values._method = 'PUT';
                                        }

                                        mode === 'edit'
                                            ? updateProduct(values)
                                            : createProduct(values);
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
                                                    Create Product
                                                </Typography>
                                            </Box>

                                            <Grid container spacing={3}>

                                                <Grid item xs={4}>
                                                    <TextField
                                                        select
                                                        error={Boolean(
                                                            touched.generic && errors.generic
                                                        )}
                                                        fullWidth
                                                        helperText={
                                                            touched.generic && errors.generic
                                                        }
                                                        label="Generic"
                                                        margin="normal"
                                                        name="generic"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        type="text"
                                                        value={values.generic}
                                                        variant="outlined"
                                                    >
                                                        <MenuItem value="">Select generic</MenuItem>
                                                        {generics.map((generic) => (
                                                            <MenuItem key={generic.id} value={generic.id}>
                                                                {generic.name}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        error={Boolean(
                                                            touched.name && errors.name
                                                        )}
                                                        fullWidth
                                                        helperText={
                                                            touched.name && errors.name
                                                        }
                                                        label="Brand name"
                                                        margin="normal"
                                                        name="name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        type="text"
                                                        value={values.name}
                                                        variant="outlined"
                                                    />
                                                </Grid>

                                            </Grid>
                                            <Grid container spacing={3} style={{ marginTop: 30, marginBottom: 30 }}>
                                                <Grid item xs={4}>
                                                    <Button
                                                        variant="contained"
                                                        component="label"
                                                    >
                                                        Upload product image
                                                        <input
                                                            type="file"
                                                            hidden
                                                            accept="image/png, image/gif, image/jpeg"
                                                            onChange={handlerFile}
                                                        />
                                                    </Button>
                                                </Grid>
                                                {imageValue && files.length <= 0 ? (

                                                    <Grid item xs={8}>
                                                        <img
                                                            src={imageValue || 'http://via.placeholder.com/300'}
                                                            alt="product"
                                                            style={{
                                                                width: 300,
                                                                height: 200,
                                                            }}
                                                        />
                                                    </Grid>
                                                ) : (<Grid item xs={8}>
                                                    <div style={{ flexDirection: 'row' }}>
                                                        {files.map((file, key) => (
                                                            <div>
                                                                <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: 200, height: 200 }} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Grid>)}

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
                                                    {mode === 'edit' ? 'Update' : 'Create'}
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

export default CreateProduct;
