import { describe, it, expect } from "vitest";
import { findRecipesUsingIngredient, validateIngredient, slugify } from "../src/utils/ingredients";

describe("findRecipesUsingIngredient", () => {
  const recipes = [
    { id: "kaju-curry", name: "Kaju Curry", ingredients: [{ ingredient: "cashews", quantity: 100, unit: "g" }] },
    { id: "cashew-rice", name: "Cashew Rice", ingredients: [{ ingredient: "cashews", quantity: 80, unit: "g" }] },
    { id: "jeera-rice", name: "Jeera Rice", ingredients: [{ ingredient: "rice", quantity: 250, unit: "g" }] },
  ];

  it("finds all recipes using a shared ingredient", () => {
    const result = findRecipesUsingIngredient("cashews", recipes);
    expect(result.map((r) => r.name)).toEqual(["Kaju Curry", "Cashew Rice"]);
  });

  it("returns an empty array when no recipe uses the ingredient", () => {
    const result = findRecipesUsingIngredient("bay-leaves", recipes);
    expect(result).toEqual([]);
  });
});

describe("validateIngredient", () => {
  const existingStock = [{ id: "paneer", name: "Paneer", quantity: 2, unit: "kg", par: 1 }];

  it("rejects an empty name", () => {
    const error = validateIngredient({ name: "  ", quantity: 5, unit: "g", par: 2 }, existingStock);
    expect(error).toMatch(/name/i);
  });

  it("rejects a duplicate name", () => {
    const error = validateIngredient({ name: "Paneer", quantity: 5, unit: "g", par: 2 }, existingStock);
    expect(error).toMatch(/already exists/i);
  });

  it("rejects a negative quantity", () => {
    const error = validateIngredient({ name: "Ghee", quantity: -5, unit: "g", par: 2 }, existingStock);
    expect(error).toMatch(/quantity/i);
  });

  it("rejects a negative par level", () => {
    const error = validateIngredient({ name: "Ghee", quantity: 5, unit: "g", par: -2 }, existingStock);
    expect(error).toMatch(/par/i);
  });

  it("rejects an unsupported unit", () => {
    const error = validateIngredient({ name: "Ghee", quantity: 5, unit: "lbs", par: 2 }, existingStock);
    expect(error).toMatch(/unit/i);
  });

  it("accepts a valid new ingredient", () => {
    const error = validateIngredient({ name: "Ghee", quantity: 5, unit: "g", par: 2 }, existingStock);
    expect(error).toBeNull();
  });
});

describe("slugify", () => {
  it("converts a name into a lowercase, hyphenated id", () => {
    expect(slugify("Bay Leaves")).toBe("bay-leaves");
    expect(slugify("  Ginger Garlic Paste  ")).toBe("ginger-garlic-paste");
  });
});
