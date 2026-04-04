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
      <MDBContainer className="max-w-md ui-card p-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100 shadow-sm">
            <span className="text-2xl text-blue-600">🔑</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Forgot Password?
          </h2>
          <p className="text-slate-500 font-medium mt-2">
            Enter your email to reset your account password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <MDBInput
              label="Email Address"
              placeholder="e.g. ali.student@university.edu"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input-field ${error ? "border-red-500" : ""}`}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1.5 font-bold">{error}</p>
            )}
          </div>

          <MDBBtn type="submit" className="ui-btn-primary">
            Send Reset Instructions
          </MDBBtn>
        </form>

        <div className="mt-8 text-center pt-8 border-t border-slate-50">
          <Link
            to="/login"
            className="text-blue-600 font-bold hover:underline text-sm"
          >
            Return to Login
          </Link>
        </div>
      </MDBContainer>
    </div>
  );
};

export default ForgotPassword;
