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
import Swal from "sweetalert2";

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

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please check the form for errors.",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    // check if user already exist with this email show error
    const users = storage.getUsers();
    if (users.some((u) => u.email === formData.email)) {
      setErrors({ email: ["User already exists with this email"] });
      Swal.fire({
        icon: "warning",
        title: "Registration Failed",
        text: "User already exists with this email address.",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    // save data in localstorage on submit
    storage.saveUser(formData);

    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "Welcome back to the Student Portal. Please log in to continue.",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <MDBContainer className="max-w-5xl ui-card">
        <MDBRow className="g-0">
          <MDBCol md="6" className="hidden md:block">
            <div className="h-full premium-gradient p-12 flex flex-col justify-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-80 h-80 surface-blob rounded-full -ml-40 -mt-40 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full -mr-40 -mb-40 blur-3xl"></div>

              <h3 className="text-4xl font-extrabold mb-6 leading-tight relative z-10">
                Begin Your <br />
                Academic Journey.
              </h3>
              <p className="text-lg opacity-80 leading-relaxed mb-10 relative z-10">
                Create your student portal account to access courses, grades,
                schedules, and university updates in one place.
              </p>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                {[
                  { label: "24/7", sub: "Portal Access" },
                  { label: "Secure", sub: "Data Storage" },
                  { label: "Fast", sub: "Onboarding" },
                  { label: "Smart", sub: "Tracking" },
                ].map((stat, idx) => (
                  <div key={idx} className="glass-badge p-4 rounded-2xl">
                    <p className="text-2xl font-bold leading-none mb-1">
                      {stat.label}
                    </p>
                    <p className="text-xs font-medium opacity-60 uppercase tracking-widest">
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </MDBCol>

          <MDBCol md="6" className="p-8 md:p-12">
            <div className="flex flex-col h-full max-w-sm mx-auto justify-center">
              <div className="mb-10">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  className="w-16 mb-6"
                  alt="logo"
                />
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Create Account
                </h2>
                <p className="text-slate-500 font-medium">
                  Register with your student details.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <MDBInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    name="fullName"
                    type="text"
                    size="lg"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`input-field ${errors.fullName ? "border-red-500" : ""}`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1 font-bold">
                      {errors.fullName[0]}
                    </p>
                  )}
                </div>

                <div>
                  <MDBInput
                    label="Email address"
                    placeholder="Enter your university email"
                    name="email"
                    type="email"
                    size="lg"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 font-bold">
                      {errors.email[0]}
                    </p>
                  )}
                </div>

                <div>
                  <MDBInput
                    label="Password"
                    placeholder="Create your password"
                    name="password"
                    type="password"
                    size="lg"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input-field ${errors.password ? "border-red-500" : ""}`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 font-bold">
                      {errors.password[0]}
                    </p>
                  )}
                </div>

                <div>
                  <MDBInput
                    label="Student ID"
                    placeholder="Enter your student ID"
                    name="studentId"
                    type="text"
                    size="lg"
                    value={formData.studentId}
                    onChange={handleChange}
                    className={`input-field ${errors.studentId ? "border-red-500" : ""}`}
                  />
                  {errors.studentId && (
                    <p className="text-red-500 text-xs mt-1 font-bold">
                      {errors.studentId[0]}
                    </p>
                  )}
                </div>

                <MDBBtn type="submit" className="ui-btn-primary mt-2">
                  Sign Up
                </MDBBtn>
              </form>

              <div className="mt-12 text-center pt-8 border-t border-slate-100">
                <p className="text-slate-500 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Signup;
