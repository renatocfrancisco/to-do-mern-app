import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
})

const refreshAuthLogic = (
    failedRequest,
    config = {
        method: "get",
        url: "refresh",
        headers: {
            cookies: `${localStorage.getItem("refreshToken")}`,
        },
    }
) =>
    axiosInstance(config).then((response) => {
        failedRequest.response.config.headers["Authorization"] =
            "Bearer " + response.data.accessToken;
        return Promise.resolve();
    });

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
    statusCodes: [403],
});

export default axiosInstance