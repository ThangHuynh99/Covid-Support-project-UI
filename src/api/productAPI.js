import axiosClient from "./axiosClient";

const productAPI = {
    findAll() {
        const district =  JSON.parse(localStorage.getItem('userInfo')).district;
        const wardName =  JSON.parse(localStorage.getItem('userInfo')).wardName;
        const url = `product/${district}/${wardName}`
        return axiosClient.get(url);
    },

    save(body) {
        const url = "manager/product"
        return axiosClient.post(url, body);
    },

    update(body) {
        const url = "manager/product"
        return axiosClient.put(url, body);
    },

    delete(id) {
        const url = `manager/product/${id}`
        return axiosClient.delete(url)
    },

    disableProduct(id) {
        const url = `manager/product/status/disable/${id}`
        return axiosClient.put(url)
    },

    enableProduct(id) {
        const url = `manager/product/status/enable/${id}`
        return axiosClient.put(url)
    }
}

export default productAPI;