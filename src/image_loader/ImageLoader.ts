import * as THREE from 'three';

export async function loadImageTexture(imagePath: string): Promise<THREE.Texture | null> {
    return new Promise((resolve) => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(imagePath, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            resolve(texture);
        }, undefined, (error) => {
            console.error('Failed to load texture:', error);
            resolve(null);
        });
    });
}
