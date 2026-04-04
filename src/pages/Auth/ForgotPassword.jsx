import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate, Link } from "react-router-dom";
import { forgotPasswordSchema } from "../../utils/validation";
import { storage } from "../../utils/storage";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.flatten().fieldErrors.email[0]);
      return;
    }

    const user = storage.findUserByEmail(email);
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "User Not Found",
        text: "No account associated with this email address.",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Reset Link 'Sent'",
      text: "We've simulated sending a reset link to your email. Redirecting you to the reset page.",
      timer: 3000,
      showConfirmButton: false,
    }).then(() => {
      navigate(`/reset-password?email=${email}`);
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
                Recover Your <br />
                Account Access.
              </h3>
              <p className="text-lg opacity-80 leading-relaxed mb-10 relative z-10">
                Enter your registered email and we will guide you to set a new
                password securely.
              </p>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                {[
                  { label: "Quick", sub: "Recovery" },
                  { label: "Safe", sub: "Verification" },
                  { label: "Simple", sub: "Steps" },
                  { label: "Secure", sub: "Process" },
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
                  Forgot Password
                </h2>
                <p className="text-slate-500 font-medium">
                  Enter your email to continue.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <MDBInput
                    label="Email address"
                    placeholder="Enter your university email"
                    type="email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input-field ${error ? "border-red-500" : ""}`}
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-1 font-bold">{error}</p>
                  )}
                </div>

                <MDBBtn type="submit" className="ui-btn-primary mt-2">
                  Send Reset Link
                </MDBBtn>
              </form>

              <div className="mt-12 text-center pt-8 border-t border-slate-100">
                <Link
                  to="/login"
                  className="text-blue-600 font-bold hover:underline text-sm"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ForgotPassword;
