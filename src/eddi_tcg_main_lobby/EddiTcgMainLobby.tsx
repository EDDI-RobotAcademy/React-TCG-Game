import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const RotatingBox: React.FC = () => {
    const boxRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (boxRef.current) {
            boxRef.current.rotation.x += 0.01;
            boxRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Box ref={boxRef} position={[0, 0, 0]} scale={[2, 2, 2]}>
            <meshStandardMaterial color="orange" />
        </Box>
    );
};

const MyScene: React.FC = () => {
    return (
        <Canvas style={{ height: '100vh' }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <RotatingBox />
            <OrbitControls />
        </Canvas>
    );
};

const EddiTcgMainLobby: React.FC = () => {
    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <MyScene />
        </div>
    );
};

export default EddiTcgMainLobby;
