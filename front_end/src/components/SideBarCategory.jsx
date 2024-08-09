import React, { useState } from "react";
import "./SideBarCategory.css";
import { MdExpandMore } from "react-icons/md";
import SideBarItem from "./SideBarItem";
import { useNavigate } from "react-router-dom";
const SideBarCategory = (props) => {
    const [isExpand, setIsExpand] = useState(false);
    const navigate = useNavigate();
    const itemArray = props.itemArray;
    const handleClick = () => {
        setIsExpand(state => !state);
    }
    const handleItemClick = (event) => {
        // console.log(event.target);
        navigate('/entertainment')
    }


    return (
        <div className="category-container">
            <div className="category-header" onClick={handleClick}>
                {props.categoryName || ""}
                <MdExpandMore id="expand-icon"/>
            </div>
            {isExpand && <div className="category-body">
                {itemArray && itemArray.map((item, idx) => (
                    <SideBarItem itemIdx={idx} itemTitle={item.title} onClick={(e) => handleItemClick(e)}/>
                ))}
            </div>}
        </div>
    );
};

export default SideBarCategory;
