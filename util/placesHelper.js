import { toGo, chillPlaces, istanbulBurgerList } from '../src/PlacesData.jsx';

export const getPlaceBySlug = (slug) => {
    const allPlaces = [...toGo, ...chillPlaces, ...istanbulBurgerList];
    return allPlaces.find(place => place.slug === slug);
};
