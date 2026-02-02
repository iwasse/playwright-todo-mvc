# Playwright TodoMVC Tests

This repository contains automated end-to-end tests for the TodoMVC application using [Playwright](https://playwright.dev/).

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright Browsers:**
   ```bash
   npx playwright install
   ```

## Running Tests

- **Run all tests:**
  ```bash
  npx playwright test
  ```

- **Run tests in headed mode:**
  ```bash
  npx playwright test --headed
  ```

- **Show HTML Report:**
  ```bash
  npx playwright show-report
  ```

## Project Structure

- `tests/`: Contains the test files.
- `playwright.config.ts`: Playwright configuration file.
- `package.json`: Project dependencies and scripts.
- `app-actions/`: app actions files representing user actions