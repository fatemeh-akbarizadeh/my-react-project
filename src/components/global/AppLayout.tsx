import { Box } from '@mui/material';

import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router';



const AppLayout=() => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <Header />

        <Box
          sx={{
            p: 3,
          }}
        >
        <Outlet/>
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;