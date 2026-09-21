
import { useState } from "react";

export default function StockList({ stock, onSave, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ quantity: "", par: "" });

  function startEdit(item) {
    setEditingId(item.id);
    setDraft({ quantity: item.quantity, par: item.par });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function saveEdit(item) {
    const quantity = parseFloat(draft.quantity);
    const par = parseFloat(draft.par);

    if (isNaN(quantity) || quantity < 0) {
      alert("Quantity must be a number that is 0 or greater.");
      return;
    }
    if (isNaN(par) || par < 0) {
      alert("Par level must be a number that is 0 or greater.");
      return;
    }

    onSave({ ...item, quantity, par });
    setEditingId(null);
  }

  return (
    <div>
      <h2>Kitchen Stock</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Stock</th>
            <th>Par</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => {
            const isEditing = editingId === item.id;
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={draft.quantity}
                      onChange={(e) => setDraft({ ...draft, quantity: e.target.value })}
                      style={{ width: "70px" }}
                    />
                  ) : (
                    `${item.quantity} ${item.unit}`
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={draft.par}
                      onChange={(e) => setDraft({ ...draft, par: e.target.value })}
                      style={{ width: "70px" }}
                    />
                  ) : (
                    `${item.par} ${item.unit}`
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <>
                      <button onClick={() => saveEdit(item)}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(item)}>Edit</button>
                      <button onClick={() => onDelete(item.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
