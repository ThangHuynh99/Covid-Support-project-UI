import axiosClient from "./axiosClient";

const productAPI = {
    findAll() {
        const district =  JSON.parse(localStorage.getItem('userInfo')).district;
        const wardName =  JSON.parse(localStorage.getItem('userInfo')).wardName;
        const url = `product/${district}/${wardName}`
        return axiosClient.post(url);
    },

    
}

export default productAPI;