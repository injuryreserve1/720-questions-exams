import "./Pagination.css";
import { useSupabase } from "../../supabaseContext/useContext";

const Pagination = () => {
  const value = useSupabase();

  const prevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    value.getQuestions(value.page - 1, value.search);
  };

  const nextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    value.getQuestions(value.page + 1, value.search);
  };

  const allPages = Math.ceil(value?.questionsLength / 10) || 1;

  return (
    <div className="pagination">
      <button
        disabled={value.page === 0}
        onClick={prevPage}
        className="nb-button default"
      >{`<`}</button>
      {value.page+1}/{allPages}
      <button
        disabled={value.page+1 === allPages}
        onClick={nextPage}
        className="nb-button default"
      >{`>`}</button>
    </div>
  );
};

export default Pagination;
