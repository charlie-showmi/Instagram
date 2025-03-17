import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSendMailOpen: false,
    emails : [],
    selectedEmail: null,
    searchText: "",
    User : null,
   
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.isSendMailOpen = action.payload;
        },
        setEmails: (state, action) =>{
            state.emails = action.payload;
        },
        setSelectedEmail: (state, action) => {
            state.selectedEmail = action.payload;
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setUser: (state, action) => {
            state.User = action.payload;
        }

       
    },
});

export const { setOpen ,setEmails,setSelectedEmail,setSearchText,setUser} = appSlice.actions;
export default appSlice.reducer;
