import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import AudioPlayer from "../audio_player/AudioPlayer";
// import styled from 'styled-components';

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

    return (
        <div>
            <div style={{paddingTop: '64px'}}></div>
            <div style={{
                width: '100vw',
                height: '100vh',
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
        </div>
    );
};

export default EddiTcgMainLobby;