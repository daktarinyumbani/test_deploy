import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { makeGetRequest } from 'src/services/httpservice';
import AmbulancesListToolbar from 'src/components/ambulances/AmbulancesListToolbar';
import AmbulancesListResults from 'src/components/ambulances/AmbulancesListResults';

const Ambulances = () => {
  const [providers, setProviders] = useState([]);

  function getServiceProviders() {
    makeGetRequest('ambulances')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setProviders(responseJson.data.ambulances);
        } else {
          console.log('bad status returned for ambulances');
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
          <AmbulancesListToolbar />
          <Box sx={{ pt: 3 }}>
            <AmbulancesListResults providers={providers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Ambulances;
