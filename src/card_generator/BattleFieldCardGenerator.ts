import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BattleFieldCardGeneratorProps {
    frontImagePath: string;
    backImagePath: string;
}

const BattleFieldCardGenerator: React.FC<BattleFieldCardGeneratorProps> = ({ frontImagePath, backImagePath }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const textureLoader = new THREE.TextureLoader();
        const frontTexture = textureLoader.load(frontImagePath);
        const backTexture = textureLoader.load(backImagePath);

        const geometry = new THREE.PlaneGeometry(1, 1);
        const frontMaterial = new THREE.MeshBasicMaterial({ map: frontTexture });
        const backMaterial = new THREE.MeshBasicMaterial({ map: backTexture });
        const cardFrontMesh = new THREE.Mesh(geometry, frontMaterial);
        const cardBackMesh = new THREE.Mesh(geometry, backMaterial);

        scene.add(cardFrontMesh);
        scene.add(cardBackMesh);

        // 카드의 위치 및 크기 등을 조정할 수 있습니다.
        cardFrontMesh.position.set(0, 0, 0);
        cardBackMesh.position.set(0, 0, -0.01); // 약간의 거리를 두어 겹치지 않도록 합니다.

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);

            cardFrontMesh.rotation.x += 0.01;
            cardFrontMesh.rotation.y += 0.01;
            cardBackMesh.rotation.x += 0.01;
            cardBackMesh.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            scene.remove(cardFrontMesh);
            scene.remove(cardBackMesh);
            renderer.dispose();
        };
    }, [frontImagePath, backImagePath]);

    return null;
};

export default BattleFieldCardGenerator;
