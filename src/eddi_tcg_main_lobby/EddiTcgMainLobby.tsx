import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const BackgroundPlane: React.FC = () => {
    const texture = new THREE.TextureLoader().load('/assets/eddi_tcg_game/images/main_lobby/battle_lobby_background.png');
    const { viewport } = useThree();
    const aspectRatio = viewport.width / viewport.height;
    const planeWidth = 31.2; // 가로 크기
    const planeHeight = planeWidth / aspectRatio; // 화면 비율에 맞춰 세로 크기 조정

    return (
        <mesh position={[0, 0, -5]}>
            <planeGeometry args={[planeWidth, planeHeight]} />
            <meshBasicMaterial attach="material" map={texture} side={THREE.DoubleSide} />
        </mesh>
    );
};

const RotatingBox: React.FC = () => {
    const boxRef = useRef<THREE.Mesh>(null);

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
            <BackgroundPlane />
            <RotatingBox />
            <OrbitControls />
        </Canvas>
    );
};

const EddiTcgMainLobby: React.FC = () => {
    return (
        <MyScene />
    );
};

export default EddiTcgMainLobby;
