import Place from './place.jsx';
import './css/sidebar.css';
import places from '../places.jsx';

export default function SideBar() {
        return (
            <div>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <h4 className="mainhe">Furkan's Travel List</h4>
                    {places.map((place, index) => (
                        <Place
                            key={index}
                            bookmarkName={place.name}
                            address={place.address}
                            date={place.date}
                        />
                    ))}
            </div>
        );
}
