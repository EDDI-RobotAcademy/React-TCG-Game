import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

type AuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;

    checkAuthorization: () => boolean;
    checkAdminAuthorization: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAuthorization = useCallback((): boolean => {
        const userToken = localStorage.getItem("userToken");
        return !!userToken;
    }, []);

    const checkAdminAuthorization = useCallback((): boolean => {
        const userToken = localStorage.getItem("userToken");
        return !!userToken && (userToken.includes("mainadmin") || userToken.includes("normaladmin"));
    }, []);
    const saveTokenFromUrl = useCallback(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const userToken = urlSearchParams.get("userToken");
        const encodedProfileImg = urlSearchParams.get("profileImg");
        const encodedNickName = urlSearchParams.get("nickName");

        if (encodedProfileImg && encodedNickName && userToken) {
            const decodedProfileImg = decodeURIComponent(encodedProfileImg);
            const decodedNickName = decodeURIComponent(encodedNickName);

            localStorage.setItem("userToken", userToken);
            localStorage.setItem("encodedProfileImg", decodedProfileImg);
            localStorage.setItem("encodedNickName", decodedNickName);

            setIsLoggedIn(true);

            window.location.href = "/";
        }
    }, []);

    // 이게 있어야 로그인상태를 유지시킴
    useEffect(() => {
        setIsLoggedIn(checkAuthorization());
        saveTokenFromUrl();
    }, [checkAuthorization, saveTokenFromUrl]);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, checkAuthorization, checkAdminAuthorization }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("AuthProvider밖에서 사용할 수 없습니다.");
    }
    return auth;
};