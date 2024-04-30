// LoginPage.tsx

import React, { useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import KakaoLogin from "./kakao/KakaoLogin";
import { useAuth } from "./state/AuthContext";

const LoginPage = () => {
    const { setIsLoggedIn } = useAuth();
    const [email, setEmail] = useState("");

    const handleLoginSuccess = () => {
        // 로그인 성공 시 email을 localStorage에 저장
        localStorage.setItem("email", email);
        setIsLoggedIn(true);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <Container maxWidth="xs">
                <Paper elevation={3} style={{ padding: 24 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        로그인·회원가입
                    </Typography>
                    <Typography variant="body1" align="center">
                        내일부터 2주! 매일 업데이트되는 가격을 확인하세요
                    </Typography>
                    <div style={{ marginTop: 24 }}>
                        <KakaoLogin onSuccess={handleLoginSuccess} setEmail={setEmail} />
                    </div>
                </Paper>
            </Container>
        </div>
    );
};

export default LoginPage;
