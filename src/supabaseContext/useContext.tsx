import { useContext } from "react";
import { SupabaseContext } from "./SupabaseContext";

export const useSupabase = () => {
    const context = useContext(SupabaseContext)
    if (!context) throw new Error("no context")
    return context
}