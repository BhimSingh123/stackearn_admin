import logo from "../../assert/logo.png";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import { IoMdArrowRoundBack } from "react-icons/io";
import LoginImg from "../../assert/login-img.png";

const Login = () => {

    const [passwordType, setPasswordType] = useState("password");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const [Regs, setRegs] = useState({
        email: "",
        password: "",
        role: "admin"
    });

    const validateForm = () => {
        let formErrors = {};
        if (!Regs.email) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(Regs.email)) {
            formErrors.email = "Invalid email format";
        }
        if (!Regs.password) {
            formErrors.password = "Password is required";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    const handleInputs = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setRegs((prevState) => ({ ...prevState, [name]: value }));
    };


    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const navigate = useNavigate();
    const handleForms = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (loading) return;
        setLoading(true);
        const main = new Listing();
        try {
            const response = await main.adminlogin(Regs);
            if (response?.data?.status) {
                toast.success(response.data.message);
                setRegs({
                    email: "",
                    password: "",
                    name: "",
                    refral_code: "",
                    role: "",
                    phone_number: ""
                })
                localStorage.setItem("AdminToken", response?.data?.token);
                navigate("/admin/dashboard")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("error", error)
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="container py-5" style={{ minHeight: "100vh" }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                    <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center login-bg">
                        <div className="owl-carousel login-slide owl-theme">
                            <div className="welcome-login text-center">
                                <div className="login-banner mb-3">
                                    <img src={LoginImg} className="img-fluid" alt="Logo" />
                                </div>
                                <div className="mentor-course px-3">
                                    <h2>Welcome to DreamsLMS Courses.</h2>
                                    <p>Continue your journey where StackEarn learning meets earning.

                                        Log in to access your dashboard, track your progress, and keep building the future you deserve!.</p>
                                </div>
                            </div>
                            {/* Add more slides if needed */}
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <img src={logo} className="img-fluid" style={{ maxHeight: "60px" }} alt="Logo" />
                            <Link to="/" className="text-decoration-none d-flex align-items-center" style={{ gap: "6px" }}>
                                <IoMdArrowRoundBack size={20} />
                                Back to Home
                            </Link>
                        </div>
                        <h3 className="mb-3 text-center">Sign into Your Account?</h3>
                        <form onSubmit={handleForms}>
                            {/* Email Field */}
                            <div className="mb-3">
                                <label className="form-control-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={Regs.email}
                                    onChange={handleInputs}
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    placeholder="Enter your email address"
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            {/* Password Field */}
                            <div className="mb-3">
                                <label className="form-control-label">Password</label>
                                <div className="input-group">
                                    <input
                                        type={passwordType}
                                        name="password"
                                        required
                                        value={Regs.password}
                                        onChange={handleInputs}
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={togglePassword}
                                        tabIndex={-1}
                                    >
                                        {passwordType === "password" ? (
                                            <FeatherIcon icon="eye-off" />
                                        ) : (
                                            <FeatherIcon icon="eye" />
                                        )}
                                    </button>
                                    {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                                </div>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="mb-3 text-end">
                                <Link className="text-decoration-none" to="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <div className="d-grid">
                                <button className="login-head button cursor-pointer"
                                    type="submit" disabled={loading}>
                                    {loading ? "Submitting..." : "Sign In"}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>


        </>
    );
};

export default Login;
