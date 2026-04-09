import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPasswordSchema } from "../../utils/validation";
import { storage } from "../../utils/storage";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Particles from "../../components/UI/Particles";

const Spinner = () => (
  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.flatten().fieldErrors.email?.[0] || "Invalid email.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const user = storage.findUserByEmail(email);
    setLoading(false);

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Not Found",
        text: "No account is associated with this email address.",
        confirmButtonColor: "#6366f1",
        background: "#0f172a",
        color: "#e2e8f0",
        customClass: { popup: "rounded-2xl" },
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Reset Link Sent",
      text: "Redirecting you to reset your password…",
      timer: 2500,
      showConfirmButton: false,
      background: "#0f172a",
      color: "#e2e8f0",
      customClass: { popup: "rounded-2xl" },
    }).then(() => {
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    });
  };

  return (
    <div className="auth-page relative flex items-center justify-center p-6 overflow-hidden">

      {/* Blobs */}
      <div className="auth-blob-1" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.30) 0%, transparent 70%)" }} />
      <div className="auth-blob-2" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)" }} />
      <div className="auth-blob-3" />

      {/* Particles */}
      <div className="auth-particles absolute inset-0 z-0">
        <Particles count={45} />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="auth-glass-card rounded-3xl p-10 md:p-12">

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/10"
            style={{ background: "rgba(6,182,212,0.15)", backdropFilter: "blur(8px)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" style={{ color: "#06b6d4" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-5"
          >
            <h1 className="text-3xl font-black text-white-force tracking-tight mb-2">
              Forgot Password?
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
              Enter your registered email and we'll send you a password reset link.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <label className="auth-label">Email Address</label>
              <input
                id="forgot-email"
                type="email"
                autoComplete="email"
                placeholder="yourname@ilmauniversity.edu"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className={`auth-input${error ? " has-error" : ""}`}
              />
              {error && (
                <p className="mt-1.5 text-xs font-semibold text-red-400">⚠ {error}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="auth-btn"
            >
              {loading ? (
                <><Spinner /> Sending…</>
              ) : (
                <>
                  Send Reset Link
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Back to login */}
          <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-bold transition-colors hover:underline underline-offset-2"
              style={{ color: "#6366f1" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back to Login
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
