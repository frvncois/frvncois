# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue 3 portfolio application built with Vite, using Composition API and Pinia for state management.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Architecture

**Build System**: Vite 7.x with Vue 3.5 plugin and Vue DevTools

**State Management**: Pinia stores using Composition API pattern (see `src/stores/counter.js` for example)

**Routing**: Vue Router 4 with web history mode configured in `src/router/index.js`

**Entry Point**: Application bootstraps in `src/main.js`, mounting to `#app` div in `index.html`

**Path Aliases**: `@/` maps to `src/` directory (configured in both `vite.config.js` and `jsconfig.json`)

**Node Version**: Requires Node.js ^20.19.0 || >=22.12.0
