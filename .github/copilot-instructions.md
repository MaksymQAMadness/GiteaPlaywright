# Copilot Instructions for AI Agents

## Project Overview
This is a Playwright-based end-to-end (E2E) testing project for web applications. The main structure includes:
- `pom/`: Page Object Model (POM) classes for test abstraction
  - `BasePage.ts`: Base class for all pages, handles navigation
  - `pages/RegisterPage.ts`: Example page object for registration, uses Playwright Locators
- `tests/`: Contains test specs (e.g., `register.spec.ts`)
- `playwright.config.ts`: Playwright configuration (testDir, browser projects, baseURL, reporter)
- `test-data/`: (presumed for test fixtures or input data)

## Key Patterns & Conventions
- **Page Object Model (POM):** All page interactions should be abstracted in classes under `pom/`. Inherit from `BasePage` for navigation and shared logic.
- **Locators:** Use Playwright's `Locator` API for element selection. Example:
  ```typescript
  private userNameField: Locator = this.page.locator('//input[@id="user_name"]')
  ```
- **Test Specs:** Place all test files in `tests/`. Name specs with `.spec.ts`.
- **Test Data:** Store reusable data in `test-data/`.

## Workflows
- **Run Tests:**
  ```powershell
  npx playwright test
  ```
- **View Reports:** After running tests, open the HTML report:
  ```powershell
  npx playwright show-report
  ```
- **Config:**
  - Tests run against `http://localhost:3000` by default (see `playwright.config.ts`).
  - To run against a different server, update `baseURL` in config or set up a local server before tests.

## Project-Specific Notes
- **No custom npm scripts** in `package.json`—use Playwright CLI directly.
- **CI/CD:** Configuration disables parallelism and retries for CI via environment variables.
- **Extensibility:** Add new page objects in `pom/pages/` and new specs in `tests/`.
- **Environment Variables:** Support for `.env` is commented out but can be enabled if needed.

## Example: Adding a New Page Object
1. Create a new class in `pom/pages/` inheriting from `BasePage`.
2. Define locators and methods for page interactions.
3. Use the new page object in a test spec under `tests/`.

## External Dependencies
- `@playwright/test` for E2E automation
- `@types/node` for TypeScript support

---
_If any conventions or workflows are unclear, please ask for clarification or provide examples from your changes._
