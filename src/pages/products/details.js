/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import {
    // Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    Container,
    Grid
} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { makeGetRequest } from 'src/services/httpservice';

const ProductsDetails = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);

    function getDetails(productsId) {
        makeGetRequest(`products/${productsId}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status) {
                    setDetails(responseJson.data.product);
                } else {
                    console.log('bad status returned for product');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getDetails(id);
    }, [id]);

    return (
        <>
            <Card {...props}>
                <CardContent>
                    <Box sx={{
                        // alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    >
                        <Typography color="textPrimary" gutterBottom variant="h3">
                            Product Details
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            {details && (
                <Card>
                    <CardContent>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        >
                            <Container maxWidth={false}>
                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <Typography color="textSecondary" variant="body1">
                                            Name
                                        </Typography>
                                        <Typography color="textPrimary" gutterBottom variant="h4">
                                            {details.brand.name}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography color="textSecondary" variant="body1">
                                            Generic
                                        </Typography>
                                        <Typography color="textPrimary" gutterBottom variant="h4">
                                            {details.generic.name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={8}>
                                        <Typography color="textSecondary" variant="body1">
                                            Image
                                        </Typography>
                                        <img
                                            src={details?.images[0]?.img_url || 'http://via.placeholder.com/300'}
                                            alt="product"
                                            style={{
                                                width: 300,
                                                height: 200,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button
                            onClick={() => {
                                navigate(`/app/products/${id.toString()}/edit`);
                            }}
                            color="primary"
                            fullWidth
                            variant="text"
                        >
                            Edit Product Details
                        </Button>
                    </CardActions>
                </Card>
            )}
        </>
    );
};

export default ProductsDetails;
