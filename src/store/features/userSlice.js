import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const signUser = createAsyncThunk('user/signUser', initUser => {
    return fetch('http://localhost:3300/users/signIn', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(initUser)
    })
        .then(res => res.json())
        .then(results => results);
});

export const logUser = createAsyncThunk('user/logUser', initUser => {
    return fetch('http://localhost:3300/users/logIn', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(initUser)
    })
        .then(res => res.json())
        .then(results => results);
});

export const findUser = createAsyncThunk('user/findUser', () => {
    return fetch('http://localhost:3300/users/find-user', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'auth': `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then(res => res.json())
        .then(results => results);
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        message: 'pleas fill the form to sign/log in',
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
            console.log(state.username, state.isLoge);
        });
        builder.addCase(findUser.rejected, (state, action) => {
            state.isLoge = false;
            state.username = '';
        });
    },
    reducers: {
      // isLog (state) {
      //     if (localStorage.getItem('token')) {
      //         state.isLog = true;
      //         state.message = 'login successfully';
      //     } else {
      //         state.isLog = false;
      //     }
      // },
        logOutUser(state) {
            state.isLog = false;
            state.username = '';
            localStorage.removeItem('token');
            state.message = 'pleas fill the form to sign/log in';
            console.log(state.isLog, state.username);
        },
    },
});

export const {isLog, logOutUser} = userSlice.actions;
export default userSlice.reducer;