import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);

  const [items, setItems] = React.useState([]);

  const [favorites, setFavorites] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState("");

  const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://6301fd16c6dda4f287b0983a.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://6301fd16c6dda4f287b0983a.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get("https://6301fd16c6dda4f287b0983a.mockapi.io/favorite")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    axios.delete(`https://6301fd16c6dda4f287b0983a.mockapi.io/cart/${id}`);
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id == obj.id)) {
        axios.delete(
          `https://6301fd16c6dda4f287b0983a.mockapi.io/favorite/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://6301fd16c6dda4f287b0983a.mockapi.io/favorite",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в закладки");
    }
  };

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
    axios.post("https://6301fd16c6dda4f287b0983a.mockapi.io/cart", obj);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              items={items}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              items={favorites}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              item={items}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
