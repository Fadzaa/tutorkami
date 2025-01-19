import { create } from 'zustand';


const useMaterialGenerateQuizModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useMaterialGenerateQuizModal;