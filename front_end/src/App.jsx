import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

function App() {
    const sideBarStatus = useSelector((state) => state.sidebar);

    return (
        <>
            {/* <BrowserRouter> */}
                <Header></Header>
                {sideBarStatus.isOpen && <SideBar></SideBar>}
                <div className="main-page-body">
                    <Outlet></Outlet>
                </div>
            {/* // </BrowserRouter> */}
        </>
    );
}

export default App;
