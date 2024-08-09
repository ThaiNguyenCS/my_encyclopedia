import { useDispatch, useSelector } from "react-redux";
import "./SideBar.css";
import { RiCloseLargeFill } from "react-icons/ri";
import { closeTheSideBar } from "../redux-slicers/sideBarSlice";
import SideBarCategory from "./SideBarCategory";
const SideBar = () => {
    const status = useSelector((state) => state.sidebar.isOpen);
    const dispatch = useDispatch();
    // console.log("Side bar render " + status);
    const FAKE_DATA = [
        [
            {
                title: "Movies",
            },
            { title: "Videos" },
            { title: "Books" },
        ],
        [
            { title: "Software Engineering" },
            { title: "Computer Network" },
            { title: "Procedures" },
        ],
    ];

    const handleClose = () => {
        dispatch(closeTheSideBar());
    };

    return (
        <>
            <div className="trim-background">
                <div className="side-bar-container">
                    <div className="side-bar-header">
                        Categories
                        <div
                            className="close-button-wrapper"
                            onClick={handleClose}
                        >
                            <RiCloseLargeFill id="sidebar-close-button" />
                        </div>
                    </div>
                    <div className="side-bar-body">
                        <SideBarCategory
                            categoryName="Entertainment"
                            itemArray={FAKE_DATA[0]}
                        ></SideBarCategory>
                        <SideBarCategory
                            categoryName="School"
                            itemArray={FAKE_DATA[1]}
                        ></SideBarCategory>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
