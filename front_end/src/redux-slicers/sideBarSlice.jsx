import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
    name: 'sidebar',
    initialState: {isOpen: false},
    reducers: {
        openTheSideBar : (state) => {
            // console.log("action openTheSideBar");
            state.isOpen = true;
        },
        closeTheSideBar : (state) => {
            state.isOpen = false;
        }
    }
})
// console.log("actions");
// console.log(sideBarSlice.actions);

export default sideBarSlice.reducer;
export const {openTheSideBar, closeTheSideBar} = sideBarSlice.actions; // destructing