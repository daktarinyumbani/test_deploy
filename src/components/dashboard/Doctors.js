import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { red, green } from '@material-ui/core/colors';
import MedicalServicesIcon from '@material-ui/icons/MedicalServices';

// eslint-disable-next-line react/prop-types
const Doctors = ({ count }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            DOCTORS
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {count}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <MedicalServicesIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowUpwardIcon sx={{ color: green[900] }} />
        {/* <Typography
          sx={{
            color: red[900],
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography> */}
        <Typography color="textSecondary" variant="caption">
          All time
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default Doctors;
