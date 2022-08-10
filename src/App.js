import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <hr></hr>
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1 className="">Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/iconSearch.svg" alt="Search"></img>
            <input placeholder="Поиск..."></input>
          </div>
        </div>

        <div className="sneakers d-flex ">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
