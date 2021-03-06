import axios from 'axios';
import moment from 'moment';

var axiosClient = null;

var access = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : "";
if(localStorage.getItem('expire') && localStorage.getItem('expire') > moment().format('X')) {
    axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + access
    },
});
} else {
    axiosClient = axios.create({
        baseURL: 'http://localhost:8080/api/v1/',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosClient;
