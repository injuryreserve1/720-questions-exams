import { useSupabase } from "../../supabaseContext/useContext";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import Markdown from "react-markdown";
import "./List.css";
import Pagination from "../Pagination/Pagination";

const List = () => {

  const value = useSupabase();

  if (value.isLoading) {
    return (
      <div className="mySpinner">
        <div className="nb-spinner mySpinner"></div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      {value?.state.map((item) => (
        <div className="nb-dialog" key={item.id}>
          <div className="nb-dialog-body">
            <div className="nb-dialog-header myHeader">{item.question}</div>
              <div className="spoiler">
                <Markdown
                rehypePlugins={[rehypeKatex]}
                remarkPlugins={[remarkMath]}
              >
                {item.answer}
              </Markdown>
              </div>
          </div>
        </div>
      ))}
      {value.questionsLength > 10 && <Pagination/>}
    </div>
  );
};

export default List;
