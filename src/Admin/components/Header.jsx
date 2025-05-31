import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import StudentSidebar from "../sidebar/index";

const Header = ({ onopen }) => {

    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        document.body?.classList?.remove("menu-opened");
        return () => {
            document.body.className = "";
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [navbar, setNavbar] = useState(false);

    const changeHeaderBackground = () => {
        if (window.scrollY >= 90) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    window.addEventListener("scroll", changeHeaderBackground);

    // Dummy User Data (Agar API se data aata hai to props se pass kar sakte ho)

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handledata() {
        setIsClicked(!isClicked);
    }

    const loginUser = localStorage.getItem('token');
    return (
        <>
            <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-light border-bottom shadow-sm">
                <h4 className="m-0">StackEarn Admin</h4>
                <button className="btn btn-danger btn-sm">Logout</button>
            </div>

        </>
    );
};

export default Header;