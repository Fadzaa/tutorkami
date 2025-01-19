import { create } from 'zustand';


const useQuestionTimeStop = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useQuestionTimeStop;