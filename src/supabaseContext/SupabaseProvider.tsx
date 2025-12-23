import { useState } from "react";
import { SupabaseContext } from "./SupabaseContext";
import type { Value, DataItem } from "./SupabaseContext";
import { createClient } from "@supabase/supabase-js";

interface Props {
  children: React.ReactNode;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);


const SupabaseProvider = ({ children }: Props) => {
  const [dbData, setdbData] = useState<DataItem[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function getDataBySearch(input: string) {
    try {
      setLoading(true);
      const { data } = await supabase
        .from("mytable")
        .select("*")
        .ilike("question", `%${input}%`);

      setdbData(data as DataItem[]);
    } catch (err) {
      console.error("ошибка воверям getDataBySearch", err);
    } finally {
      setLoading(false);
    }
  }

  async function getRandomQuestion() {
    try {
      setLoading(true);
      const { count } = await supabase
        .from("mytable")
        .select("id", { count: "exact" });
      if (count) {
        const getRandomId = Math.floor(Math.random() * count + 1);
        const { data } = await supabase
          .from("mytable")
          .select("*")
          .eq("id", getRandomId)
          .single();
        setdbData([data] as DataItem[]);
      }
    } catch (err) {
      console.error("ошибка воверям getRandomQuestion", err);
    } finally {
      setLoading(false);
    }
  }

  async function getAllQuestion() {
    try {
      setLoading(true);
      const { data } = await supabase.from("mytable").select("*");
      setdbData(data as DataItem[]);
    } catch (err) {
      console.error("ошибка воверям getAllQuestion", err);
    } finally {
      setLoading(false);
    }
  }

  const value: Value = {
    getDataBySearch: getDataBySearch,
    getRandomQuestion: getRandomQuestion,
    getAllQuestion: getAllQuestion,
    state: dbData,
    isLoading: isLoading,
  };

  return <SupabaseContext value={value}>{children}</SupabaseContext>;
};

export default SupabaseProvider;
