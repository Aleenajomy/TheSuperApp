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
    <form onSubmit={handleFormSubmission} className="register-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          className={errors.name ? "error-input" : ""}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Username"
          className={errors.username ? "error-input" : ""}
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        {errors.username && <span className="error-text">{errors.username}</span>}
      </div>

      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          className={errors.email ? "error-input" : ""}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Mobile"
          className={errors.mobile ? "error-input" : ""}
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        />
        {errors.mobile && <span className="error-text">{errors.mobile}</span>}
      </div>

      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.shareData}
            onChange={(e) => setFormData({ ...formData, shareData: e.target.checked })}
          />
          <span className="checkbox-text">
            Share my registration data with Superapp
          </span>
        </label>
        {errors.shareData && <span className="error-text">{errors.shareData}</span>}
      </div>

      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
          />
          <span className="checkbox-text">
            Agree to the terms and conditions of signing up
          </span>
        </label>
        {errors.agreeTerms && <span className="error-text">{errors.agreeTerms}</span>}
      </div>

      <button type="submit" className="submit-btn">
        SIGN UP
      </button>
    </form>
  );
};

export default RegistrationForm;
