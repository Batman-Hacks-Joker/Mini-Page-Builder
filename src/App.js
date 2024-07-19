import "./App.css";
import SideBar from "./Components/SideBar";
import Page from "./Components/Page";
import DarkMode from "./Components/DarkMode";

function App() {
  return (
    <div className="App">
      <Page />
      <DarkMode/>
      <SideBar />
    </div>
  );
}

export default App;