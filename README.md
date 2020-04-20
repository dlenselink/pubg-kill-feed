## Getting Started

To run the project follow these steps:

1) Clone the repository from Github.

2) Contact the app developer for the .env file. Once received, place the .env at the root of the project.

3) In a terminal with this project as your working directory, run the following commands:

  - `yarn prepare`
  - `yarn start`

4) The output will be served from http://localhost:3000 .

## Using the App

Currently the only functionality is that the main player info is logged to the console upon a successful search. To use the search, hover over the magnifying glass icon, then enter a PUBG player name and hit the Enter key. After the loading animation is done, check either the console or LocalStorage for player information. The search can be used any number of times. Future functionality will include player season stats, lifetime stats, and a live feed of all combat encounters (kills, knockouts, deaths).

The app is currently not compatible with touchscreen devices.

## Versions

- v0.0.1: Initial build of app using React Class components
- v0.0.2: Refactored build of the app featuring React Hooks and const-based components. This version added the loading screen, player info logging to console, and basic error handling.

## About

PUBG Kill Feed is a sister project to [PUBGperfect](https://github.com/dlenselink/pubgperfect). It contains many of the same ideas re-written in a React + Typescript environment instead of PHP. Want to contribute? Clone/Fork this project and feel free to either use [your own PUBG API key](https://developer.pubg.com) or contact [dlenselink](https://github.com/dlenselink) for details on getting started!