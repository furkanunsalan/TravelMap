import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Place from "./Place.jsx";
import '../styles/sidebar.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PlaceContext } from "../store/place-context.jsx";

export function TabsNav() {
    const navigate = useNavigate();
    const { places } = useContext(PlaceContext);

    const placesToGo = places.filter(place => place.tag === 'ToGo');
    const placesBurger = places.filter(place => place.tag === 'Burger');
    const placesChill = places.filter(place => place.tag === 'Chill');

    return (
        <Tabs value="html" className="m-5">
            <TabsHeader>
                <Tab value="html">To Go</Tab>
                <Tab value="test">Gone</Tab>
            </TabsHeader>
            <TabsBody>
                <TabPanel value="html">
                    {placesToGo.length > 0 && <h1 className="text-center text-xl">Places I Have Visited</h1>}
                    {placesToGo.map((place, index) => (
                            <Place
                                key={index}
                                bookmarkName={place.name}
                                address={place.address}
                                date={place.date}
                                onClick={() => navigate(`/places/${place.slug}`)}
                            />
                        ))}
                </TabPanel>
                <TabPanel value="test">
                    {placesBurger.length > 0 && <h1 className="text-center text-xl">Burger Places</h1>}
                    {placesBurger.map((place, index) => (
                        <Place
                            key={index}
                            bookmarkName={place.name}
                            address={place.address}
                            date={place.date}
                            onClick={() => navigate(`/places/${place.slug}`)}
                        />
                    ))}
                    {placesChill.length > 0 && <h1 className="text-center text-xl mt-4">Chill Places</h1>}
                    {placesChill.map((place, index) => (
                        <Place
                            key={index}
                            bookmarkName={place.name}
                            address={place.address}
                            date={place.date}
                            onClick={() => navigate(`/places/${place.slug}`)}
                        />
                    ))}
                </TabPanel>
            </TabsBody>
        </Tabs>
    );
}
