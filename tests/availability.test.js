import { describe, it, expect } from "vitest";
import { isDishAvailable } from "../src/utils/availability";

describe("isDishAvailable", () => {
  it("is available when stock is above par", () => {
    const stock = [{ id: "paneer", quantity: 2, unit: "kg", par: 1 }];
    const dish = { ingredients: [{ ingredient: "paneer", quantity: 180, unit: "g" }] };
    expect(isDishAvailable(dish, stock)).toBe(true);
  });

  it("is available when stock equals par exactly", () => {
    const stock = [{ id: "tomato", quantity: 3, unit: "kg", par: 3 }];
    const dish = { ingredients: [{ ingredient: "tomato", quantity: 200, unit: "g" }] };
    expect(isDishAvailable(dish, stock)).toBe(true);
  });

  it("is unavailable when stock is below par", () => {
    const stock = [{ id: "butter", quantity: 0.5, unit: "kg", par: 1 }];
    const dish = { ingredients: [{ ingredient: "butter", quantity: 20, unit: "g" }] };
    expect(isDishAvailable(dish, stock)).toBe(false);
  });

  it("is unavailable when an ingredient is missing from stock", () => {
    const stock = [];
    const dish = { ingredients: [{ ingredient: "cashews", quantity: 100, unit: "g" }] };
    expect(isDishAvailable(dish, stock)).toBe(false);
  });
});
