# React Weather App

[Live at : your-link-here](https://meteo.arnaudrabel.com)

A simple React application that displays a 5-day weather forecast for a searched city. The project was recently modernized from its original 2020-era codebase to a 2025/2026 standard using Vite and TypeScript.

## Tech Stack
- **React**: For building the user interface.
- **Vite**: As the modern, fast build tool and development server.
- **TypeScript**: For static typing and improved developer experience.
- **Bootstrap**: For basic styling and components.

## Project Modernization (2020 to 2025)

This project was recently upgraded to resolve security vulnerabilities reported by **Dependabot** and to bring it up to modern web development standards.

The key updates include:
- **Migration from Create React App to Vite**: Switched the underlying build tool for faster performance and a more modern development environment.
- **JavaScript to TypeScript Conversion**: All `.js` files were migrated to `.tsx`, and strict typing was applied across all components and utility functions.
- **Replaced `prop-types` with Interfaces**: Runtime `prop-types` validation was removed and replaced with compile-time TypeScript interfaces, providing better type safety and eliminating a legacy dependency.
- **Secure Handling of API Keys**: All hardcoded API keys were removed from the source code and moved into a `.env` file. This is a critical security practice to prevent leaking secrets.

By updating the entire dependency tree and removing outdated packages, the common security alerts were resolved.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```
    git clone <your-repo-url>
    cd <your-repo-name>
    ```

2.  **Install dependencies:**
    ```
    npm install
    ```

3.  **Create an environment file:**

    Create a file named `.env` in the root of the project and add your API keys. Vite requires these variables to be prefixed with `VITE_`.

    ```
    VITE_METEO_KEY=your_openweathermap_api_key
    VITE_GEO_KEY=your_ipstack_api_key
    VITE_IPIFY_API_KEY=your_ipify_api_key
    ```

4.  **Run the development server:**
    ```
    npm run dev
    ```

    The application should now be running on `http://localhost:5173` (or another port if 5173 is busy).
