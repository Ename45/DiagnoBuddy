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
    deleteLastMessage: () => void;
}

const useChatStore = create<ChatStoreActions>((set) => ({
    userName: '',
    userEmail: '',
    messages: [
        {
            id: '1',
            sender: 'DaignoBuddy',
            text: 'Hello! I am DiagnoBuddy, a medical assistant chatbot. My purpose is to help you with any medical concerns or symptoms you may have. How can I assist you today?',
            time: '7:23 AM',
            isUser: false,
        },
    ],

    setUserName: (name) => set({ userName: name }),
    setUserEmail: (email) => set({ userEmail: email }),
    addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
    deleteLastMessage: () =>
        set((state) => ({ messages: state.messages.slice(0, -1) })),
}));

export default useChatStore;
