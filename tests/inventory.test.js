import { describe, it, expect } from "vitest";
import { deductIngredients } from "../src/utils/inventory";
import { isDishAvailable } from "../src/utils/availability";

describe("deductIngredients", () => {
  it("deducts a single ingredient correctly", () => {
    const stock = [{ id: "paneer", quantity: 2, unit: "kg", par: 1 }];
    const dish = { ingredients: [{ ingredient: "paneer", quantity: 180, unit: "g" }] };
    const result = deductIngredients(dish, stock);
    expect(result[0].quantity).toBeCloseTo(1.82);
  });

  it("deducts multiple ingredients correctly", () => {
    const stock = [
      { id: "paneer", quantity: 2, unit: "kg", par: 1 },
      { id: "tomato", quantity: 3, unit: "kg", par: 2 },
    ];
    const dish = {
      ingredients: [
        { ingredient: "paneer", quantity: 180, unit: "g" },
        { ingredient: "tomato", quantity: 100, unit: "g" },
      ],
    };
    const result = deductIngredients(dish, stock);
    expect(result[0].quantity).toBeCloseTo(1.82);
    expect(result[1].quantity).toBeCloseTo(2.9);
  });

  it("causes a dish to become unavailable after an order crosses below par", () => {
    let stock = [{ id: "tomato", quantity: 3.1, unit: "kg", par: 3 }];
    const dish = { ingredients: [{ ingredient: "tomato", quantity: 200, unit: "g" }] };

    expect(isDishAvailable(dish, stock)).toBe(true); // 3.1 >= 3
    stock = deductIngredients(dish, stock);
    expect(stock[0].quantity).toBeCloseTo(2.9);
    expect(isDishAvailable(dish, stock)).toBe(false); // 2.9 < 3
  });
});
