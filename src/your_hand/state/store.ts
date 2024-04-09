import create from 'zustand';

interface YourHandState {
    yourHandList: number[]; // 카드 ID의 배열로 표현합니다.
    initHand: (initialYourHand: number[]) => void;
}

const useYourHandStore = create<YourHandState>((set) => ({
    yourHandList: [],
    initHand: (initialYourHand) => set({ yourHandList: initialYourHand }),
}));

export default useYourHandStore;