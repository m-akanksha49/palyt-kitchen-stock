
# Palyt Kitchen Stock System

A small kitchen stock and menu availability application. Kitchen staff manage ingredient stock levels, and the restaurant menu automatically reflects which dishes are available based on stock vs. par levels.

## Features

- View kitchen stock (ingredient, quantity, par level)
- Search ingredients by name
- Add new ingredients (with validation)
- Edit stock quantity and par level
- Delete ingredients (blocked if used by a recipe)
- View restaurant menu with live availability
- Place an order, which deducts recipe ingredients from stock
- Menu availability updates automatically after any stock change

## Tech Stack

React + Vite, plain JavaScript, JSON for data, Vitest for testing.

## Run locally


npm install
npm run dev


Then open the local URL shown in your terminal (typically http://localhost:5173).

## Run tests

npm test


## Key decisions

- **Availability rule:** A dish is available only if every ingredient it uses has `stock >= par`. Recipe quantity is not used for this check — it's only used when deducting stock on an order.
- **Deletion rule:** An ingredient used by any recipe cannot be deleted (the user is shown which dishes depend on it). Unused ingredients can be deleted freely.
- **Missing ingredient:** If a recipe references an ingredient not present in stock, the dish is treated as unavailable rather than assuming infinite stock.
- **Validation:** Ingredient name must be non-empty and unique; quantity and par level must be numbers >= 0; unit must be one of g, kg, ml, l.
- **Unit handling:** Stock and recipe quantities are normalized into a common base unit (grams for mass, ml for volume) before any comparison or deduction, so mismatched units (e.g. stock in kg, recipe in g) are handled correctly.

## How I checked the numbers

I normalized units into base units before performing any comparisons or deductions, and manually verified representative kg/g and l/ml conversions against the source data. Automated tests cover: availability above, at, and below par; missing ingredients; single and multi-ingredient deduction; the case where an order pushes stock below par; and ingredient validation and deletion rules.

## Known limitations / what I'd build next

With more time, I would add clearer handling for incompatible unit types (e.g. trying to compare a mass unit to a volume unit), an order confirmation step, and stronger integration tests covering the full stock-edit -> menu-update flow end to end.

## AI usage

I used an AI assistant to help break this task into implementation steps, discuss edge cases (like ingredient deletion and unit conversion), and review my test coverage. I wrote, ran, and verified the application code and tests myself.

