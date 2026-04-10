import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupSchema } from "../../utils/validation";
import { storage } from "../../utils/storage";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Particles from "../../components/UI/Particles";
import Logo from "../../assets/Logo.png";

/* ── Eye toggle icons ── */
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

/* ── Main Component ── */
const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    studentId: "",
    profileImage: "",
  });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: null }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((p) => ({ ...p, profileImage: ["Image too large (max 2MB)"] }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((p) => ({ ...p, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    const users = storage.getUsers();
    if (users.some((u) => u.email === formData.email)) {
      setErrors({ email: ["An account with this email already exists."] });
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    storage.saveUser(formData);
    setLoading(false);

    Swal.fire({
      icon: "success",
      title: "Account Created!",
      text: "Welcome to ILMA Student Portal.",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: "#0f172a",
      color: "#e2e8f0",
      customClass: { popup: "rounded-2xl" },
    }).then(() => navigate("/login"));
  };

  const ic = (err) => `auth-input${err ? " has-error" : ""}`;

  return (
    <div className="auth-page relative flex items-center justify-center p-6 py-10 overflow-hidden">

      {/* ── Animated background blobs ── */}
      <div className="auth-blob-1" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)" }} />
      <div className="auth-blob-2" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.22) 0%, transparent 70%)" }} />
      <div className="auth-blob-3" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)" }} />

      {/* ── Floating particles ── */}
      <div className="auth-particles absolute inset-0 z-0">
        <Particles count={60} />
      </div>

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="auth-glass-card rounded-3xl overflow-hidden flex min-h-[620px]">

          {/* ── Left panel ── */}
          <div
            className="hidden lg:flex w-[42%] flex-col justify-between relative p-12 overflow-hidden"
            style={{ background: "linear-gradient(155deg, rgba(139,92,246,0.16) 0%, rgba(6,182,212,0.08) 100%)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-400/20 to-transparent" />

            {/* Logo + heading */}
            <div className="relative z-10 mb-8">
              <div className="w-24 h-24 mb-6 relative">
                <div className="absolute inset-0 bg-violet-400/20 blur-[30px] rounded-full animate-pulse" />
                <img src={Logo} alt="Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.4)] relative z-10" />
              </div>

              <h2 className="text-3xl font-black text-white-force leading-tight mb-3">
                Join ILMA <br />
                <span style={{ color: "#a78bfa" }}>Hackathon 2026</span>
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>
                Create your student account and get instant access to all university resources, events, and more.
              </p>
            </div>

            {/* Feature chips */}
            <div className="space-y-3 z-10 relative">
              {[
                { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-violet-400"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, label: "Instant Access on Sign Up" },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-violet-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>, label: "Secure & Encrypted Data" },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-violet-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>, label: "24 / 7 Portal Availability" },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-violet-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: "Hackathon Leaderboard" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                  style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
                >
                  <div className="p-2 bg-white/[0.05] rounded-lg shadow-inner">{item.icon}</div>
                  <span className="text-sm font-semibold text-white-force">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right panel (form) ── */}
          <div className="flex-1 flex flex-col justify-center p-6 xs:p-8 md:p-12">
            <div className="max-w-sm mx-auto w-full">

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mb-6 xs:mb-8"
              >
                {/* Mobile logo */}
                <div
                  className="w-12 h-12 xs:w-14 xs:h-14 rounded-2xl flex items-center justify-center mb-4 xs:mb-5 lg:hidden border border-white/10 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <img src={Logo} alt="Logo" className="w-8 h-8 xs:w-10 xs:h-10 object-contain" />
                </div>
                <h1 className="text-2xl xs:text-3xl font-black text-white-force tracking-tight mb-1 xs:mb-1.5">Create Account</h1>
                <p className="text-xs xs:text-sm font-medium" style={{ color: "rgba(148,163,184,0.75)" }}>
                  Register with your student details below.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-600/50 transition-all bg-slate-800/80 group-hover:border-violet-400/80 shadow-[0_0_15px_rgba(139,92,246,0.15)] flex items-center justify-center relative">
                      {formData.profileImage ? (
                        <img src={formData.profileImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                      <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white-force" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-violet-600 rounded-full p-1.5 shadow-lg shadow-violet-500/40" >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white-force" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                  {/* <p className="mt-2 text-xs font-bold text-white-force uppercase tracking-widest">Upload Profile Photo</p> */}
                  {errors.profileImage && (
                    <p className="mt-1 text-xs font-semibold text-red-400">⚠ {errors.profileImage[0]}</p>
                  )}
                </div>

                {/* Full name + Student ID — 2 cols */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                  <div>
                    <label className="auth-label">Full Name</label>
                    <input
                      id="signup-fullname"
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={ic(errors.fullName)}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs font-semibold text-red-400">⚠ {errors.fullName[0]}</p>
                    )}
                  </div>
                  <div>
                    <label className="auth-label">Student ID</label>
                    <input
                      id="signup-studentid"
                      type="text"
                      name="studentId"
                      placeholder="2023-CS-001"
                      value={formData.studentId}
                      onChange={handleChange}
                      className={ic(errors.studentId)}
                    />
                    {errors.studentId && (
                      <p className="mt-1 text-xs font-semibold text-red-400">⚠ {errors.studentId[0]}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="auth-label">Email Address</label>
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="yourname@ilmauniversity.edu"
                    value={formData.email}
                    onChange={handleChange}
                    className={ic(errors.email)}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs font-semibold text-red-400">⚠ {errors.email[0]}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="auth-label">Password</label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showPw ? "text" : "password"}
                      name="password"
                      autoComplete="new-password"
                      placeholder="Create a strong password"
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
                  {errors.password && (
                    <p className="mt-1.5 text-xs font-semibold text-red-400">⚠ {errors.password[0]}</p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.01 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className="auth-btn mt-3"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                    boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
                  }}
                >
                  {loading ? (
                    <><Spinner /> Creating Account…</>
                  ) : (
                    <>
                      Create Account
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </motion.form>

              {/* Footer */}
              <div className="mt-7 pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-sm" style={{ color: "rgba(148,163,184,0.7)" }}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold hover:underline underline-offset-2 transition-colors"
                    style={{ color: "#a78bfa" }}
                  >
                    Sign In
                  </Link>
                </p>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
