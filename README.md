## Getting Started

To run the project follow these steps:

1) Clone the repository from Github.

2) Either request your own PUBG API key or contact dlenselink for the .env file that contains the PUBG API Key as `PUBG_API_KEY=`. Once received, place the .env at the root of the project.

3) If this is the first time running the app on your machine or package.json was updated, run the `npm i` command in a terminal with this project as your working directory.

4) In that same terminal, run the `npm start` command.

## Using the App

Currently the only functionality is that the main player info is logged to the console upon a successful search. To use the search, hover over the magnifying glass icon, then enter a PUBG player name and hit the Enter key. After the loading animation is done, check the console for player information. The search can be used any number of times. Future functionality will include player season stats, lifetime stats, and a live feed of all combat encounters (kills, knockouts, deaths).

The develpment branch auto-deploys to this Netlify instance:

`https://sharp-agnesi-931425.netlify.app`


## Versions

- v0.0.1: Initial build of app using React Class components
- v0.0.2: Refactored build of the app featuring React Hooks and const-based components. This version added the loading screen, player info logging to console, and basic error handling.
- v0.0.3: Optimized packages, added yarn prepare command, significantly updated README.
- v0.0.4: Complete project overhaul: started from scratch without create-react-app, switched over to npm and restructured the app to use Hooks and the Context API for global state management.
- v0.0.5: Improved project structure, enabled full mobile compatability, elminated console errors, optimized build process for Netlify, improved loading animation, changed color scheme, added a few loader packages to assist in deployment, removed manifest due to issues, delivered all static assets via CDN, optimized and tested page speed (100 on both Google and GTMetrix!). Most importantly, I configured the development branch to [autodeploy to a Netlify instance](https://sharp-agnesi-931425.netlify.app). 

## About

PUBG Kill Feed is a sister project to [PUBGperfect](https://github.com/dlenselink/pubgperfect). It contains many of the same ideas re-written in a React + Typescript environment instead of PHP. Want to contribute? Clone/Fork this project and feel free to either use [your own PUBG API key](https://developer.pubg.com) or contact [dlenselink](https://github.com/dlenselink) for details on getting started!