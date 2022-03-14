import "./App.css";
import DataCrud from "./components/DataCrud";
import SearchData from "./components/SearchData";
// import DataList from "./components/DataList";

function App() {
  return (
    <div className="main">
      {/* <div className="header"> To Do list</div> */}
      <div className="header"> Search Field</div>
      <div className="content">
        {/* <DataList /> */}
        <SearchData />
        {/* <DataCrud /> */}
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
