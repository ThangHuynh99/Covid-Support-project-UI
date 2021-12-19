import axiosClient from "./axiosClient";


const usersAPI = {
    getUsers(page) {
        const url = "users" + page ? "?page=" + page : ""
        const body = JSON.stringify({
            "district": JSON.parse(localStorage.getItem('userInfo')).district,
            "wardName": JSON.parse(localStorage.getItem('userInfo')).wardName,
            "groupNumber": JSON.parse(localStorage.getItem('userInfo')).groupNumber,
        });
        return axiosClient.post(url, body);
    },
}

export default usersAPI;