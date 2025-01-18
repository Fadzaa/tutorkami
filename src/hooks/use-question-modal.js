import { create } from 'zustand';


const useQuestionsModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useQuestionsModal;