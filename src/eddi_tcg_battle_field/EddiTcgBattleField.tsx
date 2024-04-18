import React, {useState, useRef, useEffect, useMemo} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {OrbitControls, OrthographicCamera} from '@react-three/drei';
import * as THREE from 'three';
import AudioPlayer from "../audio_player/AudioPlayer";
import { useNavigate } from 'react-router-dom';
import PickableYourHandCard from "../your_hand/PickableYourHandCard";
import useYourHandStore from "../your_hand/state/store";
import {WebGLRenderer} from "three";

const BattleFieldScene: React.FC = () => {
    // 상태를 가져옵니다.
    const initYourHand = useYourHandStore(state => state.initHand);

    // 초기값을 설정합니다.
    useEffect(() => {
        initYourHand([19, 151, 2, 8, 93]);
    }, [initYourHand]);

    // WebGLRenderingContext 초기화를 위한 초기화 함수
    const initGL = (gl: WebGLRenderer) => {
        gl.setClearColor(0xffffff, 0); // 배경 색상을 흰색으로 설정합니다.
    };

    console.log(window.innerWidth);
    console.log(window.innerHeight);

    return (
        <Canvas style={{width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, backgroundColor: 'rgba(255, 255, 255, 0)'}}
                onCreated={({ gl }) => initGL(gl)}>
            <OrthographicCamera
                makeDefault  // 이 카메라를 기본 카메라로 설정합니다.
                left={0}  // 뷰의 왼쪽 경계
                right={window.innerWidth}  // 뷰의 오른쪽 경계
                top={window.innerHeight}  // 뷰의 위쪽 경계
                bottom={0}  // 뷰의 아래쪽 경계
                near={-1}  // 가까운 투영면
                far={1}  // 먼 투영면
            />
            <PickableYourHandCard />
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