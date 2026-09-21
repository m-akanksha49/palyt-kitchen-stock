import { useState } from "react";
import stockData from "./data/stock.json";
import recipesData from "./data/recipes.json";
import StockList from "./components/StockList";
import Menu from "./components/Menu";
import AddIngredientForm from "./components/AddIngredientForm";
import { deductIngredients } from "./utils/inventory";
import { findRecipesUsingIngredient } from "./utils/ingredients";
import "./App.css";

function App() {
  const [stock, setStock] = useState(stockData);
  const [recipes] = useState(recipesData);

  function handleSave(updatedItem) {
    setStock(stock.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  }

  function handleAdd(newItem) {
    setStock([...stock, newItem]);
  }

  function handleDelete(id) {
    const usedBy = findRecipesUsingIngredient(id, recipes);
    if (usedBy.length > 0) {
      const dishNames = usedBy.map((r) => r.name).join(", ");
      alert(`Cannot delete this ingredient. It is used by: ${dishNames}`);
      return;
    }
    setStock(stock.filter((item) => item.id !== id));
  }

  function handleOrder(dish) {
    const updatedStock = deductIngredients(dish, stock);
    setStock(updatedStock);
  }

  return (
    <div>
      <StockList stock={stock} onSave={handleSave} onDelete={handleDelete} />
      <AddIngredientForm stock={stock} onAdd={handleAdd} />
      <Menu recipes={recipes} stock={stock} onOrder={handleOrder} />
    </div>
  );
}

export default App;
