import PropTypes from "prop-types";

export default function Place({ bookmarkName, date, address, status, onClick }) {
    function clickHandler() {
        onClick();
    }

    return (
        <div className="my-5 p-2 hover:cursor-pointer border border-gray-400 rounded-lg bg-gray-100" onClick={clickHandler}>
            <div className="heading flex justify-between items-center">
                <h4>{bookmarkName} <b className="text-xs">- {date}</b></h4>
            </div>
            <p className="text-xs">{address}</p>
        </div>
    );
}

Place.propTypes = {
    bookmarkName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};
