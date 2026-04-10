import { create } from "zustand";

interface UIState {
  isSidebarCollapsed: boolean;
  isModalOpen: boolean;
  activeModal: string | null;
  toggleSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarCollapsed: false,
  isModalOpen: false,
  activeModal: null,
  
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  
  openModal: (modalId) => set({ isModalOpen: true, activeModal: modalId }),
  
  closeModal: () => set({ isModalOpen: false, activeModal: null }),
}));
