import { create } from "zustand";

export interface Params {
  q?: string;
  title?: string;
  author?: string; 
}

export interface ParamsStore {
  params: Params;
  type: string;
  setMainParams: (mainParams: string, type: string) => void;
  setType: (newType: string) => void;
  setKeyword: (newQ: string) => void;
  setAuthor: (newAutor: string) => void;
  setTitle: (newTitle: string) => void;
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
    setType: (newType) => set(() => ({ type: newType })),
    setKeyword: (q) => set(() => ({params: { q, title: "", author: "" }})),
    setAuthor: (author) => set((store) => ({ params: { ...store.params, author }})),
    setTitle: (title) => set((store) => ({ params: { ...store.params, title }})),
})) 

export default useSearchBookStore;