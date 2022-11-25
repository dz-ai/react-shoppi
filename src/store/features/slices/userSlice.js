import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchFun} from "../fetchFun";
import {signUserThunk} from "../thunks";

export const signUser = signUserThunk('user/signUser');

export const logUser = createAsyncThunk('user/logUser', initUser => {
    return fetchFun(
        '/users/logIn',
         'post',
        {'Content-Type': 'application/json'},
        initUser);
});

export const findUser = createAsyncThunk('user/findUser', () => {
    return fetchFun(
        '/users/find-user',
        'get',
        {
            'Content-Type': 'application/json',
            'auth': `Bearer ${localStorage.getItem('token')}`,
    });
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        message: 'please fill the form to sign/log in',
        isLog: false,
    },
    extraReducers(builder) {
        builder.addCase(signUser.fulfilled, (state, action) => {
            state.isLog = action.payload.isSign;
            state.username = action.payload.username;
            state.message = action.payload.message;
            action.payload.token && localStorage.setItem('token', action.payload.token);
            console.log(state.isLog, state.username)
        });
        builder.addCase(logUser.fulfilled, (state, action) => {
            state.isLog = action.payload.isSign;
            state.message = action.payload.message;
            state.username = action.payload.username;
            action.payload.token && localStorage.setItem('token', action.payload.token);
            console.log(state.isLog, state.username, state.message);
        });
        builder.addCase(findUser.fulfilled, (state, action) => {
            state.isLog = action.payload.userLog;
            state.username = action.payload.username;
        });
        builder.addCase(findUser.rejected, (state, action) => {
            state.isLoge = false;
            state.username = '';
        });
    },
    reducers: {
        logOutUser(state) {
            state.isLog = false;
            state.username = '';
            localStorage.removeItem('token');
            state.message = 'please fill the form to sign/log in';
            console.log(state.isLog, state.username);
        },
    },
});

export const {logOutUser} = userSlice.actions;
export default userSlice.reducer;