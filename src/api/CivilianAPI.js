import axiosClient from "./axiosClient";


//family id is userId
const civilianAPI = {
    findAllFamilyMemberByUser(familyId) {
        const url = "civilians/" + familyId    
        return axiosClient.post(url);
    },

    
}

export default civilianAPI;