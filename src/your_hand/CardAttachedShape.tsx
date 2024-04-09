// CardAttachedShape.tsx
import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CardAttachedShapeProps {
    cardPosition: THREE.Vector3;
}

const CardAttachedShape: React.FC<CardAttachedShapeProps> = ({ cardPosition }) => {
    const [texture, setTexture] = useState<THREE.Texture | null>(null);

    useEffect(() => {
        const loadImageTexture = async () => {
            const textureLoader = new THREE.TextureLoader();
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

    // 모양을 회전시키는 함수
    useFrame(() => {
        // 여기에서 모양을 회전시키는 코드를 작성합니다.
    });

    const weaponSize = 70

    return (
        <mesh position={[cardPosition.x + 45, cardPosition.y - 75, cardPosition.z]}>
            <planeGeometry args={[weaponSize, weaponSize * 1.651]} />
            {texture && (
                <meshBasicMaterial
                    attach="material"
                    map={texture}
                    transparent // 투명한 재질로 설정합니다.
                />
            )}
        </mesh>
    );
};

export default CardAttachedShape;
