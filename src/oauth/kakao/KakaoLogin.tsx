// KakaoLogin.tsx

import { Button, TextField } from "@mui/material";
import { MouseEvent, ChangeEvent, useState } from "react";

interface KakaoLoginProps {
    onSuccess: () => void;
    setEmail: (email: string) => void;
}

const KakaoLogin: React.FC<KakaoLoginProps> = ({ onSuccess, setEmail }) => {
    const [email, setEmailState] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true); // 이메일 유효성 상태 추가

    const CLIENT_ID = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
    const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;
    const kakaoURL =
        "https://kauth.kakao.com/oauth/authorize?" +
        `client_id=${CLIENT_ID}&` +
        `redirect_uri=${REDIRECT_URI}&` +
        "response_type=code";

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        window.location.href = kakaoURL;
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmailState(newEmail);
        setEmail(newEmail);

        // 이메일 유효성 검사
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
        setIsValidEmail(isValid);
    };

    return (
        <>
            <TextField
                fullWidth
                label="이메일 주소"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={!isValidEmail} // 이메일 유효성에 따라 에러 상태 설정
                helperText={!isValidEmail && "유효한 이메일을 입력하세요"} // 에러 메시지 출력
                style={{ marginBottom: 16 }}
            />
            <Button variant="contained" onClick={handleClick} disabled={!email || !isValidEmail}>
                카카오 로그인
            </Button>
        </>
    );
};

export default KakaoLogin;
