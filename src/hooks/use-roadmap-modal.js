import { create } from 'zustand';


const useRoadmapsModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useRoadmapsModal;