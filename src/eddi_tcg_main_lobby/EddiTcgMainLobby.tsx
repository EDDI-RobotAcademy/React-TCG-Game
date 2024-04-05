import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import AudioPlayer from "../audio_player/AudioPlayer";
import { useNavigate } from 'react-router-dom';

import entranceBattleFieldButton from '../assets/eddi_tcg_game/images/main_lobby/entrance_battle_field_button.png';
import myCardButton from '../assets/eddi_tcg_game/images/main_lobby/myCardButton.png';
import shopButton from '../assets/eddi_tcg_game/images/main_lobby/shopButton.png';
import {Button, Grid} from "@mui/material";

// const Container = styled.div`
//     width: 100%;
//     height: 100vh;
//     background-image: url('/assets/eddi_tcg_game/images/main_lobby/battle_lobby_background.png');
//     background-size: cover;
//     background-repeat: no-repeat;
//     background-position: center;
// `;

const RotatingBox: React.FC = () => {
    const boxRef = React.useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (boxRef.current) {
            boxRef.current.rotation.x += 0.01;
            boxRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={boxRef} position={[0, 0, 0]} scale={[2, 2, 2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
};

const MyScene: React.FC = () => {
    return (
        <Canvas style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <RotatingBox />
            <OrbitControls />
        </Canvas>
    );
};

const EddiTcgMainLobby: React.FC = () => {
    const mainLobbyAudioUrl = "/assets/eddi_tcg_game/music/main_lobby/lobby-menu.mp3";
    const navigate = useNavigate();

    const [buttonSize, setButtonSize] = useState({ width: 0, height: 0 });
    const [buttonMargin, setButtonMargin] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const windowHeight = window.innerHeight;
            console.log('width: ', window.innerWidth)
            console.log('height: ', window.innerHeight)

            const buttonHeightRatio = 0.12; // 버튼 높이를 화면 높이의 비율로 설정 (예: 8%)
            const newButtonHeight = windowHeight * buttonHeightRatio;

            const buttonWidthRatio = 0.46; // 버튼 너비를 화면 너비의 비율로 설정 (예: 30%)
            const newButtonWidth = window.innerWidth * buttonWidthRatio;

            const buttonMarginRatio = 0.1; // 버튼 간격을 화면 높이의 비율로 설정 (예: 1%)
            const newButtonMargin = windowHeight * buttonMarginRatio;

            setButtonSize({ width: newButtonWidth, height: newButtonHeight });
            setButtonMargin(newButtonMargin);
        };

        handleResize(); // 초기 렌더링 시에도 크기 설정
        window.addEventListener('resize', handleResize); // 창 크기 변경 시 크기 업데이트
        return () => window.removeEventListener('resize', handleResize); // Clean-up 함수 등록
    }, []);

    const images = [
        { src: '/assets/eddi_tcg_game/images/main_lobby/entrance_battle_field_button.png', route: '/eddi-tcg-game-battle-field', heightPercentage: 0.1 },
        { src: '/assets/eddi_tcg_game/images/main_lobby/my_card_button.png', route: '/eddi-tcg-game-my-card', heightPercentage: 0.1 },
        { src: '/assets/eddi_tcg_game/images/main_lobby/shop_button.png', route: '/eddi-tcg-game-card-shop', heightPercentage: 0.1 },
    ];

    const handleButtonClick = (route: string) => {
        navigate(route);
    };

    return (
        <div>
            <div style={{paddingTop: '64px'}}></div>
            <div style={{
                width: '100vw',
                height: '100%',
                position: 'fixed',
                top: 32,
                left: 0,
                zIndex: -1,
                backgroundImage: `url(/assets/eddi_tcg_game/images/main_lobby/battle_lobby_background.png)`,
                backgroundSize: '100vw calc(100vh - 64px)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', // Center the background image
            }}>
                <AudioPlayer url={mainLobbyAudioUrl}/>
                <MyScene/>
            </div>
            <div>
                <div style={{ position: 'absolute', top: '32%', left: '7%', width: '84%', marginBottom: `${buttonMargin}px` }}>
                    <Button onClick={() => handleButtonClick(images[0].route)} style={{ width: `${buttonSize.width}px`, height: `${buttonSize.height}px`, borderRadius: 0 }}>
                        <img src={images[0].src} alt={`image-0`} style={{ width: '100%', height: '100%' }} />
                    </Button>
                </div>
                <div style={{ position: 'absolute', top: '44%', left: '7%', width: '84%', marginBottom: `${buttonMargin}px` }}>
                    <Button onClick={() => handleButtonClick(images[1].route)} style={{ width: `${buttonSize.width}px`, height: `${buttonSize.height}px`, borderRadius: 0 }}>
                        <img src={images[1].src} alt={`image-1`} style={{ width: '100%', height: '100%' }} />
                    </Button>
                </div>
                <div style={{ position: 'absolute', top: '56%', left: '7%', width: '84%', marginBottom: `${buttonMargin}px` }}>
                    <Button onClick={() => handleButtonClick(images[2].route)} style={{ width: `${buttonSize.width}px`, height: `${buttonSize.height}px`, borderRadius: 0 }}>
                        <img src={images[2].src} alt={`image-2`} style={{ width: '100%', height: '100%' }} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

const calculateTopPosition = (index: number, images: { heightPercentage: number }[]) => {
    let totalPercentage = 0;
    for (let i = 0; i < index; i++) {
        totalPercentage += images[i].heightPercentage;
    }
    return totalPercentage * 100;
};

export default EddiTcgMainLobby;