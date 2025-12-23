import {createContext} from "react";

export interface DataItem {
    id: number | string;
    question: string;
    answer: string
}

export interface Value {
    getDataBySearch: (input: string) => Promise<void>
    getRandomQuestion: () => Promise<void>
    getAllQuestion: () => Promise<void>
    state: DataItem[]
    isLoading: boolean
}

const defaultValue: Value = {
    getDataBySearch: async (_: string) => {},
    getRandomQuestion: async () => {},
    getAllQuestion: async () => {},
    state: [],
    isLoading: false
};

export const SupabaseContext = createContext(defaultValue);