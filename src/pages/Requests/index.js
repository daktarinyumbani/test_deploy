import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import RequestListResults from 'src/components/requests/RequestListResults';
import RequestListToolbar from 'src/components/requests/RequestListToolbar';
import { useEffect, useState } from 'react';
import { makeGetRequest } from 'src/services/httpservice';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  function getRequests() {
    makeGetRequest('service-requests/all')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setRequests(responseJson.data.requests);
        } else {
          console.log('bad status returned for requests');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <>
      <Helmet>
        <title>Requests</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <RequestListToolbar />
          <Box sx={{ pt: 3 }}>
            <RequestListResults requests={requests} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Requests;
