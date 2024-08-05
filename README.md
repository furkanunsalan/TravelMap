# Travel Map Website

## Overview

Welcome to the Travel Map Website! This project is a personal tool to track and visualize travel destinations and places of interest on a map. It allows you to manage and view a list of places you plan to visit, as well as places you want to relax in. The application integrates with the MapTiler API to display interactive maps and custom markers.

## Features

- **Interactive Map:** Visualize locations on an interactive map using the MapTiler API.
- **Custom Markers:** Add markers to the map for different places with customizable popups.
- **Dynamic Tabs:** Switch between different lists of places using tabs.
- **Rating System:** View and manage places with a rating system displayed in the popups.
- **Responsive Design:** The interface adapts to different screen sizes for better usability on mobile devices.

## Technologies Used

- **React:** For building the user interface.
- **Tailwind CSS:** For styling and responsive design.
- **MapTiler SDK:** For map rendering and interaction.
- **Vite:** For development and build tooling.
- **Vercel:** For deployment.

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/furkanunsalan/travel-map.git
    cd travel-map
    ```

2. **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root of the project and add your MapTiler API key:

    ```env
    VITE_API_KEY=your_maptiler_api_key
    ```

4. **Run the Development Server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

   Open `http://localhost:3000` in your browser to view the application.

## Usage

### Adding Places

- **To Go:** List of places you plan to visit.
- **Burger List:** List of places to relax or enjoy burgers.
- **Chill Places:** Places to hang out with friends. Coffee shops, parks etc.

### Viewing Places on the Map

1. Click on a marker on the map to view details in a popup.
2. The popup will display information such as name, address, the latest visit date, and a rating with stars.

### Responsive Design

- The layout adjusts for smaller screens, switching from a sidebar and map view to a stacked view on mobile devices.

## Development

To contribute or make changes:

1. **Create a New Branch**

    ```bash
    git checkout -b feature/your-feature
    ```

2. **Make Your Changes**

3. **Commit Your Changes**

    ```bash
    git add .
    git commit -m "Add a descriptive commit message"
    ```

4. **Push to Remote**

    ```bash
    git push origin feature/your-feature
    ```

5. **Open a Pull Request** on GitHub to merge your changes into the main branch.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to:

- **Furkan Ünsalan** - [hi@furkanunsalan.dev](mailto:hi@furkanunsalan.dev)

## Acknowledgments

- **MapTiler:** For providing the map tiles and API.
- **Tailwind CSS:** For making it easy to style the application.
- **React Community:** For creating the React ecosystem.

---

Feel free to customize this `README.md` to better match your project's specifics and personal preferences!
