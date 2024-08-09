import React from "react";
import "./SideBarItem.css";
import { useNavigate } from "react-router-dom";

const SideBarItem = (props) => {
    console.log(props.itemIdx);

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/entertainment/${props.itemTitle.toLowerCase()}`)
    }

    return (
        <>
            <div
                id={`whatever${props.itemIdx}` || ""}
                className="side-bar-item"
                onClick={handleNavigate}
            >
                {props.itemTitle}
            </div>
        </>
    );
};

export default SideBarItem;
