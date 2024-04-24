import { ChangeEvent, useState } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import KakaoLogin from "./kakao/KakaoLogin";
import { useAuth } from "./state/AuthContext";

const LoginPage = () => {
    const { setIsLoggedIn } = useAuth();
    const [email, setEmail] = useState("");

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
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
                        <TextField
                            fullWidth
                            label="이메일 주소"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            style={{ marginBottom: 16 }}
                        />
                        <KakaoLogin onSuccess={handleLoginSuccess} email={email} />
                    </div>
                </Paper>
            </Container>
        </div>
    );
};

export default LoginPage;
