import { isDishAvailable } from "../utils/availability";

export default function Menu({ recipes, stock, onOrder }) {
  return (
    <div>
      <h2>Restaurant Menu</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Dish</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((dish) => {
            const available = isDishAvailable(dish, stock);
            return (
              <tr key={dish.id}>
                <td>{dish.name}</td>
                <td>₹{dish.price}</td>
                <td>{available ? "Available" : "Unavailable"}</td>
                <td>
                  <button disabled={!available} onClick={() => onOrder(dish)}>
                    Order
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
