import axiosClient from "../../api/axios-client";


export const MovieService = {
    getMovieList: (type:string, params:object) => {
        const url = `movie/${type}`;
        return axiosClient.get(url, {params});
    },
    getMovieDetail: (id:number, params:object) => {
        const url = `movie/${id}`;
        return axiosClient.get(url, {params});
    },
    getCastListById: (id:string) => {
        const url =`movie/${id}/credits`;
        return axiosClient.get(url,{params:{}});
    }
}