import React, { useState } from "react";
import LoginImg from "../../assert/login-img.png";
import logo from "../../assert/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import FeatherIcon from "feather-icons-react";
import Listing from "../Api/Listing";
import { IoMdArrowRoundBack } from "react-icons/io";


const NewPassword = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordType1, setPasswordType1] = useState("password");

  const { token } = useParams();
  const [Regs, setRegs] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setRegs((prevState) => ({ ...prevState, [name]: value }));
  };

  const togglePassword = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const togglePassword1 = () => {
    setPasswordType1((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleForms = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (Regs.newPassword !== Regs.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!Regs?.newPassword || Regs.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (!Regs?.confirmPassword || Regs.confirmPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);

    const requestData = { ...Regs, token };
    const main = new Listing();

    try {
      const response = await main.forget(requestData);
      if (response?.data?.status) {
        toast.success(response.data.message);
        setRegs({ token: "", newPassword: "", confirmPassword: "" });
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-2" style={{ minHeight: "100vh" }}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center login-bg">
          <div className="owl-carousel login-slide owl-theme">
            <div className="welcome-login text-center">
              <div className="login-banner mb-3">
                <img src={LoginImg} className="img-fluid" alt="Logo" />
              </div>
              <div className="mentor-course px-3">
                <h2>Welcome to DreamsLMS Courses.</h2>
                <p>Forgot your password? No worries — we’ve got your back! Just enter your registered email, We’ve sent a reset link to your email & we’ll help you reset it quickly. Stay secure, stay connected with StackEarn.</p>
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
          <h3 className="mb-3 text-center">Forgot Password?</h3>
          <form onSubmit={handleForms}>

            {/* New Password */}
            <div className="input-block mb-3 position-relative">
              <label className="form-control-label">Password</label>
              <input
                className="form-control"
                name="newPassword"
                required
                type={passwordType}
                placeholder="Enter your password"
                value={Regs.newPassword}
                onChange={handleInputs}
                style={{ paddingRight: "40px" }}
              />
              <span
                onClick={togglePassword}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "38px",
                  right: "10px",
                  userSelect: "none",
                }}
              >
                {passwordType === "password" ? (
                  <FeatherIcon icon="eye-off" />
                ) : (
                  <FeatherIcon icon="eye" />
                )}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="input-block mb-3 position-relative">
              <label className="form-control-label">Confirm Password</label>
              <input
                type={passwordType1}
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={Regs.confirmPassword}
                required
                onChange={handleInputs}
                style={{ paddingRight: "40px" }}
              />
              <span
                onClick={togglePassword1}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "38px",
                  right: "10px",
                  userSelect: "none",
                }}
              >
                {passwordType1 === "password" ? (
                  <FeatherIcon icon="eye-off" />
                ) : (
                  <FeatherIcon icon="eye" />
                )}
              </span>
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button
                className="login-head button mt-2 mb-5"
                type="submit"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default NewPassword;
