import { useSupabase } from "../../supabaseContext/useContext";

const AllQuestionButton = () => {
    const value = useSupabase();

    const handleClick = () => {
        value.getQuestions(0, "")
    }

    return (
        <button onClick={handleClick} className="nb-button default">Все вопросы</button>
    )
}

export default AllQuestionButton