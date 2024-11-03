## Introduction

This is an opinionated & minimalistic monorepo template for quickly starting new projects.

## Technical Decisions

1. Frontend/backend folder structure:

   - less nesting than other monorepo approaches.
   - almost 0 additional configuration compared to separate frontend/backend repos.
   - easy to swap out either frontend or backend for other, even non-typescript, tech.
   - supports frontend/backend-specific vscode settings, linting, formatting, searching.

2) Domain Driven Design (DDD) oriented backend:

   - highly modular, scales well with application complexity.
   - more intuitive folder structure than grouping by responsibility e.g. src/models, src/controllers, etc.

3) Next.js (App Router) frontend:

   - rapid development with file-based routing.
   - clean, reusable components with shadcdn + tailwind.

4) GraphQL & Apollo Client:

   - strongly typed API + automatic GQL validation and type hints with Apollo VSCode extension.
   - `bun codegen` generates typesafe react hooks for executing queries, mutations, and subscriptions.
   - [TODO] dataloader for the n+1 query problem.

5) Docker:

   - consistent dev environment.
   - easy deployment anywhere, can deploy frontend and backend separately if necessary.
   - simple to scale up and down.

6) ESLint, Prettier:

   - standardized code style across entire the codebase.
   - opinionated rules to enforce best practices and avoid common mistakes.

7) Firebase auth:
   - easy to implement and integrate into projects.

## Development

From the root directory: `cursor frontend && cursor backend`
From the backend: `bun infra`

Alternatively if you don't want to use docker, you can run `bun dev` in the frontend and backend directories.
