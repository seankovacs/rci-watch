export const API_ENDPOINT = `http://localhost:5000`;

export const getHotMarketData = async (startDate, endDate, nelat, nelng, swlat, swlng) => {
    const res = await fetch(`${API_ENDPOINT}/hot-market?start=${startDate}&end=${endDate}&ne_lat=${nelat}&ne_lng=${nelng}&sw_lat=${swlat}&sw_lng=${swlng}`);
    const json = await res.json();
    return json;
}