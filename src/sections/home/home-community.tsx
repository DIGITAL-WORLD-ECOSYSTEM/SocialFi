
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export function HomeCommunity() {
  return (
    <Container
      sx={{
        py: { xs: 10, md: 15 },
        textAlign: 'center',
      }}
    >
      <Typography variant="h2">Community</Typography>
    </Container>
  );
}
