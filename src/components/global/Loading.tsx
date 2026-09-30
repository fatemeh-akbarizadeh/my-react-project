import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import DsTypography from '../desine.system/DsTypography';


const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <CircularProgress size={24} />

      <DsTypography>
        Loading...
      </DsTypography>
    </Box>
  );
};

export default Loading;