import { useSupabase } from "../../supabaseContext/useContext";
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import Markdown from 'react-markdown'
import "./List.css"

const List = () => {
    const value = useSupabase();
    
    return (
        <div className="wrapper">
            {value?.state.map((item) => (
                <div className="nb-dialog" key={item.id}>
                    <div className="nb-dialog-body">
                        <div className="nb-dialog-header myHeader">{item.question}</div>
                        <Markdown rehypePlugins={[rehypeKatex]} remarkPlugins={[remarkMath]}>
                            {item.answer}
                        </Markdown>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List;