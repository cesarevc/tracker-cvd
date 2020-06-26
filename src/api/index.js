import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';


export const fetchApi = async (country) => {
    let changeableURL = url

    if (country) {
        changeableURL = `${url}/countries/${country}`;
    }

    try {
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableURL);

        return { confirmed, recovered, deaths, lastUpdate };

    } catch (err) {
        return err;
    }
} 


export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        const processedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))

        return processedData;

    } catch (err) {
        return err;
    }
}


export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`);

        return countries.map(country => country.name);

    } catch (err) {
        return err;
    }
}