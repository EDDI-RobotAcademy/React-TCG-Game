import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import useYourHandStore from "./state/store";
import CardAttachedShape from "./CardAttachedShape";
import getCardInfo, {getCardKinds} from "../common/CardInfoReader";
import BattleFieldCardGenerator from "../card_generator/BattleFieldCardGenerator";
import BattleFieldCardRepository from "../battle_field_card/infra/BattleFieldCardRepository";

const battleFieldCardRepository = new BattleFieldCardRepository();

// 다음 카드의 위치를 계산하는 함수
const getNextPosition = (index: number): { x: number; y: number } => {
    const cardWidth = 105; // 카드의 너비
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

    const width = 105
    const height = width * 1.515

    const geometry = new THREE.PlaneGeometry(width, height);
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
    // const [cards, setCards] = useState<THREE.Mesh[]>([]);
    // const [cardList, setCardList] = useState<THREE.Mesh[]>([]);
    const [cardList, setCardList] = useState<{ mesh: THREE.Mesh; index: number }[]>([]);
    // const [group, setGroup] = useState<THREE.Group | null>(null);
    const [selectedCard, setSelectedCard] = useState<THREE.Mesh | null>(null);
    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);

    // 카드 생성 및 렌더링
    useEffect(() => {
        const loadCards = async () => {
            const cardGenerator = new BattleFieldCardGenerator(scene);
            // const newGroup: THREE.Mesh[] = [];
            // const newGroup = new THREE.Group()
            const newCardList: { mesh: THREE.Mesh, index: number }[] = [];

            for (let cardIndex = 0; cardIndex < yourHandList.length; cardIndex++) {
                const cardId = yourHandList[cardIndex];

                const cardNumber = cardId; // 찾고자 하는 카드의 번호
                const cardKinds = getCardKinds(cardNumber);
                console.log('cardKinds: ', cardKinds)

                const imagePath = `/assets/eddi_tcg_game/images/battle_field_card/${cardId}.png`;
                const texture = await loadImageTexture(imagePath);
                const cardMesh = createBattleFieldCardMesh(texture, cardIndex); // index 전달
                // scene.add(cardMesh); // 카드를 scene에 추가
                // newGroup.push(cardMesh);

                const cardAttachedList = await cardGenerator.generateCard(cardId.toString(), cardIndex, cardKinds, cardMesh.position);

                scene.add(cardMesh)
                // newCardList.push(cardMesh)

                const cardObject = { mesh: cardMesh, index: cardIndex };
                newCardList.push(cardObject);

                battleFieldCardRepository.addCardAttachedInfo(cardAttachedList)

                // const cardAttachedShape = CardAttachedShape({cardPosition: cardMesh.position});
                // newGroup.add(cardAttachedShape)

            }
            setCardList(newCardList);
        };
        loadCards();
    }, [yourHandList]);

    // 마우스 이벤트 핸들러
    // const handleMouseDown = (event: MouseEvent) => {
    //     event.preventDefault();
    //     const raycaster = new THREE.Raycaster();
    //     const mouse = new THREE.Vector2();
    //     mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;
    //
    //     console.log('event.clientX: ', event.clientX, ', event.clientY: ', event.clientY)
    //     // console.log('mouse.x: ', mouse.x, ', mouse.y: ', mouse.y)
    //
    //     raycaster.setFromCamera(mouse, camera);
    //     const intersects = raycaster.intersectObjects(cards);
    //     if (intersects.length > 0) {
    //         console.log('object selected!')
    //         const selectedObject = intersects[0].object as THREE.Mesh;
    //         setSelectedCard(selectedObject);
    //         setMouseDown(true);
    //         setStartPosition({ x: event.clientX, y: event.clientY });
    //     }
    // };

    const handleMouseDown = (event: MouseEvent) => {
        console.log('마우스 클릭 이벤트 발생:', event.button);
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
        // const intersects = raycaster.intersectObjects(group);
        // const intersects = group ? raycaster.intersectObjects(group.children) : [];
        // const intersects = raycaster.intersectObjects(cardList);
        const meshes = cardList.map(cardObject => cardObject.mesh);
        const index = cardList.map(cardObject => cardObject.index);
        const intersects = raycaster.intersectObjects(meshes);

        if (intersects.length > 0) {
            const selectedObject = intersects[0].object as THREE.Mesh;

            const selectedCardObject = cardList.find(cardObject => cardObject.mesh === selectedObject);
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
        // const intersects = raycaster.intersectObjects(group);
        // const intersects = group ? raycaster.intersectObjects(group.children) : [];
        // const intersects = raycaster.intersectObjects(cardList);
        const meshes = cardList.map(cardObject => cardObject.mesh);
        const intersects = raycaster.intersectObjects(meshes);

        if (intersects.length > 0) {
            console.log('우클릭: 오브젝트 선택됨');
            // 우클릭 처리 추가
            // 여기에 원하는 우클릭 동작을 추가합니다.
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        event.preventDefault();
        if (!mouseDown || !selectedCard) return;

        console.log('move it!')

        const mouseX = event.clientX - (startPosition?.x || 0);
        const mouseY = event.clientY - (startPosition?.y || 0);
        console.log('mouseX: ', mouseX, 'mouseY: ', mouseY)
        console.log('startPosition.x: ', startPosition?.x, 'startPosition.y: ', startPosition?.y)
        console.log('window.innerWidth: ', window.innerWidth, 'window.innerHeight: ', window.innerHeight)

        const aspect = window.innerWidth / window.innerHeight;
        const deltaX = (2 * aspect * mouseX) / window.innerWidth;
        const deltaY = (aspect * mouseY) / window.innerHeight;

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
            // battleFieldCardRepository.addCardAttachedInfo(cardAttachedList)
        }

        setStartPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
        setMouseDown(false);
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

    // console.log('group: ', group, ', group.children: ', group?.children)

    return null;

    // return (
    //     <group>
    //         {group && group.children.map((child, index) => (
    //             <primitive object={child} key={index} />
    //         ))}
    //     </group>
    // );

    // return (
    //     <>
    //         {cards.map((card, index) => (
    //             <React.Fragment key={index}>
    //                 <primitive object={card} />
    //                 <CardAttachedShape cardPosition={card.position} />
    //             </React.Fragment>
    //         ))}
    //     </>
    // );
};

export default PickableYourHandCard;
