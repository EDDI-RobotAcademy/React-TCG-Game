import { getImageUrl } from "../../aws/s3/aws_s3_utility";
import { MouseEvent } from "react";

interface KakaoLoginProps {
    onSuccess: () => void;
    email: string; // 추가
}

const KakaoLogin: React.FC<KakaoLoginProps> = ({ onSuccess, email }) => {
    const CLIENT_ID = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
    const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;
    const kakaoURL =
        "https://kauth.kakao.com/oauth/authorize?" +
        `client_id=${CLIENT_ID}&` +
        `redirect_uri=${REDIRECT_URI}&` +
        "response_type=code";

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        window.location.href = kakaoURL;
    };

    return (
        <div className="oauth-login-btn-container" onClick={handleClick}>
            <img
                className="oauth-login-btn"
                alt="KakaoLogin Icon"
                // src={getImageUrl("resources/KakaoLoginIcon.png")}
            />
            <p className="oauth-login-text">카카오 로그인</p>
            <p>{email}</p> {/* 이메일 출력 */}
        </div>
    );
};

export default KakaoLogin;
