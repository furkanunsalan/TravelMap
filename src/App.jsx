import Map from './components/map.jsx';
import './App.css';
import SideBar from "./components/sidebar.jsx";

function App() {
    return (
        <div className="App">
            <div className="main">
                <div className="sidebar">
                    <SideBar />
                </div>
                <div className="main-content">
                    <Map />
                </div>
            </div>
        </div>
    );
}

export default App;