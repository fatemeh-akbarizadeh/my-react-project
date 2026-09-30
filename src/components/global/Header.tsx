import {
    AppBar,
    Avatar,
    Badge,
    Box,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';

import {
    DarkMode,
    LightMode,
    LogoutRounded,
    ShoppingCartRounded,

} from '@mui/icons-material';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { DUMMY_BASE_URL } from '../../constants';
import { useAuthStore } from '../../store/auth.store';
import { useCartStore } from '../../store/cart.store';
import { useGlobalStore } from '../../store/global.store';
import MainLoading from './MainLoading';

const Header = () => {
    const navigate = useNavigate();

    const { user, setUser } = useAuthStore();
    const [mainLoading, setMainLoading] = useState(true);

    const { theme, toggleTheme } = useGlobalStore();
    const { cart } = useCartStore();

    const cartCount = cart.length;

    const afterLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    const getMeApi = async () => {
        const res = await fetch(`${DUMMY_BASE_URL}/auth/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });

        if (!res.ok) {
            throw new Error('request to filed');
        }

        const data = await res.json();

        return data;
    };

    const getMeData = async () => {
        try {
            const data = await getMeApi();

            setUser(data);
        } catch (error) {
            console.log(error);

            sessionStorage.removeItem('token');
            navigate('/login');
        } finally {
            setMainLoading(false);
        }
    };

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login');
        } else {
            getMeData();
        }
    }, []);

    const logout = () => {
        if (!confirm('Are you sure to want to logout?')) {
            return;
        }

        afterLogout();
    };

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: 72,
                        justifyContent: 'flex-end',
                        gap: 1,
                        px: 3,
                    }}
                >
                  
                    <Link to="/app/cart">
                        <IconButton
                            color="inherit"
                            aria-label="shopping cart"
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <Badge
                                badgeContent={
                                    cartCount > 0 ? cartCount : undefined
                                }
                                color="error"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        fontWeight: 700,
                                        minWidth: 18,
                                        height: 18,
                                        fontSize: '0.7rem',
                                    },
                                }}
                            >
                                <ShoppingCartRounded />
                            </Badge>
                        </IconButton>
                    </Link>

                   
                    <IconButton
                        onClick={toggleTheme}
                        color="inherit"
                        aria-label="toggle theme"
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        {theme === 'dark' ? (
                            <LightMode />
                        ) : (
                            <DarkMode />
                        )}
                    </IconButton>

                    {/* Profile */}
                    <Link
                        to="/app/profile"
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                px: 1,
                                py: 0.5,
                                borderRadius: 3,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <Avatar
                                src={user?.image}
                                alt={`${user?.firstName} ${user?.lastName}`}
                                sx={{
                                    width: 38,
                                    height: 38,
                                    border: '2px solid',
                                    borderColor: 'primary.light',
                                }}
                            />

                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                {user?.firstName} {user?.lastName}
                            </Typography>
                        </Box>
                    </Link>

                   
                    <IconButton
                        onClick={logout}
                        color="error"
                        aria-label="logout"
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                        }}
                    >
                        <LogoutRounded />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {mainLoading && <MainLoading />}
        </>
    );
};

export default Header;