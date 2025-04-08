import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box
} from '@material-ui/core';
import { indigo, green } from '@material-ui/core/colors';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

// eslint-disable-next-line react/prop-types
const Ambulances = ({ count }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            AMBULANCES
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {count}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: indigo[600],
              height: 56,
              width: 56
            }}
          >
            <LocalShippingIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <ArrowUpwardIcon sx={{ color: green[900] }} />
        {/* <Typography
          variant="body2"
          sx={{
            color: green[900],
            mr: 1
          }}
        >
          16%
        </Typography> */}
        <Typography color="textSecondary" variant="caption">
          All time
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default Ambulances;
