import {useLocation, useParams} from "react-router-dom";

function PlaceDetail() {
    const location = useLocation()
    const item = location.state
    return (
        <div>
            <h1>Place Detail for {item.name}</h1>
            {/* Render place details here */}
        </div>
    );
}

export default PlaceDetail