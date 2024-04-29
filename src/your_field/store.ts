import create from 'zustand';

export interface Vertex {
    x: number;
    y: number;
}

// 사각형을 표현하는 상태와 함수를 정의하는 인터페이스
interface StoreState {
    vertices: Vertex[]; // 사각형의 4개 정점
    setVertices: (vertices: Vertex[]) => void; // 정점을 업데이트하는 함수
}

export const useYourFixedFieldUnitAreaVerticesStore = create<StoreState>((set) => ({
    vertices: [],
    setVertices: (vertices) => set({ vertices }),
}));
