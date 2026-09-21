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

  function handleEdit(item) {
    console.log("Edit clicked:", item);
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
      <StockList stock={stock} onEdit={handleEdit} onDelete={handleDelete} />
      <Menu recipes={recipes} stock={stock} onOrder={handleOrder} />
    </div>
  );
}

export default App;
