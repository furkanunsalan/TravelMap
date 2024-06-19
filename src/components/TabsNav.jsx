import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

import { toGo, chillPlaces } from "../places.jsx";
import Place from "./place.jsx";
import './css/sidebar.css'

export function TabsNav() {
    return (
        <Tabs value="html" className="m-5">
            <TabsHeader>
                <Tab value="html">To Go</Tab>
                <Tab value="test">Burger List</Tab>
            </TabsHeader>
            <TabsBody>
                <TabPanel value="html">
                    {toGo.map((place, index) => (
                        <Place
                            key={index}
                            bookmarkName={place.name}
                            address={place.address}
                            date={place.date}
                        />
                    ))}
                </TabPanel>
                <TabPanel value="test">
                    {chillPlaces.map((place, index) => (
                        <Place
                            key={index}
                            bookmarkName={place.name}
                            address={place.address}
                            date={place.date}
                        />
                    ))}
                </TabPanel>
            </TabsBody>
        </Tabs>
    );
}
