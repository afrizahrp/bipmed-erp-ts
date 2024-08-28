import { create } from 'zustand'

interface PageState {
    currentPage: number
    setCurrentPage: (page: number) => void
}

const usePageStore = create<PageState>((set) => ({
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page })
}))

export default usePageStore