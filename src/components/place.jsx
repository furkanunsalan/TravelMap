import './css/place.css';
import PropTypes from "prop-types";

export default function Place({bookmarkName,date,address}){
    return (
        <div className="placebox my-5">
            <div className="heading">
                <h4>{bookmarkName} <b className="date">- {date}</b></h4>
            </div>
            <p>{address}</p>
        </div>
    );
}
Place.propTypes = {
    bookmarkName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
};
