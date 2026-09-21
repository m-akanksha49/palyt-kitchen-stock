import { useState } from "react";
import stockData from "./data/stock.json";
import recipesData from "./data/recipes.json";
import StockList from "./components/StockList";
import Menu from "./components/Menu";
import { deductIngredients } from "./utils/inventory";
import "./App.css";

function App() {
  const [stock, setStock] = useState(stockData);
  const [recipes] = useState(recipesData);

  function handleSave(updatedItem) {
    setStock(stock.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  }

  function handleDelete(id) {
    console.log("Delete clicked:", id);
  }

  function handleOrder(dish) {
    const updatedStock = deductIngredients(dish, stock);
    setStock(updatedStock);
  }

  return (
    <div>
      <StockList stock={stock} onSave={handleSave} onDelete={handleDelete} />
      <Menu recipes={recipes} stock={stock} onOrder={handleOrder} />
    </div>
  );
}

export default App;
