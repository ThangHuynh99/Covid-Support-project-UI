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

    signup(body) {
        const url = "auth/signup"
        return axiosClient.post(url, body);
    },

    async checkToken() {
        const url = "checkToken"
        return await axiosClient.post(url);
    }
}

export default authorizationAPI;