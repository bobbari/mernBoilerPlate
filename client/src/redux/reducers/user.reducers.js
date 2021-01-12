import { userType } from '../types/user.types';

const initalState = {
    isLoading: false,
    error: null,
    user: ''
}
const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case userType.LOGIN_START:
            return { ...state, isLoading: true, error: null }
        case userType.LOGIN_SUCCESS:
            localStorage.setItem('auth', JSON.stringify(action.payload));
            return { ...state, isLoading: false, error: null, user: action.payload };
        case userType.LOGIN_FAILURE:
            return { ...state, isLoading: false, error: action.payload, user: "" }

        default:
            return { ...state };
    }
}

export default userReducer