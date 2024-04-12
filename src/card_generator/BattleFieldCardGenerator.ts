import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {CardKinds} from "../common/CardKinds";
import WeaponGenerator from "./unit_card/WeaponGenerator";
import {Mesh, MeshBasicMaterial, PlaneGeometry, Vector3} from "three";

export default class BattleFieldCardGenerator {
    private scene: THREE.Scene;
    private cardList: THREE.Mesh[];

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        this.cardList = [];
    }

    public async generateCard(cardId: string, cardIndex: number, cardKind: CardKinds, position: Vector3): Promise<Mesh[] | null> {
        const imagePath = `/assets/eddi_tcg_game/images/battle_field_card/${cardId}.png`;
        const texture = await this.loadImageTexture(imagePath);

        let cardMeshes: THREE.Mesh[] | null = null;

        switch (cardKind) {
            case CardKinds.UnitCard:
                cardMeshes = await this.createUnitCard(texture, cardIndex, position);
                break;
            case CardKinds.TrapCard:
                cardMeshes = [this.createTrapCard(texture, cardIndex)];
                break;
            case CardKinds.ItemCard:
                cardMeshes = [this.createItemCard(texture, cardIndex)];
                break;
            case CardKinds.SupportCard:
                cardMeshes = [this.createSupportCard(texture, cardIndex)];
                break;
            case CardKinds.ToolCard:
                cardMeshes = [this.createToolCard(texture, cardIndex)];
                break;
            case CardKinds.EnergyCard:
                cardMeshes = [this.createEnergyCard(texture, cardIndex)];
                break;
            default:
                console.error('Unknown card kind:', cardKind);
                break;
        }

        if (cardMeshes) {
            for (const cardMesh of cardMeshes) {
                this.scene.add(cardMesh);
                this.cardList.push(cardMesh);
            }
        }

        return cardMeshes;
    }

    private async loadImageTexture(imagePath: string): Promise<THREE.Texture> {
        return new Promise((resolve) => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(imagePath, (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                resolve(texture);
            });
        });
    }

    private createUnitCard(texture: THREE.Texture, cardIndex: number, position: Vector3): Promise<Mesh[] | null> {
        const weaponGenerator = new WeaponGenerator(this.scene, this.cardList, position);
        const weaponMesh = weaponGenerator.generateWeapon("/assets/eddi_tcg_game/images/unit_card_attack_power/20.png")

        return weaponMesh
    }

    private createTrapCard(texture: THREE.Texture, cardIndex: number): THREE.Mesh {
        // Implement creation of trap card mesh here
        return new THREE.Mesh(); // Replace with actual implementation
    }

    private createItemCard(texture: THREE.Texture, cardIndex: number): THREE.Mesh {
        // Implement creation of item card mesh here
        return new THREE.Mesh(); // Replace with actual implementation
    }

    private createSupportCard(texture: THREE.Texture, cardIndex: number): THREE.Mesh {
        // Implement creation of support card mesh here
        return new THREE.Mesh(); // Replace with actual implementation
    }

    private createToolCard(texture: THREE.Texture, cardIndex: number): THREE.Mesh {
        // Implement creation of tool card mesh here
        return new THREE.Mesh(); // Replace with actual implementation
    }

    private createEnergyCard(texture: THREE.Texture, cardIndex: number): THREE.Mesh {
        // Implement creation of energy card mesh here
        return new THREE.Mesh(); // Replace with actual implementation
    }
}