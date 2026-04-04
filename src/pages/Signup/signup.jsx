import React, { useState } from "react";
import { MDBBtn, MDBContainer, MDBInput } from "mdb-react-ui-kit";
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 md:p-12">
      <MDBContainer className="max-w-6xl ui-card flex flex-col md:flex-row h-full min-h-175">
        {/* Left Side: Modern Form */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-12">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 shadow-sm">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                className="w-10 object-contain"
                alt="logo"
              />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase">
              Join Student Portal
            </h2>
            <p className="text-slate-500 font-bold tracking-tight text-lg">
              Your path to academic success starts here.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">
                  Full Name
                </label>
                <MDBInput
                  label="Full Name"
                  placeholder="e.g. Syed Muhammad Ali"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`input-field ${errors.fullName ? "border-red-500" : ""}`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-[10px] mt-1.5 font-bold uppercase tracking-wider">
                    {errors.fullName[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">
                  Email address
                </label>
                <MDBInput
                  label="Email address"
                  placeholder="e.g. ali.student@university.edu"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-[10px] mt-1.5 font-bold uppercase tracking-wider">
                    {errors.email[0]}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">
                    Password
                  </label>
                  <MDBInput
                    label="Password"
                    placeholder="Create a strong password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input-field ${errors.password ? "border-red-500" : ""}`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-[10px] mt-1.5 font-bold uppercase tracking-wider">
                      {errors.password[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">
                    Student ID
                  </label>
                  <MDBInput
                    label="Student ID"
                    placeholder="e.g. ST-2026-001"
                    name="studentId"
                    type="text"
                    value={formData.studentId}
                    onChange={handleChange}
                    className={`input-field ${errors.studentId ? "border-red-500" : ""}`}
                  />
                  {errors.studentId && (
                    <p className="text-red-500 text-[10px] mt-1.5 font-bold uppercase tracking-wider">
                      {errors.studentId[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <MDBBtn type="submit" className="btn-primary mt-6">
              Create My Account
            </MDBBtn>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm font-bold">
              Membership already registered?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-extrabold hover:text-blue-800 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Features/Banner */}
        <div className="hidden md:flex w-1/2 premium-gradient p-16 flex-col justify-center text-white relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full -ml-48 -mb-48 blur-[100px]"></div>

          <div className="relative z-10 max-w-sm">
            <h3 className="text-5xl font-black mb-8 leading-[1.1] tracking-tighter">
              Empowering <br />
              Students.
            </h3>
            <p className="text-xl opacity-80 leading-relaxed mb-12 font-medium">
              Access everything you need to navigate your academic journey with
              confidence and ease.
            </p>

            <div className="space-y-8">
              {[
                {
                  icon: "🚀",
                  title: "Smart Progress",
                  sub: "Track your academic performance in real-time.",
                },
                {
                  icon: "🛡️",
                  title: "Secure Access",
                  sub: "Your personal data is encrypted and protected.",
                },
                {
                  icon: "💬",
                  title: "Faculty Link",
                  sub: "Direct communication with your course instructors.",
                },
              ].map((feat, idx) => (
                <div key={idx} className="flex gap-5 group items-start">
                  <div className="bg-white/10 w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center text-2xl backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all group-hover:scale-110">
                    {feat.icon}
                  </div>
                  <div>
                    <p className="font-black text-lg mb-0.5">{feat.title}</p>
                    <p className="text-sm opacity-60 font-medium leading-snug">
                      {feat.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
};

export default Signup;
