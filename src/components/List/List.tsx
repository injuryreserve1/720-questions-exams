import { useSupabase } from "../../supabaseContext/useContext";
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
                        <Markdown>
                            {item.answer}
                        </Markdown>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List;