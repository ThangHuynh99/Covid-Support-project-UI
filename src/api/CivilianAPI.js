import axiosClient from "./axiosClient";


//family id is userId
const CivilianAPI = {
    findAllFamilyMemberByUser(familyId) {
        const url = "civilians/" + familyId    
        return axiosClient.get(url);
    },

    
}

export default CivilianAPI;