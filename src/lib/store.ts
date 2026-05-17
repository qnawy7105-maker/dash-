import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  currentView: string;
  isDarkMode: boolean;
  setSidebarOpen: (open: boolean) => void;
  setCurrentView: (view: string) => void;
  toggleDarkMode: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  currentView: 'dashboard',
  isDarkMode: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentView: (view) => set({ currentView: view }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

// Placeholder for content store
interface ContentState {
  sections: any[];
  products: any[];
  quiz: any;
  setSections: (sections: any[]) => void;
  setProducts: (products: any[]) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  sections: [],
  products: [],
  quiz: null,
  setSections: (sections) => set({ sections }),
  setProducts: (products) => set({ products }),
}));
