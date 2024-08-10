import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Place from "./Place.jsx";
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
        <div className="p-5"> {/* Added padding for better spacing */}
            <Tabs value="to-go" className="w-full">
                <TabsHeader>
                    <Tab value="to-go">To Go</Tab>
                    <Tab value="gone">Gone</Tab>
                </TabsHeader>
                <TabsBody>
                    <TabPanel value="to-go">
                        {placesToGo.length > 0 && <h1 className="text-center text-xl font-bold mb-4">Places I Plan to Visit</h1>}
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
                    <TabPanel value="gone">
                        {placesBurger.length > 0 && <h1 className="text-center text-xl font-bold mb-4">Burger Places</h1>}
                        {placesBurger.map((place, index) => (
                            <Place
                                key={index}
                                bookmarkName={place.name}
                                address={place.address}
                                date={place.date}
                                onClick={() => navigate(`/places/${place.slug}`)}
                            />
                        ))}
                        {placesChill.length > 0 && <h1 className="text-center text-xl font-bold mt-4">Chill Places</h1>}
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
        </div>
    );
}
