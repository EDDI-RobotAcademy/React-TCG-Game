import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EddiTcgMainLobby from "./eddi_tcg_main_lobby/EddiTcgMainLobby";
import Home from "./home/Home";
import NavigationBar from "./layout/NavigationLayout";
import EddiTcgCardShop from "./eddi_tcg_card_shop/EddiTcgCardShop";
import EddiTcgMyCard from "./eddi_tcg_my_card/EddiTcgMyCard";

const theme = createTheme({
    typography: {
        fontFamily: "SUIT-SemiBold",
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/eddi-tcg-main-lobby" element={<EddiTcgMainLobby />} />
                    <Route path="/eddi-tcg-my-card" element={<EddiTcgMyCard />} />
                    <Route path="/eddi-tcg-card-shop" element={<EddiTcgCardShop />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
