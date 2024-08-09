import { createSlice } from "@reduxjs/toolkit";

// NOT NECESSARY YET    

const movieSlice = createSlice(
    {
        name: "movieSlice",
        initialState: {singleMovieDisplay: false},
        reducers: {
            toggleDisplay(state) {
                state.singleMovieDisplay = !state.singleMovieDisplay;
            } 
        }
    }

)

export default movieSlice.reducer;
export const {toggleDisplay} = movieSlice.actions;