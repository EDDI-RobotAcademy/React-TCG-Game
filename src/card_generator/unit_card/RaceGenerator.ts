import * as THREE from 'three';
import {Mesh, Scene, Vector3} from "three";

export default class RaceGenerator {
    private scene: THREE.Scene;
    private cardList: THREE.Mesh[];
    private cardPosition: Vector3

    constructor(scene: Scene, cardList: Mesh[], cardPosition: Vector3) {
        this.scene = scene;
        this.cardList = cardList;
        this.cardPosition = cardPosition
    }

    public async generateRace(texturePath: string): Promise<THREE.Mesh | null> {
        const texture = await this.loadTexture(texturePath);
        if (!texture) return null;

        const raceMesh = this.createRaceMesh(texture);
        if (!raceMesh) return null;

        this.scene.add(raceMesh);
        // this.cardList.push(weaponMesh);

        return raceMesh;
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

    private createRaceMesh(texture: THREE.Texture): THREE.Mesh {
        // 무기 메시 생성 및 설정
        const raceSize = 44;
        const raceGeometry = new THREE.PlaneGeometry(raceSize, raceSize);
        const raceMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const raceMesh = new THREE.Mesh(raceGeometry, raceMaterial);

        // 무기 메시의 위치 설정
        raceMesh.position.set(this.cardPosition.x + 50, this.cardPosition.y + 78, this.cardPosition.z);

        // 무기 메시의 회전 설정
        raceMesh.rotation.set(0, 0, 0); // 원하는 회전 각도로 설정

        return raceMesh;
    }
}
