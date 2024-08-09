import React from "react";
import { RiMenu2Line } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { closeTheSideBar, openTheSideBar } from "../redux-slicers/sideBarSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const status = useSelector((state) => state.sidebar.isOpen);
    const navigate = useNavigate();
    console.log("Header render " + status);

    const dispatch = useDispatch();

    const openSideBar = () => {
        dispatch(openTheSideBar());
    };

    const closeSideBar = () => {
        dispatch(closeTheSideBar());
    };

    const backToMainPage = () => {
        navigate("/home");
    };

    return (
        <>
            <header className="header-container">
                <div id="side-menu-button">
                    <RiMenu2Line
                        id="side-menu-icon"
                        style={{ fontSize: "1.5rem" }}
                        onClick={() => openSideBar()}
                    ></RiMenu2Line>
                </div>
                <div id="web-title">
                    <span id="web-title-text" onClick={() => backToMainPage()}>
                        My Encyclopedia
                    </span>
                </div>
                <div id="setting-button">
                    <IoMdSettings
                        id="setting-icon"
                        style={{ fontSize: "1.5rem" }}
                    />
                </div>
            </header>
        </>
    );
};

export { Header };
