import { useState } from "react";
import { validateIngredient, slugify } from "../utils/ingredients";

export default function AddIngredientForm({ stock, onAdd }) {
  const [form, setForm] = useState({ name: "", quantity: "", unit: "g", par: "" });
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const validationError = validateIngredient(form, stock);
    if (validationError) {
      setError(validationError);
      return;
    }

    onAdd({
      id: slugify(form.name),
      name: form.name.trim(),
      quantity: parseFloat(form.quantity),
      unit: form.unit,
      par: parseFloat(form.par),
    });

    setForm({ name: "", quantity: "", unit: "g", par: "" });
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: "16px 0" }}>
      <h3>Add Ingredient</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        style={{ width: "80px", marginLeft: "8px" }}
      />
      <select
        value={form.unit}
        onChange={(e) => setForm({ ...form, unit: e.target.value })}
        style={{ marginLeft: "8px" }}
      >
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="l">l</option>
      </select>
      <input
        type="number"
        placeholder="Par Level"
        value={form.par}
        onChange={(e) => setForm({ ...form, par: e.target.value })}
        style={{ width: "80px", marginLeft: "8px" }}
      />
      <button type="submit" style={{ marginLeft: "8px" }}>Add Ingredient</button>
    </form>
  );
}
