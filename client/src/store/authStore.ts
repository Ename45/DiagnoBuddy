import { create } from 'zustand';

interface AuthStoreState {
    isAuthenticated: boolean;
    setAuthentication: (value: boolean) => void;
}

const useAuthStore = create<AuthStoreState>((set) => ({
    isAuthenticated: false,
    setAuthentication: (value) => set({ isAuthenticated: value }),
}));

export default useAuthStore;
