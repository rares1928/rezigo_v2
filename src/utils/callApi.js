import Cookies from 'universal-cookie';
import axios from 'axios';

export const callApi = async (url, data, handle, handleError) => {
    const cookies = new Cookies();
    const token = cookies.get('accessToken');
    const refreshToken = cookies.get("refreshToken");
    const config = {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}`, refreshToken: `${refreshToken}` },
    };
    try {
        const response = await axios.post(url, data, config)
        if (response.data) {
            if ("token" in response.data) {
                if(cookies.get("rememberMe") === "true"){
                    cookies.remove("accessToken");
                    cookies.remove("refreshToken");
                    cookies.set('accessToken', response.data.token, { path: "/", maxAge: 2592000 });
                    cookies.set('refreshToken', response.data.refreshToken, {path: "/", maxAge: 2592000});
                }else{
                    cookies.remove("accessToken");
                    cookies.remove("refreshToken");
                    cookies.set('accessToken', response.data.token, { path: "/" });
                    cookies.set('refreshToken', response.data.refreshToken, {path: "/"});
                }
            }
        }
        handle(response);
    } catch (err) { handleError(err.response.status) }
};