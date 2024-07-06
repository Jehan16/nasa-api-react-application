# NASA APOD and Mars Rover Photos React Application

Welcome to the NASA APOD and Mars Rover Photos React Application! This application allows you to explore stunning imagery from NASA's Astronomy Picture of the Day and the Mars Rover missions.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Jehan16/nasa-api-react-application.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd nasa-apod-mars-rover-react
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

## Build Process

To build the React application, follow these steps:

1. **Development Mode:**

   To run the application in development mode with hot reloading, use:

   Backend

   ```bash
   npm run start
   ```

   Frontend

   ```bash
   npm run dev
   ```

   This will start the development server at [http://localhost:3000](http://localhost:3000).

2. **Production Build:**

   To build the application for production, use:

   ```bash
   npm run build
   ```

   This will create a production build in the `build` directory.

## Usage

1. **Explore APOD Image:**

   - Upon launching the application, you'll see the Astronomy Picture of the Day displayed on the homepage.
   - You can click on the "Random APOD" button to load a random APOD image.

2. **Discover Mars Rover Photos:**

   - Navigate to the "Mars Rover Photos" page using the navigation bar.
   - Select a Mars rover from the dropdown menu.
   - Choose a date and click on the "Load Photos" button to view photos taken by the selected Mars rover on the chosen date.

3. **Enjoy the Experience:**

   - Explore the wonders of space captured by NASA's missions.
   - Feel free to share your favorite images with friends and family!

## Credits

- This application utilizes the [NASA API](https://api.nasa.gov/) to fetch Astronomy Picture of the Day and Mars Rover Photos.
- Built with React.js and styled with CSS, Bootstrap and font Awesome.

# API Integration Report

## Overview

This report discusses the integration of the NASA API for fetching Astronomy Picture of the Day (APOD) and Mars Rover Photos into a React application. It outlines the chosen APIs, challenges faced during integration, and their resolutions.

## Chosen APIs

1. **APOD API:** Provides access to the Astronomy Picture of the Day along with metadata, allowing fetching of the latest APOD and random APODs from the archive.

2. **Mars Rover Photos API:** Offers a collection of photos taken by Mars rovers Spirit, Opportunity, and Curiosity, enabling querying by rover, sol (Martian day), and camera type.

## Challenges Faced and Resolutions

### Challenge 1: Cross-Origin Resource Sharing (CORS)

**Issue:** CORS restrictions prevented API requests from the React application.

**Resolution:** Utilized a proxy server as an intermediary, configured to add necessary CORS headers, enabling successful requests.

### Challenge 2: Asynchronous Data Fetching

**Issue:** Asynchronous data fetching posed challenges in managing state and rendering components.

**Resolution:** Leveraged React's state management and lifecycle methods, using `useState` and `useEffect` to handle data fetching and component updates.

### Challenge 3: Error Handling and Fallbacks

**Issue:** Ensuring smooth user experience in case of API request failures or unexpected data.

**Resolution:** Implemented error handling logic to catch and handle errors, and included fallback mechanisms such as displaying default images or messages.

## Conclusion

Integration of the NASA APOD and Mars Rover Photos APIs into the React application was successfully accomplished despite challenges. By employing resolutions like using a proxy server, effective state management, and error handling, the application provides a seamless experience showcasing captivating imagery from NASA's missions.
