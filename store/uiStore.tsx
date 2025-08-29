import { create } from 'zustand';

interface UiState {
    hideBottomNav: boolean;
    setHideBottomNav: (hide: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
    hideBottomNav: false,
    setHideBottomNav: (hide) => set({ hideBottomNav: hide }),
}));
