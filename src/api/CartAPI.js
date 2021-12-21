import axiosClient from "./axiosClient";


//family id is userId
const cartAPI = {
    findAll(status) {
        const district =  JSON.parse(localStorage.getItem('userInfo')).district;
        const wardName =  JSON.parse(localStorage.getItem('userInfo')).wardName;
        const groupNum =  JSON.parse(localStorage.getItem('userInfo')).groupNumber;
        const filter = {
            district: district,
            groupNumber: groupNum,
            wardName: wardName
        }
        const url = `cart/location/${status}` 
        return axiosClient.post(url, filter);
    },

    updateCartStatus(id, status) {
        const url = `cart/${id}/${status}`
        return axiosClient.put(url);
    }
}

export default cartAPI;