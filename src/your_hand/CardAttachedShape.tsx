// CardAttachedShape.tsx
import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { TextureLoader, Mesh, PlaneGeometry, MeshBasicMaterial } from 'three';
import * as THREE from 'three';


interface CardAttachedShapeProps {
    cardPosition: { x: number; y: number; z: number };
}

const CardAttachedShape: React.FC<CardAttachedShapeProps> = ({ cardPosition }) => {
    const [texture, setTexture] = useState<THREE.Texture | null>(null);

    useEffect(() => {
        const loadImageTexture = async () => {
            const textureLoader = new TextureLoader();
            const loadedTexture = await textureLoader.loadAsync("/assets/eddi_tcg_game/images/unit_card_attack_power/20.png");
            setTexture(loadedTexture);
        };

        loadImageTexture();

        return () => {
            // 컴포넌트가 언마운트되면 텍스처를 해제합니다.
            if (texture) {
                texture.dispose();
            }
        };
    }, []);

    // 모양을 회전시키는 변수
    const rotationSpeed = 0.01;

    // 모양을 회전시키는 상태
    const [rotation, setRotation] = useState<number>(0);

    // 모양을 회전시키는 함수
    useFrame(() => {
        setRotation((prevRotation) => prevRotation + rotationSpeed);
    });

    const weaponSize = 70;

    // 카드 모양을 생성합니다.
    const cardShape = new Mesh(new PlaneGeometry(weaponSize, weaponSize * 1.651), new MeshBasicMaterial({ map: texture, transparent: true }));

    // 카드 모양의 위치를 설정합니다.
    cardShape.position.set(cardPosition.x + 45, cardPosition.y - 75, cardPosition.z);

    // 카드 모양의 회전을 설정합니다.
    cardShape.rotation.y = rotation;

    return (
        <primitive object={cardShape} />
    );
};

export default CardAttachedShape;
