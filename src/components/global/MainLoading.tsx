import Box from '@mui/material/Box';
import Loading from './Loading';

const MainLoading = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        zIndex: 1300,
      }}
    >
      <Loading />
    </Box>
  );
};

export default MainLoading;