import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ServiceProvidersListToolbar from 'src/components/serviceProviders/ServiceProvidersListToolbar';
import ServiceProvidersListResults from 'src/components/serviceProviders/ServiceProvidersListResults';
import { makeGetRequest } from 'src/services/httpservice';

const ServiceProviders = () => {
  const [providers, setProviders] = useState([]);

  function getServiceProviders() {
    makeGetRequest('service-providers')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setProviders(responseJson.data.providers);
        } else {
          console.log('bad status returned for providers');
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
        <title>Service Providers</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ServiceProvidersListToolbar />
          <Box sx={{ pt: 3 }}>
            <ServiceProvidersListResults providers={providers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ServiceProviders;
