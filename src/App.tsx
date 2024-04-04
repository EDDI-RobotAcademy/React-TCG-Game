import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EddiTcgMainLobby from "./eddi_tcg_main_lobby/EddiTcgMainLobby";
import Home from "./home/Home";

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
                    <Route path="/" element={<Home />} />
                    <Route path="/eddi-tcg-main-lobby" element={<EddiTcgMainLobby />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
