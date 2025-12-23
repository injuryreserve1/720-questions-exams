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
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [questionsLength, setQuestionsLength] = useState(0)

  const pageSize = 10;
  const from = page * pageSize;
  const to = from + pageSize - 1

  async function getDataBySearch(input: string) {
    try {
      setLoading(true);
      const { data, count } = await supabase
        .from("mytable")
        .select("*", {count: 'exact'})
        .ilike("question", `%${input}%`)

      if (count) {
        setQuestionsLength(1)
      }

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
        setQuestionsLength(1)
      }

    } catch (err) {
      console.error("ошибка воверям getRandomQuestion", err);
    } finally {
      setLoading(false);
    }
  }

  async function getQuestions() {
    try {
      setLoading(true);
      console.log("pagepage", page);
      

      const { data, count } = await supabase
        .from("mytable")
        .select("*", {count: 'exact'})
        .order("id")
        .range(from, to);

      setdbData(data as DataItem[]);
      
      if (count) {
        setQuestionsLength(count)
      }

    } catch (err) {
      console.error("ошибка воверям getAllQuestion", err);
    } finally {
      setLoading(false);
    }
  }

  const value: Value = {
    getDataBySearch: getDataBySearch,
    getRandomQuestion: getRandomQuestion,
    getQuestions: getQuestions,
    setPage: setPage,
    state: dbData,
    isLoading: isLoading,
    questionsLength: questionsLength,
    page: page,
  };

  return <SupabaseContext value={value}>{children}</SupabaseContext>;
};

export default SupabaseProvider;
