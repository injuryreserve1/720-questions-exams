import {createContext, type Dispatch, type SetStateAction } from "react";

export interface DataItem {
    id: number | string;
    question: string;
    answer: string
}

export interface Value {
    getRandomQuestion: () => Promise<void>
    getQuestions: (page: number, query: string) => Promise<void>
    setPage: Dispatch<SetStateAction<number>>,
    setSearch: Dispatch<SetStateAction<string>>
    state: DataItem[]
    isLoading: boolean
    questionsLength: number
    page: number
    search: string

}

const defaultValue: Value = {
    getRandomQuestion: async () => {},
    getQuestions: async (_: number, __: string) => {},
    setPage: () => {},
    setSearch: () => {}, 
    state: [],
    isLoading: false,
    questionsLength: 0,
    page: 1,
    search: ""
};

export const SupabaseContext = createContext(defaultValue);
SupabaseContext.displayName = "supabasecontext"