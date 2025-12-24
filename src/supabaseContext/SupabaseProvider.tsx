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
  const [search, setSearch] = useState("")
  const [questionsLength, setQuestionsLength] = useState(0)

  async function getRandomQuestion() {
    try {
      setLoading(true);

      const { data } = await supabase.rpc('get_random_question').single();
      
      setQuestionsLength([data].length)
      setdbData([data] as DataItem[]);

    } catch (err) {
      console.error("ошибка воверям getRandomQuestion", err);
    } finally {
      setLoading(false);
    }
  }

  async function getQuestions(pageNumber: number, searchQuery: string) {
    
    const pageSize = 10;
    const from = pageNumber * pageSize;
    const to = from + pageSize - 1
    
    try {
      setLoading(true);
      setPage(pageNumber)
      setSearch(searchQuery)
      
      const { data, count, error } = await supabase
        .from("mytable")
        .select("*", {count: 'exact'})
        .order("id")
        .range(from, to)
        .ilike("question", `%${searchQuery}%`)

      setdbData(data as DataItem[]);
      
      if (count) {
        setQuestionsLength(count)
      }

      console.log("error",error)

    } catch (err) {
      console.error("ошибка воверям getAllQuestion", err);
    } finally {
      setLoading(false);
    }
  }

  const value: Value = {
    getRandomQuestion: getRandomQuestion,
    getQuestions: getQuestions,
    setPage: setPage,
    setSearch: setSearch,
    state: dbData,
    isLoading: isLoading,
    questionsLength: questionsLength,
    page: page,
    search: search,
  };

  return <SupabaseContext value={value}>{children}</SupabaseContext>;
};

export default SupabaseProvider;
