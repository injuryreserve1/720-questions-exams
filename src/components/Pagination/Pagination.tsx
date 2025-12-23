import "./Pagination.css";
import { useSupabase } from "../../supabaseContext/useContext";

const Pagination = () => {
  const value = useSupabase();

  const getQuestions = () => {
    value.getQuestions();
  };

  const prevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    value.setPage((prev) => prev - 1);
    getQuestions()
  };

  const nextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    value.setPage((prev) => prev + 1);
    getQuestions()
  };

  const allPages = Math.ceil(value?.questionsLength / 10) || 1;

  return (
    <div className="pagination">
      <button
        disabled={value.page === 1}
        onClick={prevPage}
        className="nb-button default"
      >{`<`}</button>
      {value.page}/{allPages}
      <button
        disabled={value.page === allPages}
        onClick={nextPage}
        className="nb-button default"
      >{`>`}</button>
    </div>
  );
};

export default Pagination;
