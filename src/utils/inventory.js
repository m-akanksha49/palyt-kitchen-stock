import { convertToBaseUnit, convertFromBaseUnit } from "./units";
import { findStockItem } from "./availability";

// Returns a NEW stock array with the dish's ingredients deducted.
// Does not mutate the original stock array.
export function deductIngredients(dish, stock) {
  return stock.map((stockItem) => {
    const recipeIngredient = dish.ingredients.find(
      (i) => i.ingredient === stockItem.id
    );

    if (!recipeIngredient) {
      return stockItem; // this dish doesn't use this ingredient, leave as-is
    }

    const stockBase = convertToBaseUnit(stockItem.quantity, stockItem.unit);
    const recipeBase = convertToBaseUnit(
      recipeIngredient.quantity,
      recipeIngredient.unit
    );

    // Defensive: never let stock go below zero.
    const newBase = Math.max(0, stockBase - recipeBase);
    const newQuantity = convertFromBaseUnit(newBase, stockItem.unit);

    return { ...stockItem, quantity: newQuantity };
  });
}

export function findStockItemById(stock, id) {
  return findStockItem(stock, id);
}
