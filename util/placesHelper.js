import PLACES_DATA from '../src/PlacesData.jsx';

export const getPlaceBySlug = (slug) => {
    return PLACES_DATA.find(place => place.slug === slug);
};
