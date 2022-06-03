import axiosClient from "../../api/axios-client";


export const CommonService = {
    searchByKeyword: (params:object) => {
        const url = `search/movie`;
        return axiosClient.get(url,{params});
    }
}