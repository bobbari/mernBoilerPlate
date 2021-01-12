import { userType } from '../types/user.types';
import axios from 'axios'

export const loginUserStart = () => {
    return { type: userType.LOGIN_START }
}

export const loginUser = data => {
    return (dispatch) => {
        console.log(data)
        const request = axios.post(`http://localhost:5000/api/user/login`, data)
            .then((result) => {
                dispatch({
                    type: userType.LOGIN_SUCCESS,
                    payload: result.data
                })
            }).catch((err) => {
                dispatch({
                    type: userType.LOGIN_FAILURE,
                    payload: err
                })
            });
    }

}
