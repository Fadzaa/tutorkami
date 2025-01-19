import { create } from 'zustand';


const useGenerateMaterialModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useGenerateMaterialModal;