import { useState } from "react";
import { SupabaseContext } from "./SupabaseContext";
import { createClient } from "@supabase/supabase-js";
import type { Value, DataItem } from "./SupabaseContext";

interface Props {
  children: React.ReactNode;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

const SupabaseProvider = ({ children }: Props) => {
  const [dbData, setdbData] = useState<DataItem[]>([]);

  async function getDataBySearch(input: string) {
    const { data } = await supabase
      .from("mytable")
      .select("*")
      .ilike("question", `%${input}%`);

    setdbData(data as DataItem[]);
  }

  async function getRandomQuestion() {
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
  }

  async function getAllQuestion() {
    const { data } = await supabase
      .from("mytable")
      .select("*")

    setdbData(data as DataItem[]);
  }

  const value: Value = {
    getDataBySearch: getDataBySearch,
    getRandomQuestion: getRandomQuestion,
    getAllQuestion: getAllQuestion,
    state: dbData,
  };

  return <SupabaseContext value={value}>{children}</SupabaseContext>;
};

export default SupabaseProvider;
