import { create } from "zustand";

export interface Params {
  q?: string;
  title?: string;
  author?: string; 
  sort?: string;
}

export interface ParamsStore {
  params: Params;
  type: string;
  setMainParams: (mainParams: string, type: string) => void;
  setSort: (newOrder: string) => void;
  setType: (newType: string) => void;
}

const useSearchBookStore = create<ParamsStore>((set) => ({
    params: {}, 
    type: "keyword",
    setMainParams: (mainParams: string, type: string) => {
      switch (type) {
        case "keyword":
          set(() => ({ params: { q: mainParams }}))
          break;
        case "author":
          set(() => ({ params: { author: mainParams }}))
          break;
        case "title":
          set(() => ({ params: { title: mainParams }}))
          break;
        default:
          set(() => ({ params: { q: mainParams }}))
          break;
            
      }
    },
    setSort: (newOrder) => set((store) => ({ params: { ...store.params, sort: newOrder } })),
    setType: (newType) => set(() => ({ type: newType })),
})) 

export default useSearchBookStore;