import { useSupabase } from "../../supabaseContext/useContext";

const RandomizeButton = () => {
  const value = useSupabase();

  const handleClick = () => {
    value.getRandomQuestion()
  }


  return (
    <div className="nb-flex-row nb-flex-col-sm">
      <button onClick={handleClick} className="nb-button default">случайный вопрос</button>
    </div>
  );
};

export default RandomizeButton;
