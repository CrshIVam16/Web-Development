# 🏬 Shopping-Store with React

A small React shopping showcase built with Vite.

This project loads product data from a dummy API and displays unique product cards with search support.

## Project overview

- Built with React 19 and Vite
- Fetches cart items from `https://dummyjson.com/carts`
- Extracts unique products from all carts
- Displays product cards with thumbnail, title, price, and quantity
- Includes a simple search bar to filter products by title

## Key features

- Responsive product listing
- Search by item title with Enter key support
- Uses React hooks: `useState` and `useEffect`
- Demonstrates data processing with `Array.from`, `Map`, and `flatMap`

## Folder structure

- `src/App.jsx` — main application logic and search handling
- `src/components/Card.jsx` — renders the product cards
- `src/utils/data.js` — sample reference data format for products
- `src/index.css` — global app styling

## How to run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open the local URL shown in the terminal.
4. [live-link](https://cr-web-store.netlify.app/)

## Notes

- The app fetches dummy cart data and deduplicates products before rendering.
- If the search returns no matching products, a friendly message is shown.
- The UI text uses a casual style to give the project a fun shopping feel.
