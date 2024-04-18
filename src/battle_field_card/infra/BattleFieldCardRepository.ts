import * as THREE from 'three';
import {loadImageTexture} from "../../image_loader/ImageLoader";
import {CardKinds} from "../../common/CardKinds";
import {Mesh} from "three";

interface CardInfo {
    cardMesh: THREE.Mesh;
}

interface AttachedMeshInfo {
    mesh: THREE.Mesh;
    position: THREE.Vector3;
    // 기타 필요한 정보 추가
}

interface CardAttachedInfo {
    attachedMeshes: AttachedMeshInfo[];
}

export default class BattleFieldCardRepository {
    private nextCardIndex: string
    private cardMap: Map<string, CardInfo>;
    private cardAttachedListMap: Map<string, CardAttachedInfo>;

    constructor() {
        this.nextCardIndex = '0'
        this.cardMap = new Map<string, CardInfo>();
        this.cardAttachedListMap = new Map<string, CardAttachedInfo>();
    }

    public addCard(cardMeshInfo: CardInfo): void {
        this.cardMap.set(this.nextCardIndex, cardMeshInfo);
        this.incrementNextCardIndex()
    }

    public addCardAttachedInfo(attachedMeshes: Mesh[] | null): void {
        if (!attachedMeshes) return;

        const convertedAttachedMeshes: AttachedMeshInfo[] = attachedMeshes.map(mesh => {
            return {
                mesh,
                position: mesh.position.clone() // 현재는 간단히 Mesh의 position을 복사하도록 설정
                // 기타 필요한 정보 추가
            };
        });

        this.cardAttachedListMap.set(this.nextCardIndex, { attachedMeshes: convertedAttachedMeshes });
        this.incrementNextCardIndex(); // 다음 카드 인덱스 증가
    }

    public getCard(cardIndex: string): CardInfo | undefined {
        return this.cardMap.get(cardIndex);
    }

    public getCardAttachedInfo(cardIndex: string): CardAttachedInfo | undefined {
        return this.cardAttachedListMap.get(cardIndex);
    }

    private incrementNextCardIndex(): void {
        // 다음 카드 인덱스를 증가시킴
        const nextIndex = parseInt(this.nextCardIndex) + 1;
        this.nextCardIndex = nextIndex.toString();
    }
}