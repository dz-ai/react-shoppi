import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchFun} from "./fetchFun";

export const signUserThunk = (typePrefix) =>
    createAsyncThunk(typePrefix, initUser => {
    return fetchFun(
        '/users/signIn',
        'post',
        {'Content-Type': 'application/json'},
        initUser);
});