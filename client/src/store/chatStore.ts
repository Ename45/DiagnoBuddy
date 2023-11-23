import { create } from 'zustand';

interface ChatStoreState {
    userName: string;
    userEmail: string;
    messages: Array<{
        id: string;
        sender: string;
        text: string;
        time: string;
        isUser: boolean;
    }>;
}

interface ChatStoreActions extends ChatStoreState {
    setUserName: (name: string) => void;
    setUserEmail: (email: string) => void;
    addMessage: (message: {
        id: string;
        sender: string;
        text: string;
        time: string;
        isUser: boolean;
        remove?: boolean;
    }) => void;
}

const useChatStore = create<ChatStoreActions>((set) => ({
    userName: '',
    userEmail: '',
    messages: [],

    setUserName: (name) => set({ userName: name }),
    setUserEmail: (email) => set({ userEmail: email }),
    addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
}));

export default useChatStore;
