// Finds all recipes that use a given ingredient id.
export function findRecipesUsingIngredient(ingredientId, recipes) {
  return recipes.filter((recipe) =>
    recipe.ingredients.some((i) => i.ingredient === ingredientId)
  );
}

// Validates a new ingredient before adding it. Returns an error string, or null if valid.
export function validateIngredient({ name, quantity, unit, par }, existingStock) {
  if (!name || name.trim() === "") {
    return "Ingredient name cannot be empty.";
  }
  if (existingStock.some((item) => item.name.toLowerCase() === name.trim().toLowerCase())) {
    return "An ingredient with this name already exists.";
  }
  const qty = parseFloat(quantity);
  if (isNaN(qty) || qty < 0) {
    return "Quantity must be a number that is 0 or greater.";
  }
  const parLevel = parseFloat(par);
  if (isNaN(parLevel) || parLevel < 0) {
    return "Par level must be a number that is 0 or greater.";
  }
  const supportedUnits = ["g", "kg", "ml", "l"];
  if (!supportedUnits.includes(unit)) {
    return `Unit must be one of: ${supportedUnits.join(", ")}.`;
  }
  return null;
}

// Creates a URL/id-safe slug from an ingredient name, e.g. "Bay Leaves" -> "bay-leaves".
export function slugify(name) {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}
