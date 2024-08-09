import React from "react";
import { Outlet } from "react-router-dom";
const Entertainment = () => {
    return (
        <div style={{width: "100%"}}>
            <Outlet></Outlet>
        </div>
    );
};

export default Entertainment;
