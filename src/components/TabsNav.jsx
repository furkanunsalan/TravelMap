import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

import {toGo, istanbulBurgerList, chillPlaces} from "../PlacesData.jsx";
import Place from "./Place.jsx";
import '../styles/sidebar.css'
import {useNavigate} from "react-router-dom";

export function TabsNav() {
    const navigate = useNavigate()

    return (
        <Tabs value="html" className="m-5">
            <TabsHeader>
                <Tab value="html">To Go</Tab>
                <Tab value="test">Gone</Tab>
            </TabsHeader>
            <TabsBody>
                <TabPanel value="html">
                    {toGo.map((place, index) => (
                        <Place
                            key={index}
                            bookmarkName={place.name}
                            address={place.address}
                            date={place.date}
                            onClick={() => navigate(`/places/${place.slug}`, {
                                state: place
                            })}
                        />
                    ))}
                </TabPanel>
                <TabPanel value="test">
                    {
                        [...chillPlaces, ...istanbulBurgerList].map((place, index) => (
                        <Place
                            key={index}
                            bookmarkName={place.name}
                            address={place.address}
                            date={place.date}
                            onClick={() => navigate(`/places/${place.slug}`, {
                                state: place
                            })}
                        />
                    ))}
                </TabPanel>
            </TabsBody>
        </Tabs>
    );
}
