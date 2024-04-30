import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useYourFixedFieldUnitAreaVerticesStore } from "./store";

const YourFixedFieldUnitArea: React.FC = () => {
    const { scene } = useThree();
    const rectangleRef = useRef<THREE.Mesh>();
    const { vertices: rectangleVertices, setVertices: setRectangleVertices } = useYourFixedFieldUnitAreaVerticesStore();

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    useEffect(() => {
        const aspectRatio = screenWidth / screenHeight;
        const rectangleWidth = screenWidth * 0.72; // 화면 너비의 절반
        const rectangleHeight = screenHeight * 0.5 / aspectRatio;

        const topLeft = { x: screenWidth / 2 - rectangleWidth / 2, y: screenHeight * 0.38 + rectangleHeight / 2 };
        const topRight = { x: screenWidth / 2 + rectangleWidth / 2, y: screenHeight * 0.38 + rectangleHeight / 2 };
        const bottomLeft = { x: screenWidth / 2 - rectangleWidth / 2, y: screenHeight * 0.38 - rectangleHeight / 2 };
        const bottomRight = { x: screenWidth / 2 + rectangleWidth / 2, y: screenHeight * 0.38 - rectangleHeight / 2 };

        setRectangleVertices([topLeft, topRight, bottomLeft, bottomRight]);

        const geometry = new THREE.BoxGeometry(rectangleWidth, rectangleHeight, 0); // 사각형의 가로, 세로, 높이 설정
        const material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.1 }); // 색상 설정
        const rectangle = new THREE.Mesh(geometry, material); // Mesh 생성
        rectangle.position.set(screenWidth / 2, screenHeight * 0.38, 0); // 위치 설정 (가운데로 배치)

        scene.add(rectangle); // 씬에 추가

        rectangleRef.current = rectangle;

        return () => {
            scene.remove(rectangle); // 컴포넌트가 언마운트되면 사각형 제거
        };
    }, [scene]);

    return null; // Three.js 요소를 직접적으로 렌더링하지 않으므로 null 대신 아무것도 반환하지 않습니다.
};

export default YourFixedFieldUnitArea;
