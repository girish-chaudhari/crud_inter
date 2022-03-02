import "./App.css";
import DataCrud from "./components/DataCrud";
// import DataList from "./components/DataList";

function App() {
  return (
    <div className="main">
      <div className="header"> To Do list</div>
      <div className="content">
        {/* <DataList /> */}
        <DataCrud />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
