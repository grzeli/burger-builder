import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSucces = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCES,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGnymmRA-PK6LTz7oiXtig4f8JulLfEkc';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGnymmRA-PK6LTz7oiXtig4f8JulLfEkc'
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response)
                dispatch(authSucces(response.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    };
};