import * as THREE from 'three';
import {Mesh, Scene, Vector3} from "three";

export default class HpGenerator {
    private scene: THREE.Scene;
    private cardList: THREE.Mesh[];
    private cardPosition: Vector3

    constructor(scene: Scene, cardList: Mesh[], cardPosition: Vector3) {
        this.scene = scene;
        this.cardList = cardList;
        this.cardPosition = cardPosition
    }

    public async generateHp(texturePath: string): Promise<THREE.Mesh | null> {
        const texture = await this.loadTexture(texturePath);
        if (!texture) return null;

        const weaponMesh = this.createHpMesh(texture);
        if (!weaponMesh) return null;

        this.scene.add(weaponMesh);
        // this.cardList.push(weaponMesh);

        return weaponMesh;
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

    private createHpMesh(texture: THREE.Texture): THREE.Mesh {
        // 무기 메시 생성 및 설정
        const hpSize = 35;
        const hpGeometry = new THREE.PlaneGeometry(hpSize, hpSize * 1.6545);
        const hpMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const hpMesh = new THREE.Mesh(hpGeometry, hpMaterial);

        // 무기 메시의 위치 설정
        hpMesh.position.set(this.cardPosition.x - 54, this.cardPosition.y - 70, this.cardPosition.z);

        // 무기 메시의 회전 설정
        hpMesh.rotation.set(0, 0, 0); // 원하는 회전 각도로 설정

        return hpMesh;
    }
}
