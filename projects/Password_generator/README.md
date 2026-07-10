# Password Generator

A simple and interactive password generator built with HTML, CSS, and JavaScript. It allows users to create strong passwords by choosing the length and the character types to include.

## Features

- Generate passwords with a length between 10 and 20 characters
- Choose whether to include:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Symbols
- Copy the generated password to the clipboard
- Responsive layout for smaller screens

## Project Structure

- index.html - Main structure of the web page
- style.css - Styling for the UI
- script.js - Password generation and copy-to-clipboard logic
- Hosted demo: [live-link](https://cr-password-generator.netlify.app/)

## How to Use

1. Open index.html in your browser.
2. Move the slider to set the password length.
3. Select one or more character types using the checkboxes.
4. Click the Generate Password button.
5. Click the copy icon to copy the generated password.

## Tech Stack

- HTML
- CSS
- JavaScript

## Notes

- At least one character type must be selected before generating a password.
- The copy feature uses the browser clipboard API, so it works best in a secure browser context such as localhost or HTTPS.
