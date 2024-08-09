import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux-store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Entertainment from "./components/Entertainment";
import MainPage from "./components/MainPage";
import Movies from "./components/Movies";
import Books from "./components/Books";
import Videos from "./components/Videos";
import MovieDetail, { loader as movieDetailLoader } from "./components/MovieDetail";
import ErrorComponent from "./components/ErrorComponent";
import AddMovie from "./components/AddMovie";
import {
    loader as addMovieLoader,
    action as addMovieAction,
} from "./components/AddMovie";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Provider store={store}>
                <App></App>
            </Provider>
        ),
        children: [
            {
                path: "home",
                element: <MainPage />,
            },
            {
                path: "entertainment",
                element: <Entertainment />,
                children: [
                    { path: "movies", element: <Movies></Movies> },
                    { path: "movies/:movieId", element: <MovieDetail></MovieDetail>, loader: movieDetailLoader  },
                    {
                        path: "movies/add-movie",
                        element: <AddMovie></AddMovie>,
                        loader: addMovieLoader,
                        action: addMovieAction,
                    },
                    { path: "books", element: <Books></Books> },
                    { path: "videos", element: <Videos></Videos> },
                ],
            },
        ],
    },
]);

// const router = createRoutesFromElements(
//     <Route>
//         <Route
//             element={<MainPage />}
//             path="/home"
//             errorElement={<ErrorComponent />}
//         ></Route>
//         <Route element={<Entertainment />} path="/entertainment">
//             <Route element={<Movies />} path="movies"></Route>

//             <Route
//                 element={<MovieDetail></MovieDetail>}
//                 path="movies/:movieId"
//             ></Route>

//             {/* <Route
//         element={<ModifyMovie></ModifyMovie>}
//         path="movies/add-movie/:movieID"
//     ></Route> */}

//             <Route
//                 element={<AddMovie></AddMovie>}
//                 path="movies/add-movie"
//                 action={async () => {
//                     console.log("dawjidaw");
//                 }}
//                 loader={() => {
//                     console.log("dja");
//                 }}
//             ></Route>

//             <Route element={<Books />} path="books"></Route>
//             <Route element={<Videos />} path="videos"></Route>
//         </Route>
//         <Route path="*" element={<ErrorComponent />} />
//     </Route>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);
