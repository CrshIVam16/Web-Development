
# 🔎 Image Finder

Simple client-side image search app using the Unsplash API.

## Demo

Open `index.html` in your browser to use the app. Enter a search term and press Enter or click the search button to load images. Use "Load more" to fetch the next page.

## Features

- Search photos by keyword (Unsplash)
- Pagination with "Load more"
- View photo source and author
- Keyboard support (Enter to search)

## Setup

No build tools are required — this is a static frontend app.

1. Clone or download the project.
2. Open `index.html` in a browser, or serve the folder with a static server:
3. The app uses an Unsplash access key stored in `index.js` as `ACCESS_TOKEN`.


## Files

- `index.html` — markup and UI
- `index.js` — app logic and API calls
- `style.css` — styles
- [Live-link](https://cr-image-finder.netlify.app/)

## Notes

- The included `index.js` contains a hard-coded access token for demo purposes. Replace it before publishing.
- The app fetches images from the Unsplash Search API and displays author, likes, and a link to the source.


