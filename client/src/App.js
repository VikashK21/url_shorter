import "./App.css";
import GlobalProvider from "./context/GlobalState";
import Routers from "./router/Routers";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Routers />
      </div>
    </GlobalProvider>
  );
}

export default App;
