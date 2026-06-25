import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import leftBanner from "../assets/register_left_banner.png";

const Register = () => {
  return (
    <div className="register-page container-fluid p-0 d-flex flex-column flex-md-row min-vh-100">
      <div className="register-left col-12 col-md-6 position-relative overflow-hidden" style={{ minHeight: "35vh" }}>
        <img src={leftBanner} alt="Superapp banner" className="banner-img w-100 h-100 object-fit-cover" />
        <div className="banner-overlay-text position-absolute bottom-0 start-0 w-100 p-4 p-md-5 bg-gradient-to-t">
          <h1 className="display-4 fw-bold text-white mb-0">Discover new things on Superapp</h1>
        </div>
      </div>
      <div className="register-right col-12 col-md-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-black">
        <div className="register-form-container w-100" style={{ maxWidth: "440px" }}>
          <h1 className="brand-logo text-start">Super app</h1>
          <h2 className="form-title text-start fs-5 mb-4 text-white">Create your new account</h2>

          <RegistrationForm />

          <p className="terms-disclaimer text-secondary mt-4 mb-2 small">
            By clicking on Sign up, you agree to Superapp{" "}
            <span className="highlight text-success fw-medium cursor-pointer">Terms and Conditions of Use</span>
          </p>
          <p className="privacy-disclaimer text-secondary small">
            To learn more about how Superapp collects, uses, shares and protects your
            personal data please head to Superapp <span className="highlight text-success fw-medium cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
