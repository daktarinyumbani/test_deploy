import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';

const RequestListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button>Import</Button>
      <Button sx={{ mx: 1 }}>Export</Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <Typography color="textPrimary" gutterBottom variant="h3">
              Requests
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default RequestListToolbar;
