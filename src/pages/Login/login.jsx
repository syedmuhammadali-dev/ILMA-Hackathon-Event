import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "../../utils/validation";
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
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const user = storage.authenticateUser(formData.email, formData.password);
    setLoading(false);

    if (user) {
      Swal.fire({
        icon: "success",
        title: `Welcome, ${user.fullName}!`,
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
        background: "#0f172a",
        color: "#e2e8f0",
        customClass: { popup: "rounded-2xl" },
      }).then(() => navigate("/"));
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Incorrect email or password.",
        confirmButtonColor: "#6366f1",
        background: "#0f172a",
        color: "#e2e8f0",
        customClass: { popup: "rounded-2xl" },
      });
    }
  };

  const ic = (err) => `auth-input${err ? " has-error" : ""}`;

  return (
    <div className="auth-page relative flex items-center justify-center p-6 overflow-hidden">

      {/* ── Animated background blobs ── */}
      <div className="auth-blob-1" />
      <div className="auth-blob-2" />
      <div className="auth-blob-3" />

      {/* ── Floating particles ── */}
      <div className="auth-particles absolute inset-0 z-0">
        <Particles count={55} />
      </div>

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="auth-glass-card rounded-3xl overflow-hidden flex min-h-[580px]">

          {/* ── Left panel ── */}
          <div className="hidden lg:flex w-[44%] flex-col justify-between relative p-12 overflow-hidden"
            style={{ background: "linear-gradient(155deg, rgba(99,102,241,0.18) 0%, rgba(6,182,212,0.10) 100%)" }}>

            {/* top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-400/20 to-transparent" />

            {/* logo area */}
            <div className="relative z-10 mb-8">
              <div className="w-24 h-24 mb-6 relative">
                 <div className="absolute inset-0 bg-cyan-400/20 blur-[30px] rounded-full animate-pulse" />
                 <img src={Logo} alt="Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] relative z-10" />
              </div>

              <h2 className="text-3xl font-black text-white-force leading-tight mb-3">
                ILMA University <br />
                <span style={{ color: "#06b6d4" }}>Student Portal</span>
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>
                Access your courses, grades, schedules and campus notifications — all in one place.
              </p>
            </div>

            {/* stats chips */}
            <div className="space-y-3 z-10 relative">
              {[
                { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A4 4 0 0010 10v4a4 4 0 001.555 3.164l3.197 2.132a4 4 0 004.496 0l3.197-2.132A4 4 0 0024 14v-4a4 4 0 00-1.555-3.164l-3.197-2.132zM12 14l-9-5 9-5 9 5-9 5z"/></svg>, label: "15,000+ Active Students" },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, label: "200+ Expert Faculty" },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: "Ranked #1 Private University" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
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
          <div className="flex-1 flex flex-col justify-center p-8 md:p-12">
            <div className="max-w-sm mx-auto w-full">

              {/* header */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mb-9"
              >
                {/* mobile logo */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 lg:hidden border border-white/10 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)" }}>
                  <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
                </div>
                <h1 className="text-3xl font-black text-white-force tracking-tight mb-1.5">Welcome back</h1>
                <p className="text-sm font-medium" style={{ color: "rgba(148,163,184,0.75)" }}>
                  Sign in to your student account to continue.
                </p>
              </motion.div>

              {/* form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                {/* Email */}
                <div>
                  <label className="auth-label">Email Address</label>
                  <input
                    id="login-email"
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
                  <div className="flex items-center justify-between mb-[6px]">
                    <label className="auth-label" style={{ marginBottom: 0 }}>Password</label>
                    <Link
                      to="/forgot-password"
                      className="text-[11px] font-bold transition-colors hover:underline underline-offset-2"
                      style={{ color: "#06b6d4" }}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPw ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
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
                  className="auth-btn mt-2"
                >
                  {loading ? (
                    <><Spinner /> Signing in…</>
                  ) : (
                    <>
                      Sign In
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </motion.form>

              {/* footer */}
              <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-sm" style={{ color: "rgba(148,163,184,0.7)" }}>
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-bold hover:underline underline-offset-2 transition-colors"
                    style={{ color: "#6366f1" }}
                  >
                    Create Account
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

export default Login;
