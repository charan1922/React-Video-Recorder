import {
    SAVE_VIDEO1,
    SAVE_VIDEO2,
    SAVE_VIDEO3,
    FETCH_VIDEOS,
    RESET_DATA
} from "../constants";

const INIT_STATE = {
    video1: null,
    video2: null,
    video3: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SAVE_VIDEO1: {
            return {
                ...state,
                video1: action.payload,
            }
        }
        case SAVE_VIDEO2: {
            return {
                ...state,
                video2: action.payload,
            }
        }
        case SAVE_VIDEO3: {
            return {
                ...state,
                video3: action.payload,
            }
        }
        case FETCH_VIDEOS: {
            return {
                ...state,
            }
        }
        case RESET_DATA: {
            return {
                ...state,
                video1: null,
                video2: null,
                video3: null,
            }
        }
        default:
            return state;
    }
}
