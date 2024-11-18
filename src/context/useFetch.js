import axios from 'axios';
const BASE_URL = 'https://mrdocs.empiredigitalsapps.com/api'

const useFetch = () => {
    
    const fetchData = async ({ endPoint, method, data, loadingText = 'Processing...' }) => {
        const config = {
            method,
            url: `${BASE_URL}${endPoint}`,
            data,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            }
        };

        try {
            const { data: responseData } = await axios(config);
            return responseData;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'An error occurred while fetching data.';
            console.error('Error fetching data:', errorMessage);
        } finally {
            console.log('Done fetching...')
        }
    };

    return { fetchData };
};

export default useFetch;
