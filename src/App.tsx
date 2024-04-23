import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EddiTcgMainLobby from "./eddi_tcg_main_lobby/EddiTcgMainLobby";
import Home from "./home/Home";
import NavigationBar from "./layout/NavigationLayout";
import EddiTcgCardShop from "./eddi_tcg_card_shop/EddiTcgCardShop";
import EddiTcgMyCard from "./eddi_tcg_my_card/EddiTcgMyCard";
import EddiTcgBattleField from "./eddi_tcg_battle_field/EddiTcgBattleField";
import LoginPage from "./oauth/LoginPage";

const theme = createTheme({
    typography: {
        fontFamily: "SUIT-SemiBold",
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeWithNavigationBar />} />
                    <Route path="/eddi-tcg-main-lobby" element={<EddiTcgMainLobbyWithNavigationBar />} />
                    <Route path="/eddi-tcg-my-card" element={<EddiTcgMyCardWithNavigationBar />} />
                    <Route path="/eddi-tcg-card-shop" element={<EddiTcgCardShopWithNavigationBar />} />
                    <Route path="/eddi-tcg-battle-field" element={<EddiTcgBattleField />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

const HomeWithNavigationBar: React.FC = () => {
    return (
        <>
            <NavigationBar />
            <Home />
        </>
    );
};

const EddiTcgMainLobbyWithNavigationBar: React.FC = () => {
    return (
        <>
            <NavigationBar />
            <EddiTcgMainLobby />
        </>
    );
};

const EddiTcgMyCardWithNavigationBar: React.FC = () => {
    return (
        <>
            <NavigationBar />
            <EddiTcgMyCard />
        </>
    );
};

const EddiTcgCardShopWithNavigationBar: React.FC = () => {
    return (
        <>
            <NavigationBar />
            <EddiTcgCardShop />
        </>
    );
};

export default App;
