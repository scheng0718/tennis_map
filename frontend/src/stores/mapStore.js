import { create } from 'zustand'

const useMapStore = create((set) => ({
  courts: [],
  selectedCourt: null,
  activeTab: 'nearby',
  searchQuery: '',
  mapRef: null,

  setCourts: (courts) => set({ courts }),
  selectCourt: (court) => set({ selectedCourt: court }),
  deselectCourt: () => set({ selectedCourt: null }),
  setActiveTab: (tab) => set({ activeTab: tab, selectedCourt: null }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setMapRef: (ref) => set({ mapRef: ref }),
}))

export default useMapStore
