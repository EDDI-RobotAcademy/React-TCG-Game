import * as THREE from 'three';
import {Mesh, Scene, Vector3} from "three";

export default class WeaponGenerator {
    private scene: THREE.Scene;
    private cardList: THREE.Mesh[];
    private cardPosition: Vector3

    constructor(scene: Scene, cardList: Mesh[], cardPosition: Vector3) {
        this.scene = scene;
        this.cardList = cardList;
        this.cardPosition = cardPosition
    }

    public async generateWeapon(texturePath: string): Promise<THREE.Mesh | null> {
        const texture = await this.loadTexture(texturePath);
        if (!texture) return null;

        const weaponMesh = this.createWeaponMesh(texture);
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

    private createWeaponMesh(texture: THREE.Texture): THREE.Mesh {
        // 무기 메시 생성 및 설정
        const weaponSize = 50;
        const weaponGeometry = new THREE.PlaneGeometry(weaponSize, weaponSize * 1.651);
        const weaponMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const weaponMesh = new THREE.Mesh(weaponGeometry, weaponMaterial);

        // 무기 메시의 위치 설정
        weaponMesh.position.set(this.cardPosition.x + 32, this.cardPosition.y - 57, this.cardPosition.z);

        // 무기 메시의 회전 설정
        weaponMesh.rotation.set(0, 0, 0); // 원하는 회전 각도로 설정

        return weaponMesh;
    }
}
