/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-indent */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { makeGetRequest } from 'src/services/httpservice';
import GenericsListToolbar from 'src/components/generics/GenericsListToolbar';
import GenericsListResults from 'src/components/generics/GenericsListResults';

const Generics = () => {
    const [generics, setGenerics] = useState([]);

    function getGenerics() {
        makeGetRequest('generics')
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status) {
                    setGenerics(responseJson.data.generics);
                } else {
                    console.log('bad status returned for generics');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getGenerics();
    }, []);
    return (
        <>
            <Helmet>
                <title>Generics</title>
            </Helmet>
            <Box sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 3
            }}
            >
                <Container maxWidth={false}>
                    <GenericsListToolbar />
                    <Box sx={{ pt: 3 }}>
                        <GenericsListResults generics={generics} />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Generics;
