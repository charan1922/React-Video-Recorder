import {
    SAVE_VIDEO1,
    SAVE_VIDEO2,
    SAVE_VIDEO3,
    FETCH_VIDEOS,
    RESET_DATA
} from "../constants";


export const saveVideo1 = (data) => {
    return {
        type: SAVE_VIDEO1,
        payload: data
    }
};
export const saveVideo2 = (data) => {
    return {
        type: SAVE_VIDEO2,
        payload: data
    }
};
export const saveVideo3 = (data) => {
    return {
        type: SAVE_VIDEO3,
        payload: data
    }
};
export const fetchVideos = () => {
    return {
        type: FETCH_VIDEOS,
    }
};

export const resetData = () => {
    return {
        type: RESET_DATA
    };
};
