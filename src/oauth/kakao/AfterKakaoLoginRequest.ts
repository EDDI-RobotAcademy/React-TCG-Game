import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

const AfterKakaoLoginRequest: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    useEffect(() => {
        const handleAuthCallback = () => {
            const urlParams = new URLSearchParams(location.search);
            const userToken = urlParams.get("userToken");
            if (userToken) {
                localStorage.setItem("userToken", userToken);
                setIsLoggedIn(true);
                navigate("/", { replace: true });
            }
        };

        handleAuthCallback();
    }, [location.search, navigate, setIsLoggedIn]);

    return null;
};

export default AfterKakaoLoginRequest;
