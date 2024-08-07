import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

import PLACES_DATA from "../PlacesData.jsx";
import Place from "./Place.jsx";
import '../styles/sidebar.css'
import {useNavigate} from "react-router-dom";

export function TabsNav() {
    const navigate = useNavigate()
    const placesToGo = PLACES_DATA.filter(place => place.tag === 'ToGo')
    const placesBurger = PLACES_DATA.filter(place => place.tag === 'Burger')
    const placesChill = PLACES_DATA.filter(place => place.tag === 'Chill')

    return (
        <Tabs value="html" className="m-5">
            <TabsHeader>
                <Tab value="html">To Go</Tab>
                <Tab value="test">Gone</Tab>
            </TabsHeader>
            <TabsBody>
                <TabPanel value="html">
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
                    <h1 className="text-center text-xl">Burger Places</h1>
                    {
                        placesBurger.map((place, index) => (
                        <Place
                            key={index}
                            bookmarkName={place.name}
                            address={place.address}
                            date={place.date}
                            onClick={() => navigate(`/places/${place.slug}`)}
                        />
                    ))}

                    <h1 className="text-center text-xl">Chill Places</h1>
                    {
                        placesChill.map((place, index) => (
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
