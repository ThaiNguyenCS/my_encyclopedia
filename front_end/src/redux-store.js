import { configureStore } from "@reduxjs/toolkit";
import sideBarSlice from "./redux-slicers/sideBarSlice";
import movieSlice from "./redux-slicers/movieSlice";
const store = configureStore (
{
    reducer: {
        sidebar: sideBarSlice,
    }
});

export default store;