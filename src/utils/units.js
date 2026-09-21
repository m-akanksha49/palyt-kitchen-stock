// Converts a quantity into a base unit so different units can be compared.
// Mass -> grams. Volume -> milliliters.
const MASS_UNITS = { g: 1, kg: 1000 };
const VOLUME_UNITS = { ml: 1, l: 1000 };

export function getUnitType(unit) {
  if (unit in MASS_UNITS) return "mass";
  if (unit in VOLUME_UNITS) return "volume";
  return null;
}

export function convertToBaseUnit(quantity, unit) {
  if (unit in MASS_UNITS) return quantity * MASS_UNITS[unit];
  if (unit in VOLUME_UNITS) return quantity * VOLUME_UNITS[unit];
  throw new Error(`Unsupported unit: ${unit}`);
}

// Converts a base-unit quantity back into a target display unit.
export function convertFromBaseUnit(baseQuantity, targetUnit) {
  if (targetUnit in MASS_UNITS) return baseQuantity / MASS_UNITS[targetUnit];
  if (targetUnit in VOLUME_UNITS) return baseQuantity / VOLUME_UNITS[targetUnit];
  throw new Error(`Unsupported unit: ${targetUnit}`);
}
