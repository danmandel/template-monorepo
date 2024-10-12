## Introduction
This is an opinionated & minimalistic monorepo template for quickly starting new projects.

## Features & Tech Stack
1) Frontend/backend folder structure:
    - less nesting and configuration than other monorepo approaches.
    - easy to swap out either frontend or backend for other tech.
    - supports frontend/backend-specific vscode settings, linting, formatting.

2. Domain Driven Design (DDD) oriented backend:
    - highly modular, scales well with application complexity.

3. Next.js (App Router) frontend:
    - rapid development with file-based routing.
    - clean, reusable components.

4. GraphQL & Apollo Client:
    - strongly typed, modular API perfect for DDD.
    - dataloader for n+1 query problem.

5. Docker:
    - consistent dev environment
    - easy deployment anywhere
    - simple to scale up and down.

6. ESLint, Prettier:
    - standardized code style across entire the codebase.


## Development

From the root directory: `cursor frontend && cursor backend`

From the backend: `bun infra`

