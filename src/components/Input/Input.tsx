import "./Input.css"
import { useSupabase } from "../../supabaseContext/useContext";
import { useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";

const Input = () => {
    const value = useSupabase();

    const [input, setInput] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        value.getDataBySearch(input);
    }

  return (
    <form className="form-input">
      <input onChange={handleChange} id="search" className="nb-input default" type="search" placeholder="Напиши вопрос"/>
      <button onClick={handleClick} className="nb-button default">{`>`}</button>
    </form>
  );
};

export default Input;
