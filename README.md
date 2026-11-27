# Toolshop Playwright Test Suite

Automated UI and API test suite for the Practice Software Testing Toolshop application, built with Playwright and TypeScript.

## Prerequisites

* Node.js (v18 or higher)
* npm (included with Node.js)

## Setup and Run

1. Install project dependencies and the Chromium browser:

```bash
npm install && npx playwright install chromium
```

2. Copy the example environment file to create your local configuration:

```bash
cp .env.example .env
```

3. Run the full test suite:

```bash
npm test
```

## Project Structure

```text
├── pages/
│   └── CartPage.ts               # Page Object Model for product search and cart interactions
├── tests/
│   ├── ui/
│   │   ├── home_title.spec.ts    # Verifies the Toolshop homepage title
│   │   ├── invalid_login.spec.ts # Verifies error handling on invalid login credentials
│   │   ├── pliers_search.spec.ts # Verifies search results match the "pliers" query
│   │   └── cart.spec.ts          # Guest cart flow using CartPage POM
│   └── api/
│       └── carts.spec.ts         # API tests for products, cart creation/item addition with cleanup, and 404 handling
├── .env.example                  # Sample environment variables template
├── package.json                  # Project dependencies and test scripts
└── playwright.config.ts          # Playwright test runner configuration
```

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm test` | Runs all UI and API tests in headless mode |
| `npx playwright test tests/ui` | Runs only the UI test suite |
| `npx playwright test tests/api` | Runs only the API test suite |
| `npx playwright test --ui` | Opens Playwright interactive UI mode |
| `npx playwright show-report` | Opens the last generated HTML test report |

## Test Coverage

### UI Tests (`https://with-bugs.practicesoftwaretesting.com`)

* **Homepage Title:** Confirms the landing page loads with the expected document title.
* **Invalid Login:** Confirms submitting unrecognized credentials displays an error alert.
* **Product Search:** Confirms searching for `pliers` returns only matching product cards.
* **Guest Cart Flow (POM):** Searches for a product, adds it to the cart, and verifies the product title in the cart view.

### API Tests (`https://api.practicesoftwaretesting.com`)

* **Products Listing (`GET /products?page=1`):** Verifies a `200` response and paginated `total` count.
* **Cart Creation & Item Addition (`POST /carts`, `POST /carts/{id}`):** Creates an isolated cart, adds a product, validates response fields, and deletes the cart afterward regardless of test outcome.
* **Missing Cart Handling (`GET /carts/{id}`):** Requests a non-existent cart ID and verifies a `404` status code.
