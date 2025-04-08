/* eslint-disable operator-linebreak */
import moment from 'moment';
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

const AmbulanceDetails = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  function getDetails(serviceProviderId) {
    makeGetRequest(`ambulances/${serviceProviderId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setDetails(responseJson.data.ambulance);
        } else {
          console.log('bad status returned for ambulance');
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
          <Box
            sx={{
              // alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography color="textPrimary" gutterBottom variant="h3">
              Ambulance Provider Details
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {details && (
        <Card>
          <CardContent>
            <Box
              sx={{
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
                      {`${details.user.first_name} ${details.user.last_name}`}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography color="textSecondary" variant="body1">
                      Company Name
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h4">
                      {details.company_name}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography color="textSecondary" variant="body1">
                      Registration Number
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h4">
                      {details.reg_number}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container paddingTop={4} spacing={3}>
                  <Grid item xs={4}>
                    <Typography color="textSecondary" variant="body1">
                      Board Status
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {details.board_status === 'allowed'
                        ? 'Allowed to practice'
                        : 'Not allowed to practice'}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography color="textSecondary" variant="body1">
                      Current Hospital
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {details.current_hospital}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography color="textSecondary" variant="body1">
                      Availability
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {details.available ? 'Available' : 'Not Available'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container paddingTop={4} spacing={3}>
                  <Grid item xs={4}>
                    <Typography color="textSecondary" variant="body1">
                      Cost
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {details.cost}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography color="textSecondary" variant="body1">
                      Address
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {details.address}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography color="textSecondary" variant="body1">
                      Bio
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {details.bio}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container paddingTop={4} spacing={3}>
                  <Grid item xs={4}>
                    <Typography color="textSecondary" variant="body1">
                      Created At
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {`${moment().format('hh:mm A')} ${details.created_at}`}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography color="textSecondary" variant="body1">
                      Phone Number
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {details.user.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              onClick={() => {
                navigate(`/app/ambulances/${id.toString()}/edit`);
              }}
              color="primary"
              fullWidth
              variant="text"
            >
              Edit Ambulance Provider Details
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default AmbulanceDetails;
