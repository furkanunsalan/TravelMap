import fetch from "node-fetch";

export default async (req, res) => {
    const { lng, lat, zoom } = req.query;
    const MAPTILER_API_KEY = process.env.VITE_API_KEY;

    if (!MAPTILER_API_KEY) {
        res.status(500).json({ error: "MAPTILER_API_KEY is not defined" });
        return;
    }
    try {
        const response = await fetch(
            `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_API_KEY}`
        );
        if (!response.ok) {
            throw new Error(
                `Network response was not ok: ${response.statusText}`
            );
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(`Error fetching map data: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
