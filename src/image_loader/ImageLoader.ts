import * as THREE from 'three';

export async function loadImageTexture(imagePath: string): Promise<THREE.Texture | null> {
    return new Promise((resolve) => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(imagePath, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;

            texture.magFilter = THREE.NearestFilter; // 확대 시에 최근접 필터링 사용
            texture.minFilter = THREE.NearestFilter; // 축소 시에 최근접 필터링 사용
            texture.generateMipmaps = false

            resolve(texture);
        }, undefined, (error) => {
            console.error('Failed to load texture:', error);
            resolve(null);
        });
    });
}