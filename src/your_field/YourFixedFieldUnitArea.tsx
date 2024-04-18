import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

import getCardInfo, {getCardKinds} from "../common/CardInfoReader";
import BattleFieldCardGenerator from "../card_generator/BattleFieldCardGenerator";
import BattleFieldCardRepository from "../battle_field_card/infra/BattleFieldCardRepository";

const battleFieldCardRepository = new BattleFieldCardRepository();
const cardWidth = 105

// 다음 카드의 위치를 계산하는 함수


const YourFixedFieldUnitArea: React.FC = () => {

    return null;
};

export default YourFixedFieldUnitArea;
