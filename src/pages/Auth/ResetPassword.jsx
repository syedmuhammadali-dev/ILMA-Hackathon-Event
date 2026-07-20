import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { resetPasswordSchema } from "../../utils/validation";
import { storage } from "../../utils/storage";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Particles from "../../components/UI/Particles";
import { getTranslation } from "../../utils/linguaEngine";

/* ── Eye icons ── */
const EyeOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeClosed = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

/* ── Password strength helper ── */
const getStrength = (pw) => {
  if (!pw) return { level: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: getTranslation("auth_pw_weak"), color: "#f87171" };
  if (score <= 3) return { level: 2, label: getTranslation("auth_pw_fair"), color: "#fb923c" };
  if (score === 4) return { level: 3, label: getTranslation("auth_pw_good"), color: "#facc15" };
  return { level: 4, label: getTranslation("auth_pw_strong"), color: "#34d399" };
};

/* ── Main Component ── */
const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCp, setShowCp] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = resetPasswordSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const success = storage.resetPassword(email, formData.password);
    setLoading(false);

    if (success) {
      Swal.fire({
        icon: "success",
        title: getTranslation("auth_password_updated"),
        text: getTranslation("auth_password_reset_text"),
        timer: 2500,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#e2e8f0",
        customClass: { popup: "rounded-2xl" },
      }).then(() => navigate("/login"));
    } else {
      Swal.fire({
        icon: "error",
        title: getTranslation("auth_reset_failed"),
        text: getTranslation("auth_reset_failed_text"),
        confirmButtonColor: "#6366f1",
        background: "#0f172a",
        color: "#e2e8f0",
        customClass: { popup: "rounded-2xl" },
      });
    }
  };

  const strength = getStrength(formData.password);
  const ic = (err) => `auth-input${err ? " has-error" : ""}`;

  return (
    <div className="auth-page relative flex items-center justify-center p-6 overflow-hidden">

      {/* ── Blobs ── */}
      <div className="auth-blob-1" style={{ background: "radial-gradient(circle, rgba(52,211,153,0.25) 0%, transparent 70%)" }} />
      <div className="auth-blob-2" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)" }} />
      <div className="auth-blob-3" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)" }} />

      {/* ── Particles ── */}
      <div className="auth-particles absolute inset-0 z-0">
        <Particles count={45} />
      </div>

      {/* ── Card ── */}
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
            style={{ background: "rgba(52,211,153,0.12)", backdropFilter: "blur(8px)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" style={{ color: "#34d399" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
              {getTranslation("auth_reset_heading")}
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
              {getTranslation("auth_reset_subtitle_prefix")}{" "}
              <span style={{ color: "#06b6d4", fontWeight: 700 }}>{email}</span>
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
            {/* New password */}
            <div>
              <label className="auth-label">{getTranslation("auth_new_password_label")}</label>
              <div className="relative">
                <input
                  id="reset-password"
                  type={showPw ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder={getTranslation("auth_new_password_placeholder")}
                  value={formData.password}
                  onChange={handleChange}
                  className={ic(errors.password)}
                  style={{ paddingRight: "48px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: showPw ? "#06b6d4" : "rgba(148,163,184,0.6)" }}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOpen /> : <EyeClosed />}
                </button>
              </div>

              {/* Strength bar */}
              {formData.password && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((seg) => (
                      <div
                        key={seg}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background: strength.level >= seg ? strength.color : "rgba(255,255,255,0.08)",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] font-bold" style={{ color: strength.color }}>
                    {strength.label} {getTranslation("auth_pw_suffix")}
                  </p>
                </div>
              )}

              {errors.password && (
                <p className="mt-1.5 text-xs font-semibold text-red-400">⚠ {errors.password[0]}</p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="auth-label">{getTranslation("auth_confirm_password_label")}</label>
              <div className="relative">
                <input
                  id="reset-confirm-password"
                  type={showCp ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder={getTranslation("auth_confirm_password_placeholder")}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={ic(errors.confirmPassword)}
                  style={{ paddingRight: "48px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowCp((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: showCp ? "#06b6d4" : "rgba(148,163,184,0.6)" }}
                  aria-label={showCp ? "Hide confirm password" : "Show confirm password"}
                >
                  {showCp ? <EyeOpen /> : <EyeClosed />}
                </button>
              </div>

              {/* Match indicator */}
              {formData.confirmPassword && formData.password && (
                <p
                  className="mt-1.5 text-[11px] font-bold"
                  style={{
                    color: formData.password === formData.confirmPassword
                      ? "#34d399"
                      : "#f87171",
                  }}
                >
                  {formData.password === formData.confirmPassword
                    ? getTranslation("auth_passwords_match")
                    : getTranslation("auth_passwords_no_match")}
                </p>
              )}

              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs font-semibold text-red-400">⚠ {errors.confirmPassword[0]}</p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="auth-btn"
              style={{
                background: "linear-gradient(135deg, #059669 0%, #06b6d4 100%)",
                boxShadow: "0 8px 24px rgba(5,150,105,0.30)",
              }}
            >
              {loading ? (
                <><Spinner /> {getTranslation("auth_updating")}</>
              ) : (
                <>
                  {getTranslation("auth_reset_password_btn")}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              {getTranslation("auth_back_to_login")}
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

