import { create } from 'zustand'

type State = {
    publicKey: string,
    lamports: number

}

type Action = {
    setData: (publicKey: State['publicKey'], lamports: State["lamports"]) => void,
    setLamports: (lamports: State["lamports"]) => void,
    onDisconnect: () => void
}

export const useStore = create<State & Action>((set) => ({
    publicKey: "",
    lamports: 0,
    setData: (publicKey, lamports) => set(() => ({ publicKey, lamports })),
    setLamports: (lamports) => set(() => ({ lamports })),
    onDisconnect: (() => set(() => ({ lamports: 0, publicKey: "" })))
    //User data
    //Account info
    //set data
    //remove data ,i.e: disconnect
}))

