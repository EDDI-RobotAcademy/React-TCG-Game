import React from 'react';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';

const NavigationBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <Link href="/" color="inherit" underline="none" sx={{ mr: 2 }}>
                    Home
                </Link>
                <Link href="/eddi-tcg-main-lobby" color="inherit" underline="none">
                    Main Lobby
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
