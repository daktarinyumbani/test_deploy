/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { makeGetRequest } from 'src/services/httpservice';
import ProductsListToolbar from 'src/components/products/ProductsListToolbar';
import ProductsListResults from 'src/components/products/ProductsListResults';

const Products = () => {
    const [products, setProducts] = useState([]);

    function getProducts() {
        makeGetRequest('products')
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status) {
                    setProducts(responseJson.data.products);
                } else {
                    console.log('bad status returned for Products');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <Helmet>
                <title>Products</title>
            </Helmet>
            <Box sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 3
            }}
            >
                <Container maxWidth={false}>
                    <ProductsListToolbar />
                    <Box sx={{ pt: 3 }}>
                        <ProductsListResults products={products} />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Products;
