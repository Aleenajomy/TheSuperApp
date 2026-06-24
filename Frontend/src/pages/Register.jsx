import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import leftBanner from "../assets/register_left_banner.png";

const Register = () => {
  return (
    <div className="register-page">
      <div className="register-left">
        <img src={leftBanner} alt="Superapp banner" className="banner-img" />
        <div className="banner-overlay-text">
          <h1>Discover new things on Superapp</h1>
        </div>
      </div>
      <div className="register-right">
        <div className="register-form-container">
          <h1 className="brand-logo">Super app</h1>
          <h2 className="form-title">Create your new account</h2>

          <RegistrationForm />

          <p className="terms-disclaimer">
            By clicking on Sign up, you agree to Superapp{" "}
            <span className="highlight">Terms and Conditions of Use</span>
          </p>
          <p className="privacy-disclaimer">
            To learn more about how Superapp collects, uses, shares and protects your
            personal data please head to Superapp <span className="highlight">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
