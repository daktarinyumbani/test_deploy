import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { makeGetRequest } from 'src/services/httpservice';
import BusinessesListToolbar from 'src/components/businesses/BusinessesListToolbar';
import BusinessesListResults from 'src/components/businesses/BusinessesListResults';

const Businesses = () => {
  const [providers, setProviders] = useState([]);

  function getServiceProviders() {
    makeGetRequest('businesses')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setProviders(responseJson.data.businesses);
        } else {
          console.log('bad status returned for businesses');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getServiceProviders();
  }, []);
  return (
    <>
      <Helmet>
        <title>Businesses</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <BusinessesListToolbar />
          <Box sx={{ pt: 3 }}>
            <BusinessesListResults providers={providers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Businesses;
