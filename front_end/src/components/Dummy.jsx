import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
    const response = await axios.get("/api/dummy");
    console.log(response.data);
    if (response.data) return response.data;
    return null;
};

const Dummy = () => {
    console.log("dummy render");
    const data = useLoaderData();
    return <>{data || "Null"}</>;
};

export default Dummy;
