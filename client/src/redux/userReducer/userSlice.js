import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Data: {
        userId: '',
        firstname: '',
        lastname: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SetUserData: (state, action) => {
            state.Data = {
                ...state.Data,
                userId: action.payload.userId,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname
            }
        },

        SetLogout: (state) => {
            state.Data = {
                ...state.Data,
                userId: '',
                firstname: '',
                lastname: ''
            }
        }

    }
});

export const { SetUserData, SetLogout } = userSlice.actions;

export default userSlice.reducer;