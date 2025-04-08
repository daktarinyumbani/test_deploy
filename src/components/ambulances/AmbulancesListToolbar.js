import { Box, Card, CardContent, Typography, Button } from '@material-ui/core';
import { useNavigate } from 'react-router';

const AmbulancesListToolbar = (props) => {
  const navigate = useNavigate();
  return (
    <Box {...props}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography color="textPrimary" gutterBottom variant="h3">
                Ambulances
              </Typography>

              <Button
                color="primary"
                variant="contained"
                onClick={() => navigate('create')}
              >
                Add ambulance provider
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AmbulancesListToolbar;
