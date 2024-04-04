import React, { useRef, useEffect } from 'react';
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

    const images = [
        { src: '/assets/eddi_tcg_game/images/main_lobby/entrance_battle_field_button.png', route: '/eddi-tcg-game-battle-field' },
        { src: '/assets/eddi_tcg_game/images/main_lobby/my_card_button.png', route: '/eddi-tcg-game-my-card' },
        { src: '/assets/eddi_tcg_game/images/main_lobby/shop_button.png', route: '/eddi-tcg-game-card-shop' },
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
            <Grid container spacing={2} style={{ paddingTop: '8%', paddingLeft: '7%', position: 'absolute', top: '40%', transform: 'translateY(-50%)' }}>
                {images.map((image, index) => (
                    <Grid item xs={12} key={index} justifyContent="flex-start">
                        <Button onClick={() => handleButtonClick(image.route)} style={{ width: '84%', textAlign: 'left', height: '8%', borderRadius: 0 }}>
                            <img src={image.src} alt={`image-${index}`} style={{ width: '60%', height: 'auto' }} />
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default EddiTcgMainLobby;