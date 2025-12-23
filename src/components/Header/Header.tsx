import AllQuestionButton from "../AllQuestionButton/AllQuestionButton";
import Input from "../Input/Input";
import RandomizeButton from "../RandomizeButton/RandomizeButton";
import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <div>
        <Input />
      </div>
      <div>
        <RandomizeButton />
      </div>
      <div>
        <AllQuestionButton />
      </div>
    </header>
  );
};

export default Header;