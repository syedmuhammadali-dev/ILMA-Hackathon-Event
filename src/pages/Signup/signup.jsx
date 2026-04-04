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

    storage.saveUser(formData);
    
    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "Welcome to the Student Portal. Please log in to continue.",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <MDBContainer className="max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        <MDBRow className="g-0">
          <MDBCol md="6" className="p-8 md:p-12">
            <div className="flex flex-col h-full">
              <div className="mb-8">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  className="w-16 mb-4"
                  alt="logo"
                />
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
                <p className="text-slate-500 font-medium">Join our academic community today.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <MDBInput
                    label="Full Name"
                    name="fullName"
                    type="text"
                    size="lg"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1 font-bold">{errors.fullName[0]}</p>}
                </div>

                <div>
                  <MDBInput
                    label="Email address"
                    name="email"
                    type="email"
                    size="lg"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email[0]}</p>}
                </div>

                <div>
                  <MDBInput
                    label="Password"
                    name="password"
                    type="password"
                    size="lg"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1 font-bold">{errors.password[0]}</p>}
                </div>

                <div>
                  <MDBInput
                    label="Student ID"
                    name="studentId"
                    type="text"
                    size="lg"
                    value={formData.studentId}
                    onChange={handleChange}
                    className={errors.studentId ? "border-red-500" : ""}
                  />
                  {errors.studentId && <p className="text-red-500 text-xs mt-1 font-bold">{errors.studentId[0]}</p>}
                </div>

                <MDBBtn type="submit" className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-100 text-sm tracking-wide mt-4">
                  Register Now
                </MDBBtn>
              </form>

              <div className="mt-auto pt-8 text-center">
                <p className="text-slate-500 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 font-bold hover:underline">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </MDBCol>

          <MDBCol md="6" className="hidden md:block">
            <div className="h-full bg-gradient-to-br from-blue-600 to-indigo-800 p-12 flex flex-col justify-center text-white relative overflow-hidden">
               {/* Background patterns */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

               <h3 className="text-4xl font-bold mb-6 leading-tight relative z-10">
                 Unlock Your Academic Potential.
               </h3>
               <p className="text-lg opacity-90 leading-relaxed mb-8 relative z-10">
                 Our portal provides everything you need to succeed. Track your grades, 
                 access study materials, and stay connected with your instructors all in one place.
               </p>
               
               <div className="space-y-4 relative z-10">
                 <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                   <div className="bg-white/20 p-2 rounded-lg">🚀</div>
                   <p className="font-medium">Real-time performance tracking</p>
                 </div>
                 <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                   <div className="bg-white/20 p-2 rounded-lg">📚</div>
                   <p className="font-medium">Direct access to course resources</p>
                 </div>
               </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Signup;
