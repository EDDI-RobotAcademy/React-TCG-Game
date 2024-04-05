import React, {useState, useRef, useEffect, useMemo} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import AudioPlayer from "../audio_player/AudioPlayer";
import { useNavigate } from 'react-router-dom';

const imagePath = "/assets/eddi_tcg_game/images/battle_field_card/134.png";
const cardBackFramePath = "/assets/eddi_tcg_game/images/battle_field/card_back_frame.png";

// // 이미지를 렌더링하는 컴포넌트
// const ImagePlane: React.FC<{ image: string }> = ({ image }) => {
//     const texture = new THREE.TextureLoader().load(image); // 이미지 로드
//
//     // 메쉬 생성
//     const meshRef = useRef<THREE.Mesh>(null);
//
//     useFrame(() => {
//         if (meshRef.current) {
//             meshRef.current.rotation.y += 0.01; // 매 프레임마다 회전
//         }
//     });
//
//     return (
//         <mesh ref={meshRef} position={[0, 0, 0]}>
//             <planeGeometry args={[2, 2]} />
//             <meshBasicMaterial map={texture} transparent />
//         </mesh>
//     );
// };

const ImagePlane: React.FC<{ frontImage: string; backImage: string }> = ({ frontImage, backImage }) => {
    const textureFront = useMemo(() => new THREE.TextureLoader().load(frontImage), [frontImage]); // 앞면 이미지 로드
    const textureBack = useMemo(() => new THREE.TextureLoader().load(backImage), [backImage]); // 뒷면 이미지 로드

    // 뒷면 이미지 메쉬의 회전 각도
    const rotation = useRef<number>(Math.PI); // 180도 (라디안)

    return (
        <>
            {/* 앞면 */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[2, 2]} />
                <meshBasicMaterial map={textureFront} transparent />
            </mesh>
            {/* 뒷면 */}
            <mesh position={[0, 0, 0]} rotation={[0, rotation.current, 0]}>
                <planeGeometry args={[2, 2]} />
                <meshBasicMaterial map={textureBack} transparent />
            </mesh>
        </>
    );
};


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

const BattleFieldScene: React.FC = () => {
    return (
        <Canvas style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {/*<RotatingBox />*/}
            {/*<ImagePlane image={imagePath} />*/}
            <ImagePlane frontImage={imagePath} backImage={cardBackFramePath} />
            <OrbitControls />
        </Canvas>
    );
};

const EddiTcgBattleField: React.FC = () => {
    const cardShopAudioUrl = "/assets/eddi_tcg_game/music/battle_field/battle-field.mp3";
    const navigate = useNavigate();

    return (
        <div>
            <div style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                backgroundImage: `url(/assets/eddi_tcg_game/images/battle_field/battle_field_background.png)`,
                backgroundSize: '100vw 100vh',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', // Center the background image
            }}>
                <AudioPlayer url={cardShopAudioUrl}/>
                <BattleFieldScene/>
            </div>
        </div>
    );
};

export default EddiTcgBattleField;