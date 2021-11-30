export const API_ENDPOINT = `http://localhost:5000`;

export const getHotMarketData = async (startDate, endDate, nelat, nelng, swlat, swlng) => {
    const res = await fetch(`${API_ENDPOINT}/hot-market?start=${startDate}&end=${endDate}&ne_lat=${nelat}&ne_lng=${nelng}&sw_lat=${swlat}&sw_lng=${swlng}`);
    const json = await res.json();
    return json;
}

export const getInventoryAgeData = async (startDate, endDate, cities) => {
    const res = await fetch(`${API_ENDPOINT}/inventory-age?start=${startDate}&end=${endDate}&cities=${cities}`);
    const json = await res.json();
    return json;
}

export const getAverageWealthData = async (startDate, endDate, cities) => {
    const res = await fetch(`${API_ENDPOINT}/average-wealth?start=${startDate}&end=${endDate}&cities=${cities}`);
    const json = await res.json();
    return json;
}

export const getUnemploymentData = async (startDate, endDate, cities) => {
    const res = await fetch(`${API_ENDPOINT}/unemployment?start=${startDate}&end=${endDate}&cities=${cities}`);
    const json = await res.json();
    return json;
}