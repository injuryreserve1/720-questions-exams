import "./App.css";
import SupabaseProvider from "./supabaseContext/SupabaseProvider";
import Header from "./components/Header/Header";
import List from "./components/List/List";

function App() {
  return (
    <SupabaseProvider>
      <div className="main-wrapper">
        <Header />
        <List />
      </div>
    </SupabaseProvider>
  );
}

export default App;
