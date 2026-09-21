export default function StockList({ stock, onEdit, onDelete }) {
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
          {stock.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity} {item.unit}</td>
              <td>{item.par} {item.unit}</td>
              <td>
                <button onClick={() => onEdit(item)}>Edit</button>
                <button onClick={() => onDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
