import { useSupabase } from "../../supabaseContext/useContext";

const AllQuestionButton = () => {
    const value = useSupabase();

    const handleClick = () => {
        value.setPage(1)
        value.getQuestions()
    }

    return (
        <button onClick={handleClick} className="nb-button default">Все вопросы</button>
    )
}

export default AllQuestionButton