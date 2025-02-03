import { create } from "zustand";

export interface Params {
  q: string;
}

export interface ParamsStore {
  params: Params;
  setKeyword: (newQ: string) => void;
}

const useSearchBookStore = create<ParamsStore>((set) => ({
    params: {q:""}, 
    setKeyword: (q) => set(() => ({params: { q }})),
})) 

export default useSearchBookStore;