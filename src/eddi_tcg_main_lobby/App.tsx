import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const MyScene: React.FC = () => {
    const boxRef = useRef<THREE.Mesh | null>(null);

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {boxRef.current && (
                <mesh ref={boxRef} position={[0, 0, 0]}>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
            )}
            <OrbitControls />
            {boxRef.current && <RotatingBox box={boxRef} />}
        </Canvas>
    );
};

const RotatingBox: React.FC<{ box: React.MutableRefObject<THREE.Mesh | null> }> = ({ box }) => {
    // Rotate the box
    useFrame(() => {
        if (box.current) {
            box.current.rotation.x += 0.01;
            box.current.rotation.y += 0.01;
        }
    });

    return null;
};

const App: React.FC = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MyScene />
        </div>
    );
};

export default App;
