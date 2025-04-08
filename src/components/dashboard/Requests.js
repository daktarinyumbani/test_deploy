import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  // LinearProgress,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

// eslint-disable-next-line react/prop-types
const Requests = ({ count, interval }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            TOTAL REQUESTS
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {count}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: orange[600],
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
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
        <Typography color="textSecondary" variant="caption">
          {interval}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default Requests;
