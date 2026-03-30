# Form Library Comparison

A Vite + React + TypeScript demo that compares TanStack Form, React Hook Form, and Formik by implementing the same realistic workspace setup form with the same UI, data model, validation rules, and product requirements.

## Goal

This project is designed to compare the libraries fairly in an implementation-focused way. The UI and business logic are shared so the meaningful differences come from the form engine itself:

- developer experience
- TypeScript ergonomics
- validation integration
- composability
- nested and dynamic field handling
- render behavior and scalability

## Planned Comparison Routes

- `/tanstack-form`
- `/react-hook-form`
- `/formik`

Each page will render the same "Create Workspace / Team Setup" form with:

- shared shadcn/ui components
- shared Tailwind layout and styling
- one shared Zod schema
- nested objects and dynamic arrays
- conditional sections
- cross-field and async validation
- diagnostics panels and render counters

## Stack

- Vite
- React
- TypeScript
- React Router
- Tailwind CSS
- shadcn/ui
- Zod
- TanStack Form
- React Hook Form
- Formik

## Why This Exists

All three libraries can solve the same product problem. This repo is intended to show how they differ in code structure, maintainability, and long-term ergonomics when the comparison is held constant.

The narrative goal is to make it clear that:

- the UI is identical because it is shared
- the validation is identical because it comes from one schema
- the business rules are identical
- the differences therefore come from the form library and its integration model

## Development

This repository uses `pnpm`.

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm build
pnpm lint
```

## Status

The repository is currently set up as the foundation for the comparison app. The next implementation phase is to replace the starter Vite page with the shared routed comparison experience and the three form-library adapters.
