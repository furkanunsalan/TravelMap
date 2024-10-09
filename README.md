# Travel Map Website

## Topics

- [Getting Started](#getting-started)
    - [Overview of the Travel Map Website](#overview)
    - [Features like interactive map, custom markers, and rating system](#features)
    
- [Installation & Setup](#installation--setup)
    - [Install dependencies](#installation)
    - [Set up environment variables](#set-up-environment-variables)
    - [Run the development server](#run-the-development-server)
    
- [Local Development](#local-development)
    - [Fork the repository](#fork-the-repository)
    - [Clone the repository](#clone-the-repository)
    - [Running the project locally](#running-the-project-locally)
        - [Environment variables configuration](#environment-variables-configuration)
        - [Viewing and adding places](#viewing-places-on-the-map)
        - [Firebase integration for places and images](#database-structure)
        
- [Database Structure](#database-structure)
    - [Firestore database layout for storing place details](#firestore-database-structure)
    - [Firebase storage structure for place images](#storage-bucket-structure)
    
- [Contributing](#development)
    - [Create a new branch](#create-a-new-branch)
    - [Make changes and commit](#make-your-changes)
    - [Push to remote](#push-to-remote)
    - [Create a pull request](#open-a-pull-request)
    
- [License and Contact](#license)
    - [License information](#license)
    - [Contact details for questions and feedback](#contact)


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
- **Firebase:** Database for storing places online.
- **Framer:** For animations.

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- NPM
- Vercel CLI (Required for the backend to work properly.)

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/furkanunsalan/travel-map.git
    cd travel-map
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root of the project and add your MapTiler API key:

    ```env
    VITE_API_KEY=your_maptiler_api_key
    FIREBASE_SERVICE_ACCOUNT=firebase_service_account_credential
    AUTH_EMAIL=email_for_submit_page_admin
    AUTH_PASSWORD=password_for_submit_page_admin
    MAIL_PASS=your-smtp-mail-password
    ```

4. **Run the Development Server**

    ```bash
    vercel dev
    ```

   Open `http://localhost:3000` in your browser to view the application.

## Usage

### Adding Places

- **Food:** list of food related places that I love visiting.
- **Chill:** List of places to hangout with friends and family.
- **Travel:** List of places to see around the world.
- **Library:** List of libraries to sit and study.

### Viewing Places on the Map

1. Click on a marker on the map to view details in a popup.
2. The popup will display information such as name, address, the latest visit date, and a rating with stars.

### Responsive Design

- The layout adjusts for smaller screens, switching from a sidebar and map view to a stacked view on mobile devices.

## Database Structure

The project uses **Firebase Firestore** to store information about each place and **Firebase Storage** for images. Below is the structure for both.

### Firestore Database Structure (`/places`)

```
/places
  └──1EyeJjFgzMS33jogOG2W
        ├── address: "Sinanpaşa, Ihlamurdere Cd. No:25A, 34022 Beşiktaş/İstanbul"
        ├── date: "10-07-2024"
        ├── description: ""
        ├── id: "1EyeJjFgzMS33jogOG2W"
        ├── latitude: "41.044224"
        ├── longitude: "29.003012211640893"
        ├── name: "Balta Burger"
        ├── rating: 4
        ├── site: ""
        ├── slug: "balta-burger"
        ├── status: "Gone"
        └── tag: "Food"
```

### Storage Bucket Structure (`/images`)

```
/images
    └── /balta-burger
            └── cover.png
```

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
