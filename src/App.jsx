import Map from './components/map.jsx';
import './App.css';
import SideBar from "./components/sidebar.jsx";

import React from 'react';
import './App.css'; // Assuming your CSS file where styles are defined

function App() {
    return (
        <div className="App">
            <div className="main">
                <div className="map">
                    <Map/>
                </div>
                <div className="sidebar">
                    <SideBar/>
                </div>
            </div>
        </div>
    );
}

export default App;