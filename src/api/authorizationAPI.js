import axiosClient from "./axiosClient";


const authorizationAPI = {
    login(userName, passWord) {
        const url = "auth/login"
        const body = JSON.stringify({
            "userName": userName,
            "passWord": passWord,
        });
        return axiosClient.post(url, body);
    },

    signup() {
        const url = "auth/signup"
        return axiosClient.post(url);
    },

    checkToken() {
        const url = "checkToken"
        return axiosClient.post(url);
    }
}

export default authorizationAPI;