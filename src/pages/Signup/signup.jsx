import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { signupSchema } from "../../utils/validation";
import { storage } from "../../utils/storage";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    studentId: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      return;
    }

    // Check if user already exists
    const users = storage.getUsers();
    if (users.some((u) => u.email === formData.email)) {
      setErrors({ email: ["User already exists with this email"] });
      return;
    }

    storage.saveUser(formData);
    navigate("/login");
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{ width: "185px" }}
                alt="logo"
              />
              <h4 className="mt-1 mb-5 pb-1">Join the Student Portal</h4>
            </div>

            <p>Create your student account below</p>

            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperClass="mb-1"
                label="Full Name"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <div className="text-danger small mb-3">{errors.fullName[0]}</div>}

              <MDBInput
                wrapperClass="mb-1"
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="text-danger small mb-3">{errors.email[0]}</div>}

              <MDBInput
                wrapperClass="mb-1"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="text-danger small mb-3">{errors.password[0]}</div>}

              <MDBInput
                wrapperClass="mb-1"
                label="Student ID"
                name="studentId"
                type="text"
                value={formData.studentId}
                onChange={handleChange}
              />
              {errors.studentId && <div className="text-danger small mb-3">{errors.studentId[0]}</div>}

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn type="submit" className="mb-4 w-100 gradient-custom-2">
                  Sign Up
                </MDBBtn>
              </div>
            </form>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Already have an account?</p>
              <Link to="/login" className="mx-2 text-primary font-bold">
                Log In
              </Link>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4 rounded-r-lg">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4 text-2xl font-bold">Empowering Students Through Technology</h4>
              <p className="small mb-0 leading-relaxed">
                Welcome to our student portal! This platform is designed to help you manage your studies, 
                track your progress, and stay updated with the latest university announcements. 
                Join our community today and take control of your academic journey.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;
