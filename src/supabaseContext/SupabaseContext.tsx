import {createContext} from "react";

export interface DataItem {
    id: number | string;
    question: string;
    answer: string
}

export interface Value {
    getDataBySearch: (input: string) => Promise<void>
    getRandomQuestion: () => Promise<void>
    getQuestions: () => Promise<void>
    state: DataItem[]
    isLoading: boolean
    questionsLength: number
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const defaultValue: Value = {
    getDataBySearch: async (_: string) => {},
    getRandomQuestion: async () => {},
    getQuestions: async () => {},
    state: [],
    isLoading: false,
    questionsLength: 0,
    page: 1,
    setPage: () => {} 
};

export const SupabaseContext = createContext(defaultValue);