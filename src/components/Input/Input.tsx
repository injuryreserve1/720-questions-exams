import "./Input.css"
import { useSupabase } from "../../supabaseContext/useContext";
import { useState, type MouseEvent } from "react";

const Input = () => {
    const value = useSupabase();
    const [search, setSearch] = useState('')

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        value.getQuestions(0, search);
    }

  return (
    <form className="form-input">
      <input onChange={(e) => setSearch(e.target.value)} id="search" value={search} className="nb-input default" type="search" placeholder="Напиши вопрос"/>
      <button onClick={handleClick} className="nb-button default">{`>`}</button>
    </form>
  );
};

export default Input;
