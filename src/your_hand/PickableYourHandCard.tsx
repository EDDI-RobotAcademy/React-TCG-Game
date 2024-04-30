import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import useYourHandStore from "./state/store";
import CardAttachedShape from "./CardAttachedShape";
import getCardInfo, {getCardKinds} from "../common/CardInfoReader";
import BattleFieldCardGenerator from "../card_generator/BattleFieldCardGenerator";
import BattleFieldCardRepository from "../battle_field_card/infra/BattleFieldCardRepository";

import {useYourFixedFieldUnitAreaVerticesStore, Vertex} from '../your_field/store';

const battleFieldCardRepository = new BattleFieldCardRepository();
const cardWidth = 105

// 다음 카드의 위치를 계산하는 함수
const getNextPosition = (index: number): { x: number; y: number } => {
    const cardHeight = cardWidth * 1.515; // 카드의 높이
    const rowSize = 5; // 시야에 보이는 행의 카드 수

    // 행과 열 계산
    const col = index % rowSize;

    // start_x
    const start_x = 0.3075 * window.innerWidth

    // end_x
    const end_x = 0.6925 * window.innerWidth

    // available_x = end_x - start_x = 0.385
    const available_x = 0.6925 - 0.3075

    // 가운데를 중심으로 잡고 있기 때문에 시작과 끝은 반씩 가져가서 1개를 더 적게 카운트해도 됨
    // card_width_ratio = 0.08125 * 4 = 0.325
    const card_width_ratio= cardWidth / window.innerWidth

    // remain_ratio = available_x - card_width_ratio * 4 = 0.385 - 0.325 = 0.06
    const remain_ratio = available_x - card_width_ratio * 4
    console.log('remain_ratio: ', remain_ratio)

    // each_margin_ratio = remain_ratio / 4.0 = 0.015
    const each_margin_ratio = remain_ratio / 4.0

    // 카드의 x, y 좌표 계산
    const x = start_x + index * (cardWidth + each_margin_ratio * window.innerWidth);
    const y = 0.10950920245 * window.innerHeight;

    console.log('cardWidth + each_margin_ratio * window.innerWidth: ', cardWidth + each_margin_ratio * window.innerWidth)
    console.log('each_margin_ratio * window.innerWidth: ', each_margin_ratio * window.innerWidth)

    return { x, y };
};

// 이미지 로드 함수
const loadImageTexture = (imagePath: string): Promise<THREE.Texture> => {
    return new Promise((resolve) => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(imagePath, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace
            resolve(texture);
        });
    });
};

// 카드 생성 함수
const createBattleFieldCardMesh = (texture: THREE.Texture, cardIndex: number): THREE.Mesh => {
    const { x, y } = getNextPosition(cardIndex);
    // 427 / 1600 = 0.266875 -> 427 + 65 / 1600 -> 492 / 1600 = 0.3075
    // 1108 / 1600 = 0.6925

    // const cardWidth = 105
    const height = cardWidth * 1.618

    const geometry = new THREE.PlaneGeometry(cardWidth, height);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
    const cardMesh = new THREE.Mesh(geometry, material);
    // cardMesh.position.set(0.3075 * window.innerWidth, 0.15950920245 * window.innerHeight, 0); // 카드의 위치 설정
    cardMesh.position.set(x, y, 0); // 카드의 위치 설정
    return cardMesh;
};

const PickableYourHandCard: React.FC = () => {
    const [cardAttachedList, setCardAttachedList] = useState<any>(null);

    // 상태를 가져옵니다.
    const yourHandList = useYourHandStore(state => state.yourHandList);
    const { scene, camera, gl } = useThree();
    const [cardList, setCardList] = useState<{ mesh: THREE.Mesh; index: number }[]>([]);

    const [selectedCard, setSelectedCard] = useState<THREE.Mesh | null>(null);
    const [initialCardPosition, setInitialCardPosition] = useState<{ x: number; y: number } | null>(null);

    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
    const { vertices } = useYourFixedFieldUnitAreaVerticesStore(); // 배틀 필드 영역의 위치 가져오기

    const [loading, setLoading] = useState<boolean>(true)
    const [addedCardIndexes, setAddedCardIndexes] = useState<number[]>([]);

    // 배틀 필드 영역 내에 들어왔는지 확인하는 함수
    const checkIfInArea = (position: { x: number; y: number }, vertices: Vertex[]): boolean => {
        const { x, y } = position;

        // 사각형의 네 개의 정점 좌표를 가져옵니다.
        const [topLeft, topRight, bottomLeft, bottomRight] = vertices;

        // 정점을 이용하여 사각형의 경계를 정의합니다.
        const minX = Math.min(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
        const maxX = Math.max(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
        const minY = Math.min(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
        const maxY = Math.max(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);

        // 사각형 경계 내부에 있는지 확인합니다.
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    };

    // 카드 생성 및 렌더링
    useEffect(() => {
        const loadCards = async () => {
            setLoading(true)

            const cardGenerator = new BattleFieldCardGenerator(scene);
            const newCardList: { mesh: THREE.Mesh, index: number }[] = [];

            for (let cardIndex = 0; cardIndex < yourHandList.length; cardIndex++) {
                if (addedCardIndexes.includes(cardIndex)) continue

                const cardId = yourHandList[cardIndex];

                const cardKinds = getCardKinds(cardId);
                console.log('cardKinds: ', cardKinds)

                const imagePath = `/assets/eddi_tcg_game/images/battle_field_card/${cardId}.png`;
                const texture = await loadImageTexture(imagePath);
                const cardMesh = createBattleFieldCardMesh(texture, cardIndex);

                const cardAttachedList = await cardGenerator.generateCard(cardId.toString(), cardIndex, cardKinds, cardMesh.position);

                scene.add(cardMesh)
                // newCardList.push(cardMesh)

                const cardObject = { mesh: cardMesh, index: cardIndex };
                newCardList.push(cardObject);

                battleFieldCardRepository.addCardAttachedInfo(cardAttachedList)
            }
            setCardList(newCardList);
            setLoading(false)
        };
        loadCards();
    }, []);

    const handleMouseDown = (event: MouseEvent) => {
        console.log('마우스 클릭 이벤트 발생:', event.clientX, event.clientY);
        event.preventDefault();

        // 마우스 버튼에 따라 다른 동작 수행
        switch (event.button) {
            case 0: // 좌클릭
                handleLeftClick(event);
                break;
            case 2: // 우클릭
                handleRightClick(event);
                break;
            default:
                break;
        }
    };

    // 좌클릭 처리
    const handleLeftClick = (event: MouseEvent) => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const meshes = cardList.map(cardObject => cardObject.mesh);
        const index = cardList.map(cardObject => cardObject.index);
        const intersects = raycaster.intersectObjects(meshes);

        if (intersects.length > 0) {
            const selectedObject = intersects[0].object as THREE.Mesh;

            const selectedCardObject = cardList.find(cardObject => cardObject.mesh === selectedObject);
            setInitialCardPosition({ x: selectedObject.position.x, y: selectedObject.position.y });
            const index = selectedCardObject?.index;
            console.log('좌클릭: 오브젝트 선택됨, 카드 인덱스:', index);

            setSelectedCard(selectedObject);
            setMouseDown(true);
            setStartPosition({ x: event.clientX, y: event.clientY });
        }
    };

    // 우클릭 처리
    const handleRightClick = (event: MouseEvent) => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const meshes = cardList.map(cardObject => cardObject.mesh);
        const intersects = raycaster.intersectObjects(meshes);

        if (intersects.length > 0) {
            console.log('우클릭: 오브젝트 선택됨');
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        event.preventDefault();
        if (!mouseDown || !selectedCard) return;
        console.log('마우스 이동');

        const mouseX = event.clientX - (startPosition?.x || 0);
        const mouseY = event.clientY - (startPosition?.y || 0);
        console.log('mouseX: ', mouseX, 'mouseY: ', mouseY)
        console.log('startPosition.x: ', startPosition?.x, 'startPosition.y: ', startPosition?.y)
        console.log('window.innerWidth: ', window.innerWidth, 'window.innerHeight: ', window.innerHeight)

        const newX = selectedCard.position.x + mouseX;
        const newY = selectedCard.position.y - mouseY;

        selectedCard.position.x += mouseX;
        selectedCard.position.y -= mouseY;

        const selectedCardObject = cardList.find(cardObject => cardObject.mesh === selectedCard);

        if (selectedCardObject) {
            const index = selectedCardObject.index;
            const cardAttachedList = battleFieldCardRepository.getCardAttachedInfo(index.toString())

            cardAttachedList?.attachedMeshes?.forEach(attachedMesh => {
                // 각 부착된 메시의 위치를 업데이트합니다.
                attachedMesh.mesh.position.x += mouseX;
                attachedMesh.mesh.position.y -= mouseY;
                console.log('attachedMesh: ', attachedMesh)
            });

            setCardAttachedList(cardAttachedList);
        }

        setStartPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
        console.log('마우스 떼기');
        setMouseDown(false);

        if (selectedCard && initialCardPosition) {
            const inArea = checkIfInArea({ x: selectedCard.position.x, y: selectedCard.position.y }, vertices);
            console.log('카드를 놓은 위치:', selectedCard.position.x, selectedCard.position.y);
            console.log('카드를 놓은 위치가 영역 내에 있는지:', inArea ? 'your field 영역 내에 있습니다' : 'your field 영역 밖에 있습니다');

            if (!inArea) {
                // 영역 밖에 있으면 초기 위치로 되돌립니다.
                selectedCard.position.set(initialCardPosition.x, initialCardPosition.y, 0);

                // 부착된 메시의 위치도 초기화합니다.
                const selectedCardObject = cardList.find(cardObject => cardObject.mesh === selectedCard);
                if (selectedCardObject) {
                    const index = selectedCardObject.index;
                    const cardAttachedList = battleFieldCardRepository.getCardAttachedInfo(index.toString());

                    cardAttachedList?.attachedMeshes?.forEach(attachedMesh => {
                        attachedMesh.mesh.position.set(initialCardPosition.x, initialCardPosition.y, 0);
                    });

                    setCardAttachedList(cardAttachedList);
                }
            }
        }

        setSelectedCard(null);
    };

    useEffect(() => {
        gl.domElement.addEventListener('mousedown', handleMouseDown);
        gl.domElement.addEventListener('mousemove', handleMouseMove);
        gl.domElement.addEventListener('mouseup', handleMouseUp);
        return () => {
            gl.domElement.removeEventListener('mousedown', handleMouseDown);
            gl.domElement.removeEventListener('mousemove', handleMouseMove);
            gl.domElement.removeEventListener('mouseup', handleMouseUp);
        };
    }, [gl, handleMouseDown, handleMouseMove, handleMouseUp]);

    // 카드의 위치를 카메라 시야 범위에 맞게 조정
    // 카드의 위치를 카메라 시야 범위에 맞게 조정
    useEffect(() => {
        const handleResize = () => {
            // 카드의 위치를 다시 계산하여 업데이트
            const updateCardPositions = () => {
                const newCardList = cardList.map(cardObject => {
                    const { mesh, index } = cardObject;
                    const { x, y } = getNextPosition(index);
                    mesh.position.set(x, y, 0);
                    return { mesh, index };
                });
                setCardList(newCardList);
            };
            updateCardPositions();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (loading) {
        return null;
    }

    return null;
};

export default PickableYourHandCard;
