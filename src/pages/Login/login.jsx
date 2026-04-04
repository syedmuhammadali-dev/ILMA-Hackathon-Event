import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "../../utils/validation";
import { storage } from "../../utils/storage";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      return;
    }

    const user = storage.authenticateUser(formData.email, formData.password);
    if (user) {
      navigate("/");
    } else {
      setErrors({ general: "Invalid email or password" });
    }
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
              <h4 className="mt-1 mb-5 pb-1">Welcome Back!</h4>
            </div>

            <p>Please login to your student account</p>

            <form onSubmit={handleSubmit}>
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

              {errors.general && <div className="text-danger small mb-3 text-center">{errors.general}</div>}

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn type="submit" className="mb-4 w-100 gradient-custom-2">
                  Log In
                </MDBBtn>
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </div>
            </form>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <Link to="/signup" className="mx-2 text-primary font-bold">
                Join Now
              </Link>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4 rounded-r-lg">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4 text-2xl font-bold">Your Gateway to Knowledge</h4>
              <p className="small mb-0 leading-relaxed">
                Log in to access your dashboard, view your grades, and communicate with your instructors. 
                Keep track of your academic performance and never miss an update from your university.
                Stay focused, stay driven!
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
