[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

# Atlas Scope

<p align="center">
    <a href="https://nextjs.org/" target="blank">
        <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" width="80" alt="Next.js Logo" style="margin-right: 40px;" />
    </a>
    <a href="https://reactjs.org/" target="blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="80" alt="React Logo" style="margin-right: 40px;" />
    </a>
    <a href="https://tailwindcss.com/" target="blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png" width="80" alt="Tailwind CSS Logo" style="margin-right: 40px;" />
    </a>
    <a href="https://restcountries.com/" target="blank">
        <img src="https://res.cloudinary.com/dq2bkcxxd/image/upload/v1746354778/9e5f6e80-2e39-11eb-9e26-754469b9d770_uhlxrx.png" width="80" alt="REST Countries API Logo" style=" margin-right: 40px; border-radius: 10px;" />
    </a>
    <a href="https://ui.shadcn.com/" target="blank">
        <img src="https://res.cloudinary.com/dq2bkcxxd/image/upload/v1746353421/shadcn-ui-logo-png_seeklogo-519786_gnocyp.png" width="80" alt="shadcn UI Logo" style={{margin-right: 40px; border-radius: 10px;}}/>
    </a>
    <a href="https://ui.aceternity.com/" target="blank">
        <img src="https://res.cloudinary.com/dq2bkcxxd/image/upload/v1746353301/logo-dark_zbnlae.png" width="80" alt="aceternity UI Logo" />
    </a>
</p>

<p align="center">
    A modern web application for exploring countries around the world, built with Next.js and React.
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/next" target="_blank"><img src="https://img.shields.io/npm/v/next.svg" alt="NPM Version" /></a>
    <a href="https://github.com/yourusername/atlas-scope" target="_blank"><img src="https://img.shields.io/github/last-commit/yourusername/atlas-scope" alt="Last Commit" /></a>
</p>

## Description

Atlas Scope is a web application that allows users to explore information about countries around the world. It provides a user-friendly interface to search, filter, and view detailed information about different countries, including their flags, population, languages, and more.

## Features

- _Search Functionality_: Search for countries by name
- _Region Filtering_: Filter countries by their geographical region
- _Language Filtering_: Filter countries by their official languages
- _Combined Filters_: Apply multiple filters simultaneously (region + language + search)
- _Responsive Design_: Works seamlessly on desktop and mobile devices
- _Country Details_: View detailed information about each country
- _Modern UI_: Clean and intuitive user interface built with Tailwind CSS

## Tech Stack

- _Frontend Framework_: Next.js
- _UI Library_: React
- _Styling_: Tailwind CSS
- _API_: REST Countries API
- _State Management_: React Hooks
- _Routing_: Next.js App Router

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

## Installation

bash

# Clone the repository

```bash
git clone https://github.com/yourusername/atlas-scope.git
```

# Navigate into the project folder

```bash
cd atlas-scope
```

# Install dependencies

```bash
npm install
# or
yarn install
```

## Running the Project

### Development Mode

```bash
npm run dev
# or
yarn dev
```

### Production Mode

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```bash
atlas-scope/
├── app/                  # Next.js app directory
├── components/           # React components
│   ├── country-card.jsx  # Country card component
│   ├── country-filters.jsx # Filter components
│   └── countries-grid.jsx # Grid layout component
├── lib/                  # Utility functions and API calls
│   └── api.js           # API integration
├── public/              # Static assets
└── styles/              # Global styles
```

## API Integration

The application uses the [REST Countries API](https://restcountries.com/) to fetch country data. The following endpoints are utilized:

- GET /all - Get all countries
- GET /name/{name} - Search countries by name
- GET /region/{region} - Filter countries by region

## Features Implementation

### Search Functionality

- Uses debounced search to prevent excessive API calls
- Searches through country names
- Updates results in real-time

### Filtering System

- Region filtering: Filter countries by geographical region
- Language filtering: Filter countries by official languages
- Combined filtering: Apply multiple filters simultaneously
- Reset functionality: Clear all filters with one click

### Performance Optimizations

- Debounced search to reduce API calls
- Client-side caching of API responses
- Efficient state management with React hooks
- Responsive design for optimal performance across devices

## Testing

### Running Tests

```bash
npm test
# or
yarn test
```

## Contributors

- [Bhashana Sirimanna](https://github.com/bhashanasirimanna)

## License

This project is licensed under the MIT License.
