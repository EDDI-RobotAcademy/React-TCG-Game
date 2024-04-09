import cardData from "./every_card_info";
import {CardKinds} from "./CardKinds";

function getCardInfo(cardNumber: number) {
    return cardData.find(card => card['카드번호'] === cardNumber);
}

export function getCardRace(cardNumber: number): string | undefined {
    const cardInfo = cardData.find(card => card['카드번호'] === cardNumber);
    return cardInfo ? cardInfo['종족'] : undefined;
}

export function getCardGrade(cardNumber: number): string | undefined {
    const cardInfo = cardData.find(card => card['카드번호'] === cardNumber);
    return cardInfo ? cardInfo['등급'] : undefined;
}

export function getCardKinds(cardNumber: number): CardKinds {
    const cardInfo = cardData.find(card => card['카드번호'] === cardNumber);
    const cardKinds = cardInfo ? cardInfo['종류'] : undefined;

    switch (Number(cardKinds)) {
        case 1:
            return CardKinds.UnitCard
        case 2:
            return CardKinds.TrapCard
        case 3:
            return CardKinds.ItemCard
        case 4:
            return CardKinds.SupportCard
        case 5:
            return CardKinds.ToolCard
        case 6:
            return CardKinds.EnergyCard
        default:
            return CardKinds.Unknown
    }
}

export function getCardAttackDamage(cardNumber: number): number | undefined {
    const cardInfo = cardData.find(card => card['카드번호'] === cardNumber);
    return cardInfo ? cardInfo['공격력'] : undefined;
}

export default getCardInfo;