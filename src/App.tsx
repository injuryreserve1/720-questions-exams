import "./App.css";
import SupabaseProvider from "./supabaseContext/SupabaseProvider";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// const Bomb = () => {
//   throw new Error("💥 БА-БАХ!");
//   return <div>Это никогда не отрендерится</div>;
// };

function App() {
  return (
    <SupabaseProvider>
      <ErrorBoundary>
        {/* <Bomb /> */}
        <div className="main-wrapper">
          <Header />
          <List />
        </div>
      </ErrorBoundary>
    </SupabaseProvider>
  );
}

export default App;
