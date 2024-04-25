import React from 'react';
import { AppBar, Toolbar, Typography, Link, Button } from '@mui/material';
import { Logout, Login } from '@mui/icons-material';
import { useAuth } from "../oauth/state/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthButton: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const { setIsLoggedIn } = useAuth();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/'); // 로그아웃 후 홈 페이지로 이동
    };

    const handleLogin = () => {
        navigate('/login'); // 로그인 페이지로 이동
    };

    return (
        <>
            {isLoggedIn ? (
                <Button color="inherit" onClick={handleLogout}>
                    <Logout />
                    <span style={{ marginLeft: '0.5em' }}>Logout</span>
                </Button>
            ) : (
                <Button color="inherit" onClick={handleLogin}>
                    <Login />
                    <span style={{ marginLeft: '0.5em' }}>Login</span>
                </Button>
            )}
        </>
    );
};

const NavigationBar: React.FC = () => {
    const { isLoggedIn } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    EDDI-TCG
                </Typography>
                <div>
                    <Link href="/" color="inherit" underline="none" sx={{ mr: 2 }}>
                        Home
                    </Link>
                    {isLoggedIn && (
                        <Link href="/eddi-tcg-main-lobby" color="inherit" underline="none" sx={{ mr: 2 }}>
                            Main Lobby
                        </Link>
                    )}
                    <AuthButton isLoggedIn={isLoggedIn}/>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
