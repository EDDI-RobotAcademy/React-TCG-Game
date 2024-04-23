import { Box, Container } from "@mui/material";
import KakaoLogin from "./kakao/KakaoLogin";
// import GoogleLogin from "oauth/google/GoogleLogin";
// import NaverLogin from "oauth/naver/NaverLogin";

import {useAuth} from "./state/AuthContext";
import {getImageUrl} from "../aws/s3/aws_s3_utility";

const LoginPage = () => {
    const { setIsLoggedIn } = useAuth();

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <div className="login-container">
            <img
                className="login-background"
                // src={getImageUrl("resources/LoginBackground.jpg")}
                alt="Login Background"
            />
            <Container maxWidth="xs">
                <div className="login-icons">
                    <div className="login-text">
                        <h2>로그인·회원가입</h2>
                        <span>내일부터 2주! 매일 업데이트되는 가격을 확인하세요</span>
                    </div>
                    <KakaoLogin onSuccess={handleLoginSuccess} />
                    {/*<GoogleLogin onSuccess={handleLoginSuccess} />*/}
                    {/*<NaverLogin onSuccess={handleLoginSuccess} />*/}
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;