# Playwright QA Automation Capstone

End-to-end UI and API test suite built with Playwright and TypeScript using the Page Object Model.

## Project Structure

- `pages/` - Page Object classes (`SearchPage.ts`, login and checkout page objects) using role-based locators (`getByRole`).
- `tests/ui/` - UI test specs covering product search (`search_by_name.spec.ts`) and authentication flows.
- `tests/api/` - Negative and validation API checks for cart and product endpoints.
- `playwright.config.ts` - Test runner configuration, timeouts, and trace settings.

## Prerequisites

- Node.js (v18 or higher)
- npm

## Setup

1. Clone the repository and enter the capstone directory:
   ```bash
   git clone <your-repo-url>
   cd week2_capstone
   ```

2. Install dependencies and Playwright browsers:
   ```bash
   npm install
   npx playwright install
   ```

## Running Tests

Run the full test suite:
```bash
npx playwright test
```

Run a single test file:
```bash
npx playwright test tests/ui/search_by_name.spec.ts
```

Run a test with trace recording enabled:
```bash
npx playwright test tests/ui/search_by_name.spec.ts --trace on
```

## Viewing Reports and Traces

Open the HTML test report:
```bash
npx playwright show-report
```

Inspect a recorded failure trace directly:
```bash
npx playwright show-trace ../test-results/tests-ui-search_by_name-C1-Search-by-name/trace.zip
```

## Key Implementation Decisions

- **Role-Based Locators:** Replaced brittle `data-testid` selectors with `getByRole` locators tied to real DOM roles and accessible labels.
- **Web-First Assertions:** Used retrying assertions (`toContainText`, `toHaveText`, `toBeVisible`) instead of `waitForTimeout` calls and single-read checks.
- **Root-Cause Failure Diagnosis:** Verified broken runs through the Playwright Trace Viewer to separate test-data mismatches from product or environment defects.
- **Explicit Evidence Logging:** Documented HTTP status codes, totals, and shopper impact in plain text alongside screenshots.
