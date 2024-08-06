import PropTypes from "prop-types";
import '../styles/place.css';

export default function Place({ bookmarkName, date, address, status, onClick }) {
    function clickHandler() {
        onClick();
    }

    return (
        <div className="placebox my-5 p-2 hover:cursor-pointer" onClick={clickHandler}>
            <div className="heading flex justify-between items-center">
                <h4>{bookmarkName} <b className="date">- {date}</b></h4>
            </div>
            <p>{address}</p>
        </div>
    );
}

Place.propTypes = {
    bookmarkName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};
