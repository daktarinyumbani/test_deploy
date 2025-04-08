import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
// import customers from 'src/__mocks__/customers';
// import RequestListResults from 'src/components/requests/RequestListResults';
import RequestListToolbar from 'src/components/requests/RequestListToolbar';

const ViewRequest = () => (
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
        <p>Inner request view</p>
      </Container>
    </Box>
  </>
);

export default ViewRequest;
