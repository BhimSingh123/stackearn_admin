import React, { useState } from "react";
import LoginImg from "../../assert/login-img.png";
import logo from "../../assert/logo.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import { IoMdArrowRoundBack } from "react-icons/io";

const ForgotPassword = () => {
  const [Regs, setRegs] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setRegs((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!Regs.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Regs.email)) {
      formErrors.email = "Invalid email format";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleForms = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (loading) return;
    setLoading(true);

    const main = new Listing();
    try {
      const response = await main.forgetpassword({ email: Regs.email });
      if (response?.data?.status) {
        toast.success(response.data.message);
        setRegs({ email: "" });
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
            <div className="mb-3">
              <label className="form-control-label">Email</label>
              <input
                type="email"
                name="email"
                value={Regs.email}
                onChange={handleInputs}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email address"
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="d-grid">
              <button className="login-head button mt-2 mb-5  " type="submit" disabled={loading}>
                {loading ? "Loading..." : "SUBMIT"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
