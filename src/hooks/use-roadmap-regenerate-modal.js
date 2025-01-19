import { create } from 'zustand';

const useRoadmapRegenerateModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useRoadmapRegenerateModal;