# GitHub Profile Viewer

A simple web app that lets you search for any GitHub user and view their public profile details instantly.

## Features

- Search for a GitHub username
- Display the user's avatar, name, and bio
- Show follower, following, and repository counts
- Open the user's GitHub profile in a new tab
- Includes a loading state while the profile data is being fetched

## Technologies Used

- HTML
- CSS
- JavaScript
- GitHub Users API

## How to Run

1. Open the project folder in your browser.
2. Launch the file [index.html](index.html) directly, or use a simple local server such as Live Server.
3. Enter a GitHub username in the search box and click Search.
4. [Live- link](https://cr-github-profile-viewer.netlify.app/)

## Usage

- Type a valid GitHub username and press Search.
- If the username does not exist, the app will display a "User Not Found" message.
- Press Enter while typing in the search box to trigger the search as well.

## Notes

- This app uses the public GitHub API, so internet access is required.
- GitHub API rate limits may apply depending on usage.

## Project Structure

- [index.html](index.html) – Main page structure
- [style.css](style.css) – Styling for the UI
- [index.js](index.js) – Logic for fetching and displaying GitHub profile data
