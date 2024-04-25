import create from 'zustand';

interface RectanglePosition {
    x: number;
    y: number;
}

interface StoreState {
    rectanglePosition: RectanglePosition;
    setRectanglePosition: (position: RectanglePosition) => void;
}

export const useStore = create<StoreState>((set) => ({
    rectanglePosition: { x: 0, y: 0 },
    setRectanglePosition: (position: RectanglePosition) => set({ rectanglePosition: position }),
}));
