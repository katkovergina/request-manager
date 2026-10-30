# Request Manager

A small Angular application demonstrating a dynamic request form for equipment and software access requests.

The project focuses on reactive form handling, type safety, conditional validation, and asynchronous operations.

## Tech Stack

- Angular 21
- TypeScript
- Angular Material
- Angular Reactive Forms
- RxJS
- Signals
- SCSS

## Features

- **Dynamic form fields** — fields change based on the selected request type.
- **Conditional validation** — validators are updated when the request type changes.
- **Typed reactive forms** — strongly typed form controls.
- **Type-safe payloads** — discriminated unions for different request types.
- **Asynchronous submission** — simulated API requests using RxJS.
- **Submission states** — loading, success, and error handling.
- **Responsive UI** — Angular Material components with custom SCSS.

## Request Types

### Equipment Request

Allows users to request equipment by specifying:

- Employee name and email
- Equipment type
- Quantity (1–10)
- Optional comment

### Software Access Request

Allows users to request software access by specifying:

- Employee name and email
- Service name
- Access duration
- Optional comment

Switching between request types resets irrelevant fields and updates their validation rules.

## Getting Started

### Prerequisites

- Node.js version compatible with Angular 21
- npm

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open `http://localhost:4200` in your browser.

## Mock API

The application uses a simulated API service. No backend is required.

Requests are processed with an artificial delay of 800 ms.

To test error handling, enter the following email address:

`fail@example.com`

All other valid requests return a simulated successful response.

## Project Structure

```text
src/app/
├── core/
│   └── services/
│       └── request.ts
├── features/
│   └── request-form/
│       ├── models/
│       │   └── request.model.ts
│       ├── request-form.ts
│       ├── request-form.html
│       └── request-form.scss
└── app.ts
```

## Implementation Notes

- **Reactive Forms** handle form state and validation.
- **RxJS** manages form value changes and asynchronous submission.
- **Signals** manage the submission status.
- **Discriminated unions** ensure type safety for request payloads.
- **OnPush change detection** is used for the form component.
- **takeUntilDestroyed** manages subscription cleanup.

The application intentionally avoids unnecessary architectural complexity and external state management libraries.

## Available Scripts

```bash
npm start
npm run build
npm run format
npm run format:check
```
