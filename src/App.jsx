import { useState } from "react";
import stockData from "./data/stock.json";
import StockList from "./components/StockList";
import "./App.css";

function App() {
  const [stock, setStock] = useState(stockData);

  function handleEdit(item) {
    console.log("Edit clicked:", item);
  }

  function handleDelete(id) {
    console.log("Delete clicked:", id);
  }

  return (
    <div>
      <StockList stock={stock} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
