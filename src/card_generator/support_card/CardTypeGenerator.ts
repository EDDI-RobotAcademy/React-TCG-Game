import * as THREE from 'three';
import {Mesh, Scene, Vector3} from "three";

export default class CardTypeGenerator {
    private scene: THREE.Scene;
    private cardList: THREE.Mesh[];
    private cardPosition: Vector3

    constructor(scene: Scene, cardList: Mesh[], cardPosition: Vector3) {
        this.scene = scene;
        this.cardList = cardList;
        this.cardPosition = cardPosition
    }

    public async generateCardType(texturePath: string): Promise<THREE.Mesh | null> {
        const texture = await this.loadTexture(texturePath);
        if (!texture) return null;

        const cardTypeMesh = this.createCardTypeMesh(texture);
        if (!cardTypeMesh) return null;

        this.scene.add(cardTypeMesh);
        // this.cardList.push(weaponMesh);

        return cardTypeMesh;
    }

    private async loadTexture(texturePath: string): Promise<THREE.Texture | null> {
        return new Promise((resolve) => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(texturePath, (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace
                resolve(texture);
            });
        });
    }

    private createCardTypeMesh(texture: THREE.Texture): THREE.Mesh {
        // 무기 메시 생성 및 설정
        const cardTypeMeshSize = 44;
        const cardTypeMeshGeometry = new THREE.PlaneGeometry(cardTypeMeshSize, cardTypeMeshSize);
        const cardTypeMeshMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const cardTypeMeshMesh = new THREE.Mesh(cardTypeMeshGeometry, cardTypeMeshMaterial);

        // 무기 메시의 위치 설정
        cardTypeMeshMesh.position.set(this.cardPosition.x + 50, this.cardPosition.y - 80, this.cardPosition.z);

        // 무기 메시의 회전 설정
        cardTypeMeshMesh.rotation.set(0, 0, 0); // 원하는 회전 각도로 설정

        return cardTypeMeshMesh;
    }
}
