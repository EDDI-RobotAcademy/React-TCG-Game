import React, {useState, useRef, useEffect, useMemo} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import AudioPlayer from "../audio_player/AudioPlayer";
import { useNavigate } from 'react-router-dom';

const imagePath = "/assets/eddi_tcg_game/images/battle_field_card/134.png";
const cardBackFramePath = "/assets/eddi_tcg_game/images/battle_field/card_back_frame.png";

const ImagePlane: React.FC<{ frontImage: string; backImage: string }> = ({ frontImage, backImage }) => {
    const textureFront = useMemo(() => new THREE.TextureLoader().load(frontImage), [frontImage]); // 앞면 이미지 로드
    const textureBack = useMemo(() => new THREE.TextureLoader().load(backImage), [backImage]); // 뒷면 이미지 로드

    return (
        <group>
            {/* 앞면 */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[2, 2]} />
                <meshBasicMaterial map={textureFront} side={THREE.FrontSide} />
            </mesh>
            {/* 뒷면 */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[2, 2]} />
                <meshBasicMaterial map={textureBack} side={THREE.BackSide} />
            </mesh>
        </group>
    );
};

const BattleFieldScene: React.FC = () => {
    return (
        <Canvas style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <ImagePlane frontImage={imagePath} backImage={cardBackFramePath} />
            <OrbitControls
                enableRotate={true} // 회전 활성화
                enablePan={true} // 패닝 활성화
                enableZoom={true} // 줌 활성화
                enableDamping={true} // 감속 활성화
                dampingFactor={0.25} // 감속 계수
                minPolarAngle={0} // 최소 pitch 각도 설정
                maxPolarAngle={2 * Math.PI}
            />
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