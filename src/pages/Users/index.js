import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import UsersListToolbar from 'src/components/users/UsersListToolbar';
import UsersListResults from 'src/components/users/UsersListResults';
import { useEffect, useState } from 'react';
import { makeGetRequest } from 'src/services/httpservice';

const Users = () => {
  const [users, setUsers] = useState([]);

  function getUsers() {
    makeGetRequest('users/all')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setUsers(responseJson.data.users);
        } else {
          console.log('bad status returned for users');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <UsersListToolbar />
          <Box sx={{ pt: 3 }}>
            <UsersListResults users={users} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Users;
