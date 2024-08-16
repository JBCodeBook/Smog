# Smog

![License](https://img.shields.io/github/license/JBCodeBook/Smog)
![Issues](https://img.shields.io/github/issues/JBCodeBook/Smog)
![Forks](https://img.shields.io/github/forks/JBCodeBook/Smog)
![Stars](https://img.shields.io/github/stars/JBCodeBook/Smog)

![Smog Preview](Smog%202/src/assets/Preview.png)  <!-- This is the image preview -->

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Key Dependencies](#key-dependencies)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## About

**Smog** is a web application built using React that allows users to explore air quality data from around the world. By leveraging the Google Maps API, Smog provides an interactive map where users can select any location to view the corresponding Street View. Once a location is selected, the application calls Google's Air Quality API to fetch real-time air quality information for that specific area.

## Features

- **Interactive Google Map Integration**: Explore the world with a fully interactive Google Map, allowing you to zoom in, out, and navigate to any location.
- **Street View Selection**: Select any point on the map to instantly view the corresponding Google Street View image, providing a real-time feel of the location.
- **Real-Time Air Quality Data**: Instantly retrieve and display the local air quality index (AQI) for any selected location using Google's Air Quality API.
- **Responsive Design**: Optimized for both desktop and mobile devices, ensuring a seamless experience across all screen sizes.
- **User-Friendly Interface**: Simple and intuitive design, making it easy for users of all levels to explore and obtain air quality information.
- **Global Coverage**: Access air quality data from virtually anywhere in the world, helping users make informed decisions based on environmental conditions.

## Getting Started

### Key Dependencies

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Google Maps API](https://developers.google.com/maps/documentation) - Provides interactive maps and location data.
- [Google Air Quality API](https://developers.google.com/maps/documentation/air-quality) - Fetches real-time air quality data.

All dependencies are managed via `npm`. Simply run `npm install` to install all required packages.

### Prerequisites

Before you can run this project, you'll need to obtain API tokens and create an `.env` file for storing sensitive information.

1. **Google Maps API Key**:
   - Sign up for a Google Cloud account if you don't have one.
   - Create a new project in the [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the Google Maps JavaScript API and the Google Air Quality API.
   - Generate an API key from the Credentials page.

2. **Create a `.env` file**:
   - In the root directory of the project, create a file named `.env`.
   - Add your API keys to the `.env` file:

   ```bash
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   REACT_APP_GOOGLE_AIR_QUALITY_API_KEY=your_google_air_quality_api_key_here

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/JBCodeBook/Smog.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Smog
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up your environment variables by creating a `.env` file as described in the prerequisites.

5. Run the project:

    ```bash
    npm run dev
    ```
