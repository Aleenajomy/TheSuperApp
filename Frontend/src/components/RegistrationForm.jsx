import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const RegistrationForm = () => {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    shareData: false,
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (!formData.name.trim()) {
      tempErrors.name = "Field is required";
    } else if (/[^a-zA-Z\s]/.test(formData.name)) {
      tempErrors.name = "Name must only contain alphabets";
    }

    if (!formData.username.trim()) {
      tempErrors.username = "Field is required";
    } else if (/\s/.test(formData.username)) {
      tempErrors.username = "Username cannot contain spaces";
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Field is required";
    } else if (!emailPattern.test(formData.email)) {
      tempErrors.email = "Please input a valid email address";
    }

    if (!formData.mobile.trim()) {
      tempErrors.mobile = "Field is required";
    } else if (!phonePattern.test(formData.mobile)) {
      tempErrors.mobile = "Phone number must be exactly 10 digits";
    }

    if (!formData.shareData) {
      tempErrors.shareData = "Check this box if you want to proceed";
    }

    if (!formData.agreeTerms) {
      tempErrors.agreeTerms = "Check this box if you want to proceed";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
      });
      navigate("/categories");
    }
  };

  return (
    <form onSubmit={handleFormSubmission} className="register-form w-100">
      <div className="form-group mb-3">
        <input
          type="text"
          placeholder="Name"
          className={`form-control form-control-lg bg-dark text-white border-secondary ${errors.name ? "is-invalid" : ""}`}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <div className="invalid-feedback text-start">{errors.name}</div>}
      </div>

      <div className="form-group mb-3">
        <input
          type="text"
          placeholder="Username"
          className={`form-control form-control-lg bg-dark text-white border-secondary ${errors.username ? "is-invalid" : ""}`}
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        {errors.username && <div className="invalid-feedback text-start">{errors.username}</div>}
      </div>

      <div className="form-group mb-3">
        <input
          type="email"
          placeholder="Email"
          className={`form-control form-control-lg bg-dark text-white border-secondary ${errors.email ? "is-invalid" : ""}`}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <div className="invalid-feedback text-start">{errors.email}</div>}
      </div>

      <div className="form-group mb-3">
        <input
          type="text"
          placeholder="Mobile"
          className={`form-control form-control-lg bg-dark text-white border-secondary ${errors.mobile ? "is-invalid" : ""}`}
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        />
        {errors.mobile && <div className="invalid-feedback text-start">{errors.mobile}</div>}
      </div>

      <div className="form-check text-start mb-3">
        <input
          type="checkbox"
          id="shareDataCheckbox"
          className={`form-check-input bg-dark border-secondary ${errors.shareData ? "is-invalid" : ""}`}
          checked={formData.shareData}
          onChange={(e) => setFormData({ ...formData, shareData: e.target.checked })}
        />
        <label className="form-check-label text-secondary small" htmlFor="shareDataCheckbox">
          Share my registration data with Superapp
        </label>
        {errors.shareData && <div className="invalid-feedback text-start d-block">{errors.shareData}</div>}
      </div>

      <div className="form-check text-start mb-3">
        <input
          type="checkbox"
          id="agreeTermsCheckbox"
          className={`form-check-input bg-dark border-secondary ${errors.agreeTerms ? "is-invalid" : ""}`}
          checked={formData.agreeTerms}
          onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
        />
        <label className="form-check-label text-secondary small" htmlFor="agreeTermsCheckbox">
          Agree to the terms and conditions of signing up
        </label>
        {errors.agreeTerms && <div className="invalid-feedback text-start d-block">{errors.agreeTerms}</div>}
      </div>

      <button type="submit" className="btn btn-success w-100 rounded-pill py-3 fw-bold mt-2 text-uppercase">
        SIGN UP
      </button>
    </form>
  );
};

export default RegistrationForm;
