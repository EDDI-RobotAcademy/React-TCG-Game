import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {CardKinds} from "../common/CardKinds";
import WeaponGenerator from "./unit_card/WeaponGenerator";
import {
    BufferGeometry,
    Material,
    Mesh,
    MeshBasicMaterial,
    NormalBufferAttributes,
    Object3DEventMap,
    PlaneGeometry,
    Vector3
} from "three";
import HpGenerator from "./unit_card/HpGenerator";
import RaceGenerator from "./common/RaceGenerator";
import {getCardAttackDamage, getCardHealthPoint, getCardKinds, getCardRace} from "../common/CardInfoReader";
import CardTypeGenerator from "./support_card/CardTypeGenerator";

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

        console.log("Card Generation: ", cardKind)

        switch (cardKind) {
            case CardKinds.UnitCard:
                cardMeshes = await this.createUnitCard(cardId, texture, cardIndex, position);
                break;
            case CardKinds.TrapCard:
                cardMeshes = [this.createTrapCard(texture, cardIndex)];
                break;
            case CardKinds.ItemCard:
                cardMeshes = await this.createItemCard(cardId, texture, cardIndex, position);
                break;
            case CardKinds.SupportCard:
                cardMeshes = await this.createSupportCard(cardId, texture, cardIndex, position);
                break;
            case CardKinds.ToolCard:
                cardMeshes = [this.createToolCard(texture, cardIndex)];
                break;
            case CardKinds.EnergyCard:
                cardMeshes = await this.createEnergyCard(cardId, texture, cardIndex, position);
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

    private async createUnitCard(cardId: string, texture: THREE.Texture, cardIndex: number, position: Vector3): Promise<THREE.Mesh[] | null> {
        const unitCard = new THREE.Mesh();
        console.log('createUnitCard()')

        const weaponDamage = getCardAttackDamage(parseInt(cardId, 10));
        const weaponPath = `/assets/eddi_tcg_game/images/unit_card_attack_power/${weaponDamage}.png`;
        const weaponGenerator = new WeaponGenerator(this.scene, this.cardList, position);
        const weaponMesh = await weaponGenerator.generateWeapon(weaponPath);

        const hpNumber = getCardHealthPoint(parseInt(cardId, 10));
        const hpPath = `/assets/eddi_tcg_game/images/unit_card_hp/${hpNumber}.png`;
        const hpGenerator = new HpGenerator(this.scene, this.cardList, position);
        const hpMesh = await hpGenerator.generateHp(hpPath);

        const raceNumber = getCardRace(parseInt(cardId, 10));
        const racePath = `/assets/eddi_tcg_game/images/unit_card_race/${raceNumber}.png`;
        const raceGenerator = new RaceGenerator(this.scene, this.cardList, position);
        const raceMesh = await raceGenerator.generateRace(racePath);

        if (weaponMesh) {
            unitCard.add(weaponMesh);
        }
        if (hpMesh) {
            unitCard.add(hpMesh);
        }
        if (raceMesh) {
            unitCard.add(raceMesh);
        }

        return [unitCard];
    }

    private createTrapCard(texture: THREE.Texture, cardIndex: number): THREE.Mesh {
        // Implement creation of trap card mesh here
        return new THREE.Mesh(); // Replace with actual implementation
    }

    private async createItemCard(cardId: string, texture: THREE.Texture, cardIndex: number, position: Vector3): Promise<THREE.Mesh[] | null> {
        const itemCardAttachedShapeList = new THREE.Mesh();

        const raceNumber = getCardRace(parseInt(cardId, 10));
        const racePath = `/assets/eddi_tcg_game/images/unit_card_race/${raceNumber}.png`;
        const raceGenerator = new RaceGenerator(this.scene, this.cardList, position);
        const raceMesh = await raceGenerator.generateRace(racePath);

        const cardKinds = getCardKinds(parseInt(cardId, 10));
        const cardKindsPath = `/assets/eddi_tcg_game/images/card_type_mark/${cardKinds}.png`;
        const cardKindsGenerator = new CardTypeGenerator(this.scene, this.cardList, position);
        const cardKindsMesh = await cardKindsGenerator.generateCardType(cardKindsPath);

        if (raceMesh) {
            itemCardAttachedShapeList.add(raceMesh);
        }
        if (cardKindsMesh) {
            itemCardAttachedShapeList.add(cardKindsMesh);
        }

        return [itemCardAttachedShapeList]
    }

    private async createSupportCard(cardId: string, texture: THREE.Texture, cardIndex: number, position: Vector3): Promise<THREE.Mesh[] | null> {
        const supportCardAttachedShapeList = new THREE.Mesh();

        const raceNumber = getCardRace(parseInt(cardId, 10));
        const racePath = `/assets/eddi_tcg_game/images/unit_card_race/${raceNumber}.png`;
        const raceGenerator = new RaceGenerator(this.scene, this.cardList, position);
        const raceMesh = await raceGenerator.generateRace(racePath);

        const cardKinds = getCardKinds(parseInt(cardId, 10));
        const cardKindsPath = `/assets/eddi_tcg_game/images/card_type_mark/${cardKinds}.png`;
        const cardKindsGenerator = new CardTypeGenerator(this.scene, this.cardList, position);
        const cardKindsMesh = await cardKindsGenerator.generateCardType(cardKindsPath);

        if (raceMesh) {
            supportCardAttachedShapeList.add(raceMesh);
        }
        if (cardKindsMesh) {
            supportCardAttachedShapeList.add(cardKindsMesh);
        }

        return [supportCardAttachedShapeList]
    }

    private createToolCard(texture: THREE.Texture, cardIndex: number): THREE.Mesh {
        // Implement creation of tool card mesh here
        return new THREE.Mesh(); // Replace with actual implementation
    }

    private async createEnergyCard(cardId: string, texture: THREE.Texture, cardIndex: number, position: Vector3): Promise<THREE.Mesh[] | null> {
        const energyCardAttachedShapeList = new THREE.Mesh();

        const raceNumber = getCardRace(parseInt(cardId, 10));
        const racePath = `/assets/eddi_tcg_game/images/unit_card_race/${raceNumber}.png`;
        const raceGenerator = new RaceGenerator(this.scene, this.cardList, position);
        const raceMesh = await raceGenerator.generateRace(racePath);

        const cardKinds = getCardKinds(parseInt(cardId, 10));
        const cardKindsPath = `/assets/eddi_tcg_game/images/card_type_mark/${cardKinds}.png`;
        const cardKindsGenerator = new CardTypeGenerator(this.scene, this.cardList, position);
        const cardKindsMesh = await cardKindsGenerator.generateCardType(cardKindsPath);

        if (raceMesh) {
            energyCardAttachedShapeList.add(raceMesh);
        }
        if (cardKindsMesh) {
            energyCardAttachedShapeList.add(cardKindsMesh);
        }

        return [energyCardAttachedShapeList]
    }
}