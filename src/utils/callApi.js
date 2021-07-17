import Cookies from 'universal-cookie';
import axios from 'axios';

export const callApi = async (url, data, handle, handleError) => {
    const cookies = new Cookies();
    const token = cookies.get('accessToken');
    const config = {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
    };
    try {const response = await axios.post(url, data, config)
    if (response.data) {
        if ("token" in response.data) {
            cookies.set('accessToken', token, { path: "/" })
        }
        handle(response.data["lista"])
    }
    }catch(err){handleError(err.response.status)}
};