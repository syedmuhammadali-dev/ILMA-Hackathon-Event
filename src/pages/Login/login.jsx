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
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter a valid email and password.",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    const user = storage.authenticateUser(formData.email, formData.password);
    if (user) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${user.fullName}!`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      }).then(() => {
        navigate("/");
      });
    } else {
      setErrors({ general: "Invalid email or password" });
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "The email or password you entered is incorrect.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <MDBContainer className="max-w-5xl ui-card">
        <MDBRow className="g-0">
          {/* Left Side: Modern Pattern & Info */}
          <MDBCol md="6" className="hidden md:block">
            <div className="h-full bg-linear-to-tr from-blue-700 to-indigo-900 p-12 flex flex-col justify-center text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full -ml-40 -mt-40 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full -mr-40 -mb-40 blur-3xl"></div>

              <h3 className="text-4xl font-extrabold mb-6 leading-tight relative z-10">
                Your Education, <br />
                Redefined.
              </h3>
              <p className="text-lg opacity-80 leading-relaxed mb-10 relative z-10">
                Access your personalized student portal to manage courses,
                grades, and academic appointments with ease.
              </p>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                {[
                  { label: "15k+", sub: "Active Students" },
                  { label: "200+", sub: "Expert Faculty" },
                  { label: "50+", sub: "Modern Labs" },
                  { label: "100%", sub: "Support" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10"
                  >
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

          {/* Right Side: Form */}
          <MDBCol md="6" className="p-8 md:p-12">
            <div className="flex flex-col h-full max-w-sm mx-auto justify-center">
              <div className="mb-10">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  className="w-16 mb-6"
                  alt="logo"
                />
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-slate-500 font-medium">
                  Log in to your student account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <div className="flex justify-between mb-1">
                    <label className="invisible text-xs">Password</label>
                    <Link
                      to="/forgot-password"
                      title="Click to reset password"
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <MDBInput
                    label="Password"
                    placeholder="Enter your password"
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

                <MDBBtn type="submit" className="btn-primary mt-2">
                  Sign In
                </MDBBtn>
              </form>

              <div className="mt-12 text-center pt-8 border-t border-slate-100">
                <p className="text-slate-500 text-sm">
                  New to our portal?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Create an account
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

export default Login;
