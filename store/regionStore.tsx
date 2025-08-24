import { create } from 'zustand';

interface RegionState {
    regionId: string | null;
    setRegion: (regionId: string) => void;
}

export const useRegionStore = create<RegionState>((set) => ({
    regionId: null,
    setRegion: (regionId) => set({ regionId }),
}));
