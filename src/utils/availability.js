import { convertToBaseUnit, getUnitType } from "./units";

// Finds a stock item by ingredient id.
function findStockItem(stock, ingredientId) {
  return stock.find((item) => item.id === ingredientId) || null;
}

// A single ingredient is "below par" if its stock (in base units) is less
// than its par level (in base units).
export function isIngredientBelowPar(stockItem) {
  if (!stockItem) return true; // missing ingredient counts as below par
  const stockBase = convertToBaseUnit(stockItem.quantity, stockItem.unit);
  const parBase = convertToBaseUnit(stockItem.par, stockItem.unit);
  return stockBase < parBase;
}

// A dish is available only if every one of its ingredients exists in stock
// and is not below par. Recipe quantity is NOT used for this check.
export function isDishAvailable(dish, stock) {
  return dish.ingredients.every(({ ingredient }) => {
    const stockItem = findStockItem(stock, ingredient);
    if (!stockItem) return false;
    return !isIngredientBelowPar(stockItem);
  });
}

export { findStockItem };