## Getting Started

To run the project follow these steps:

1) Clone the repository from Github.

2) Either request your own PUBG API key or contact dlenselink for the .env file that contains the PUBG API Key as `PUBG_API_KEY=`. Once received, place the .env at the root of the project.

3) If this is the first time running the app on your machine or package.json was updated, run the `npm i` command in a terminal with this project as your working directory.

4) In that same terminal, run the `npm start` command.

## Using the App

To use the search functionality, hover over the magnifying glass icon and enter a PUBG player name. Then, hit the Enter key. Future functionality will include player season stats, lifetime stats, and a live feed of all combat encounters (kills, knockouts, deaths).

You can run eslint on the command line as follows: `npm test`.

Do not run `npm run build` locally when testing build configs, this will overwrite your api key .env. Use `npm run compile` instead.

## Versions

- v0.0.1: Initial build of app using React Class components
- v0.0.2: Refactored build of the app featuring React Hooks and const-based components. This version added the loading screen, player info logging to console, and basic error handling.
- v0.0.3: Optimized packages, added yarn prepare command, significantly updated README.
- v0.0.4: Complete project overhaul: started from scratch without create-react-app, switched over to npm and restructured the app to use Hooks and the Context API for global state management.
- v0.0.5: Improved project structure, enabled full mobile compatability, elminated console errors, optimized build process for Netlify, improved loading animation, changed color scheme, added a few loader packages to assist in deployment, removed manifest due to issues, delivered all static assets via CDN, optimized and tested page speed (100 on both Google and GTMetrix!). Most importantly, I configured the development branch to [autodeploy to a Netlify instance](https://sharp-agnesi-931425.netlify.app).
- v0.0.6: Rewrote entire app structure to leverage context + useReducer, added and configured eslint, fixed searchbar bug.
- .0.0.7: Improved reducer logic and added season stats table.

## About

Want to contribute? Clone/Fork this project and feel free to either use [your own PUBG API key](https://developer.pubg.com) or contact [dlenselink](https://github.com/dlenselink) for details on getting started!
