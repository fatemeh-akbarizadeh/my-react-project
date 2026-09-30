import { NavLink } from 'react-router';

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import {
  HomeRounded,
  InfoRounded,
  ChecklistRounded,
  ArticleRounded,
  CalculateRounded,
  Inventory2Rounded,
} from '@mui/icons-material';

const Sidebar = () => {
  const links = [
    {
      title: 'Home',
      link: 'home',
      icon: <HomeRounded />,
    },
    {
      title: 'About Us',
      link: 'about-us',
      icon: <InfoRounded />,
    },
    {
      title: 'Todo List',
      link: 'todo-list',
      icon: <ChecklistRounded />,
    },
    {
      title: 'Posts',
      link: 'posts',
      icon: <ArticleRounded />,
    },
    {
      title: 'Counter',
      link: 'counter',
      icon: <CalculateRounded />,
    },
    {
      title: 'Products',
      link: 'products',
      icon: <Inventory2Rounded />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        flexShrink: 0,

        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          padding: 2,
        },
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          px: 1,
          mb: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: 'primary.main',
            letterSpacing: '-0.5px',
          }}
        >
          ✦ My Dashboard
        </Typography>
      </Box>

      <Divider />

      {/* Navigation */}
      <List sx={{ mt: 2 }}>
        {links.map((item) => (
          <ListItem
            key={item.link}
            disablePadding
            sx={{ mb: 1 }}
          >
            <ListItemButton
              component={NavLink}
              to={item.link}
              sx={{
                position: 'relative',
                borderRadius: 3,
                minHeight: 48,
                color: 'text.secondary',

                // Hover
                '&:hover': {
                  backgroundColor: 'action.hover',
                },

                // Active
                '&.active': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',

                  
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },

                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color: 'text.secondary',

                  '& svg': {
                    fontSize: 21,
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.title}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;