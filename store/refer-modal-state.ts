import { create } from "zustand";

interface ReferModalStoreState {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useReferModalStoreState = create<ReferModalStoreState>((set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
}));
