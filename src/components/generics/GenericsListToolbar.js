import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';

const GenericsListToolbar = (props) => {
  const navigate = useNavigate();
  return (
    <Box {...props}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
            >
              <Typography color="textPrimary" gutterBottom variant="h3">
                Generics
              </Typography>
              <Button
                color="primary"
                variant="contained"
                onClick={() => navigate('create')}
              >
                Create Generics
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default GenericsListToolbar;
