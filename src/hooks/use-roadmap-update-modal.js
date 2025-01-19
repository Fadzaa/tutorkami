import { create } from 'zustand';


const useRoadmapsUpdateModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useRoadmapsUpdateModal;