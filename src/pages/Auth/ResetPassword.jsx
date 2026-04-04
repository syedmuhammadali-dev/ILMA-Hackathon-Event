import React, { useState, useEffect } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordSchema } from "../../utils/validation";
import { storage } from "../../utils/storage";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = resetPasswordSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      return;
    }

    const success = storage.resetPassword(email, formData.password);
    if (success) {
      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: "Your password has been successfully reset. Please log in with your new password.",
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/login");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <MDBContainer className="max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100 shadow-sm">
             <span className="text-2xl text-blue-600">🆕</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Set New Password</h2>
          <p className="text-slate-500 font-medium mt-2">Create a secure password for your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <MDBInput
              label="New Password"
              placeholder="Enter at least 6 characters"
              name="password"
              type="password"
              size="lg"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.password[0]}</p>}
          </div>

          <div>
            <MDBInput
              label="Confirm New Password"
              placeholder="Repeat your new password"
              name="confirmPassword"
              type="password"
              size="lg"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.confirmPassword[0]}</p>}
          </div>

          <MDBBtn type="submit" className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-100">
            Reset Password
          </MDBBtn>
        </form>
      </MDBContainer>
    </div>
  );
};

export default ResetPassword;
