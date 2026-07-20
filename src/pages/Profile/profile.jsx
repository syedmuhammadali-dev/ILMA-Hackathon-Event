import React, { useState, useRef } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { storage } from "../../utils/storage";
import { profileSchema } from "../../utils/validation";
import PageHeader from "../../components/UI/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { getColorClasses } from "../../utils/colorClasses";
import { getTranslation } from "../../utils/linguaEngine";

const MotionDiv = motion.div;

const Profile = () => {
  const [user, setUser] = useState(storage.getCurrentUser());
  const [isEditing, setIsEditing] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    studentId: user?.studentId || "",
    bio: user?.bio || "Passionately pursuing excellence in engineering and technology.",
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    const updatedUser = storage.updateProfile(formData);
    if (updatedUser) {
      setUser(updatedUser);
      setIsEditing(false);
      setErrors({});
    }
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updatedUser = storage.updateProfile({ profileImage: reader.result });
      if (updatedUser) setUser(updatedUser);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="page-shell space-y-8 animate-in fade-in duration-700">
      <PageHeader
        title={getTranslation("profile_title")}
        subtitle={getTranslation("profile_subtitle")}
      />

      <MDBRow className="g-4 xs:g-6 lg:g-8">
        {/* Left Column: ID Card & Stats */}
        <MDBCol lg="5" xl="4">
          <div className="flex flex-col gap-6 xs:gap-8">
            {/* 3D Flippable ID Card */}
            <div
              className="relative w-full aspect-[1.4/1] xs:aspect-[1.6/1] perspective-1000 cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-700"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* Front of Card */}
                <div
                  className="absolute inset-0 backface-hidden rounded-[1.5rem] xs:rounded-[2rem] overflow-hidden shadow-2xl text-white border border-white/20"
                  style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
                    boxShadow: "0 25px 50px -12px rgba(49, 46, 129, 0.5)"
                  }}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 blur-[60px] rounded-full mix-blend-screen -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/20 blur-[60px] rounded-full mix-blend-screen -ml-10 -mb-10"></div>

                  <div className="relative z-10 flex flex-col h-full justify-between p-4 xs:p-7">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[7px] xs:text-[9px] font-black uppercase tracking-wider xs:tracking-[0.3em] text-cyan-300 opacity-80 mb-0.5 xs:mb-1">{getTranslation("profile_official_id")}</span>
                        <h4 className="text-sm xs:text-xl font-black text-white-force tracking-widest uppercase truncate">ILMA N<span className="text-cyan-400">e</span>xus</h4>
                      </div>
                      <MDBIcon fas icon="microchip" className="text-xl xs:text-3xl text-slate-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    </div>

                    {/* Body */}
                    <div className="flex items-center gap-3 xs:gap-5 mt-2 xs:mt-4">
                      {/* Avatar with glowing ring */}
                      <div className="relative group shrink-0" onClick={handleAvatarClick}>
                        <div className="h-16 w-16 xs:h-24 xs:w-24 rounded-xl xs:rounded-2xl p-0.5 xs:p-1 bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all group-hover:scale-105">
                          <div className="h-full w-full rounded-[10px] xs:rounded-[14px] bg-slate-900 overflow-hidden flex items-center justify-center">
                            {user?.profileImage ? (
                              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xl xs:text-3xl font-black text-white-force">{user?.fullName?.charAt(0)}</span>
                            )}
                          </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 xs:h-8 xs:w-8 bg-slate-800 rounded-lg flex items-center justify-center text-white border border-slate-600 shadow-xl group-hover:-translate-y-1 transition-transform">
                          <MDBIcon fas icon="camera" className="text-[8px] xs:text-[10px] text-cyan-400" />
                        </div>
                        <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </div>

                      <div className="flex flex-col overflow-hidden">
                        <p className="text-base xs:text-2xl font-black text-white-force truncate tracking-tight drop-shadow-md">{user?.fullName}</p>
                        <div className="flex items-center gap-2 mt-0">
                          <div className="bg-white/10 px-1.5 xs:px-2 py-0.5 rounded text-[8px] xs:text-[10px] font-bold text-cyan-300 tracking-wider xs:tracking-widest backdrop-blur-sm truncate max-w-[120px]">{user?.studentId || "2024-CORE-V2"}</div>
                        </div>
                        <div className="mt-2 xs:mt-3 flex items-center gap-1.5 xs:gap-2">
                          <span className="relative flex h-2 w-2 xs:h-2.5 xs:w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 xs:h-2.5 xs:w-2.5 bg-emerald-500"></span>
                          </span>
                          <span className="text-[7px] xs:text-[9px] font-black uppercase tracking-widest text-emerald-300">{getTranslation("profile_active")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end border-t border-white/10 pt-2 xs:pt-4 mt-1 xs:mt-2">
                      <div className="flex flex-col gap-0.5 xs:gap-1">
                        <span className="text-[7px] xs:text-[8px] font-bold uppercase opacity-60 tracking-widest text-slate-300">{getTranslation("profile_valid_thru")}</span>
                        <span className="text-[10px] xs:text-sm font-black text-white px-2 py-0.5 xs:py-1 bg-white/10 rounded tracking-widest backdrop-blur-sm">12 / 26</span>
                      </div>
                      <MDBIcon fab icon="nfc" className="text-xl xs:text-3xl text-white/50" />
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div
                  className="absolute inset-0 backface-hidden rounded-[1.5rem] xs:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center border border-white/10"
                  style={{ transform: "rotateY(180deg)", background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)" }}
                >
                  <div className="relative z-10 w-full px-6 xs:px-8 flex flex-col items-center justify-center h-full">
                    <div className="bg-white p-2 xs:p-3 rounded-xl xs:rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-3 xs:mb-5">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user?.fullName}-${user?.studentId}`} alt="QR" className="h-20 w-20 xs:h-28 xs:w-28 object-contain" />
                    </div>
                    <h5 className="text-cyan-400 text-[9px] xs:text-xs font-black mb-1 xs:mb-1.5 uppercase tracking-widest">{getTranslation("profile_scan_verify")}</h5>
                    <p className="text-slate-400 text-[7px] xs:text-[9px] leading-relaxed max-w-[200px] xs:max-w-[220px] font-bold uppercase tracking-wider">
                      {getTranslation("profile_qr_note")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 xs:gap-4">
              {[
                { label: getTranslation("profile_stat_gpa"), value: "3.86", color: "blue", icon: "graduation-cap" },
                { label: getTranslation("profile_stat_attendance"), value: "94.2%", color: "emerald", icon: "user-check" },
                { label: getTranslation("profile_stat_credits"), value: "86", color: "purple", icon: "book-open" },
                { label: getTranslation("profile_stat_points"), value: "1.2k", color: "amber", icon: "fire" },
              ].map((stat, i) => (
                <MotionDiv
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="surface-card p-4 xs:p-5 rounded-2xl xs:rounded-[1.5rem] shadow-sm flex flex-col gap-2 xs:gap-3"
                >
                  <div className={`h-7 w-7 xs:h-8 xs:w-8 rounded-lg flex items-center justify-center ${getColorClasses(stat.color).iconWrapLight}`}>
                    <MDBIcon fas icon={stat.icon} className={`text-xs xs:text-sm ${getColorClasses(stat.color).text}`} />
                  </div>
                  <div>
                     <h5 className="text-base xs:text-xl font-black text-slate-800 dark:text-white leading-none">{stat.value}</h5>
                     <p className="text-[7px] xs:text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-0.5 xs:mt-1 truncate">{stat.label}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </MDBCol>

        {/* Right Column: Information Forms */}
        <MDBCol lg="7" xl="8">
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 rounded-[2rem] xs:rounded-[2.5rem] p-5 xs:p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20"
          >
            <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-8 xs:mb-10 pb-6 border-b border-slate-50 dark:border-slate-800 gap-4">
              <div className="flex items-center gap-3 xs:gap-4">
                <div className="h-10 w-10 xs:h-12 xs:w-12 rounded-xl xs:rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                  <MDBIcon fas icon="user-edit" className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl xs:text-2xl font-black text-slate-900 dark:text-white tracking-tight">{getTranslation("profile_account_heading")}</h2>
                  <p className="text-[10px] xs:text-xs font-bold text-slate-400">{getTranslation("profile_account_subtitle")}</p>
                </div>
              </div>
              {!isEditing ? (
                <MDBBtn onClick={() => setIsEditing(true)} className="btn-ui btn-ui-solid px-6 rounded-xl shadow-lg shadow-blue-500/20">
                  {getTranslation("profile_edit")}
                </MDBBtn>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)} className="px-5 py-2 text-xs font-bold text-slate-400 hover:text-slate-600">{getTranslation("common_cancel")}</button>
                  <MDBBtn onClick={handleSave} className="btn-ui btn-ui-solid px-6 rounded-xl">{getTranslation("profile_save")}</MDBBtn>
                </div>
              )}
            </div>

            <div className="space-y-8 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">{getTranslation("profile_fullname_label")}</label>
                  {isEditing ? (
                    <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 font-bold outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
                  ) : (
                    <div className="text-lg font-bold text-slate-800 dark:text-slate-200 px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-transparent">{user?.fullName}</div>
                  )}
                  {errors.fullName && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.fullName[0]}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">{getTranslation("profile_studentid_label")}</label>
                  {isEditing ? (
                    <input name="studentId" value={formData.studentId} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 font-bold outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
                  ) : (
                    <div className="text-lg font-bold text-slate-800 dark:text-slate-200 px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-transparent">{user?.studentId}</div>
                  )}
                  {errors.studentId && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.studentId[0]}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">{getTranslation("profile_email_label")}</label>
                <div className="flex items-center gap-3 text-slate-400 px-5 py-3.5 bg-slate-50/30 dark:bg-slate-800/20 rounded-2xl border border-slate-100 dark:border-slate-800 italic text-sm">
                  <MDBIcon fas icon="lock" className="text-[10px]" /> {user?.email}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">{getTranslation("profile_bio_label")}</label>
                {isEditing ? (
                  <textarea name="bio" rows={4} value={formData.bio} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 font-bold outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none" />
                ) : (
                  <div className="text-md leading-relaxed text-slate-600 dark:text-slate-400 px-5 py-6 bg-slate-50/50 dark:bg-slate-800/40 rounded-3xl border border-transparent">{user?.bio || formData.bio}</div>
                )}
              </div>

              <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <MotionDiv whileHover={{ y: -2 }} className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 flex items-center gap-4 cursor-pointer">
                  <div className="h-10 w-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                    <MDBIcon fas icon="shield-alt" className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">{getTranslation("profile_security_status")}</p>
                    <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200">{getTranslation("profile_reset_credentials")}</p>
                  </div>
                </MotionDiv>
                <MotionDiv whileHover={{ y: -2 }} className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 flex items-center gap-4 cursor-pointer">
                  <div className="h-10 w-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                    <MDBIcon fas icon="sign-out-alt" className="text-rose-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-rose-400 tracking-widest">{getTranslation("profile_termination")}</p>
                    <p className="text-xs font-bold text-rose-900 dark:text-rose-200">{getTranslation("profile_deactivate")}</p>
                  </div>
                </MotionDiv>
              </div>
            </div>
          </MotionDiv>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Profile;

