import React from "react";
import {
   MDBRow,
   MDBCol,
   MDBCard,
   MDBCardBody,
   MDBBtn,
   MDBIcon,
} from "mdb-react-ui-kit";
import { storage } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getTranslation } from "../../utils/linguaEngine";

const MotionDiv = motion.div;

const Home = () => {
   const user = storage.getCurrentUser();
   const navigate = useNavigate();

   const [time, setTime] = React.useState(new Date());
   const [latency, setLatency] = React.useState(12);
   const [mode, setMode] = React.useState(localStorage.getItem("portal-mode") || "dark");

   React.useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      const latencyTimer = setInterval(() => setLatency(Math.floor(Math.random() * (18 - 8 + 1) + 8)), 3000);
      
      const checkMode = () => {
         const currentMode = localStorage.getItem("portal-mode") || "dark";
         if (currentMode !== mode) setMode(currentMode);
      };
      const modeInterval = setInterval(checkMode, 500);

      return () => {
         clearInterval(timer);
         clearInterval(latencyTimer);
         clearInterval(modeInterval);
      };
   }, [mode]);

   // Mock data for graphs
   const activityData = [20, 45, 28, 65, 45, 80, 55];
   const chartPoints = activityData.map((val, i) => `${(i * 60) + 10},${100 - val}`).join(" ");

   // Particles for Hero
   const particles = Array.from({ length: 12 });

   return (
      <div className="page-shell space-y-8 animate-in fade-in duration-700">
         {/* Hero Greeting Section - Mode Aware Cosmic Overhaul */}
         <section 
            className="relative overflow-hidden rounded-[3rem] p-8 md:p-12 shadow-2xl transition-all duration-700 group min-h-[460px] py-20 flex items-center border border-slate-200 dark:border-white/5"
            style={{ 
               background: mode === 'dark' 
                 ? `radial-gradient(circle at 0% 0%, var(--primary-color) 0%, transparent 45%), radial-gradient(circle at 100% 100%, var(--primary-color) 0%, transparent 45%), #020617`
                 : `radial-gradient(circle at 0% 0%, var(--primary-color) 0%, transparent 45%), radial-gradient(circle at 100% 100%, var(--primary-color) 0%, transparent 45%), #fdfdfd`
            }}
         >
            {/* Layered Decorative Blobs */}
            <div className="absolute inset-0 z-0 opacity-40">
               <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary-theme blur-[120px] rounded-full animate-pulse opacity-10" />
               <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-primary-theme blur-[100px] rounded-full opacity-10" />
            </div>

            {/* Quantum Particles - Upgraded Visibility */}
            {particles.map((_, i) => (
               <motion.div
                  key={i}
                  className="absolute rounded-full shadow-lg"
                  initial={{
                     x: Math.random() * 1000,
                     y: Math.random() * 500,
                     scale: Math.random() * 1,
                     opacity: 0.1 + Math.random() * 0.4
                  }}
                  animate={{
                     y: [null, Math.random() * -120, Math.random() * 120],
                     x: [null, Math.random() * 50, Math.random() * -50],
                     opacity: mode === 'dark' ? [0.2, 0.6, 0.2] : [0.4, 0.8, 0.4],
                     scale: [1, 1.4, 0.8]
                  }}
                  transition={{
                     duration: 7 + Math.random() * 15,
                     repeat: Infinity,
                     ease: "easeInOut"
                  }}
                  style={{
                     width: `${Math.random() * 8 + 4}px`,
                     height: `${Math.random() * 8 + 4}px`,
                     backgroundColor: 'var(--primary-color)',
                     filter: mode === 'dark' ? `blur(${Math.random() * 3 + 1}px)` : `blur(1px)`,
                     boxShadow: `0 0 15px var(--primary-glow)`
                  }}
               />
            ))}

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 w-full">
               <div className="max-w-xl">
                  <h1 className={`text-4xl md:text-6xl font-black tracking-tight mb-4 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                     {getTranslation('portal_title')} <br /> {getTranslation('command_center')}
                  </h1>
                  <p className={`text-lg font-medium mb-4 leading-relaxed max-w-md ${mode === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                     {getTranslation('welcome_msg')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                     <MDBBtn onClick={() => navigate("/portal")} className="btn-ui btn-ui-solid px-8 rounded-xl shadow-xl shadow-blue-500/20">
                        Portal
                     </MDBBtn>
                     <MDBBtn outline onClick={() => navigate("/schedule")} className="btn-ui btn-ui-glass px-8 rounded-xl">
                        Sync Timetable
                     </MDBBtn>
                  </div>
               </div>

               <div className="hidden lg:flex w-80 h-80 relative items-center justify-center">
                  {/* Holographic Pulse Rings */}
                  <motion.div
                     animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                     transition={{ duration: 4, repeat: Infinity }}
                     className="absolute inset-0 rounded-full border-2 border-blue-500/30 blur-sm"
                  />
                  <motion.div
                     animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.15, 0.05] }}
                     transition={{ duration: 6, repeat: Infinity }}
                     className="absolute inset-[-20px] rounded-full border border-blue-400/20"
                  />

                  {/* Digital Core Card */}
                  <motion.div
                     whileHover={{ rotateY: 15, rotateX: -10 }}
                     className="relative z-10 w-64 h-64 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xl"
                  >
                     <div className="relative mb-6">
                        <div className="absolute inset-0 bg-blue-500/40 blur-2xl rounded-full" />
                        <img
                           src={user?.profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                           alt="ID"
                           className="h-24 w-24 rounded-full border-4 border-blue-500/30 relative z-10 object-cover"
                        />
                        <motion.div
                           animate={{ rotate: 360 }}
                           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                           className="absolute inset-[-10px] border-2 border-dashed border-blue-400/40 rounded-full"
                        />
                     </div>
                     <h4 className="text-xl font-black mb-1 uppercase tracking-tighter" style={{ color: 'var(--text-primary)' }}>Student Node</h4>
                     <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Uplink: Active</p>
                     </div>
                  </motion.div>

                  {/* Floating Labels */}
                  <motion.div
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 5, repeat: Infinity }}
                     className="absolute top-0 right-0 bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-lg"
                  >
                     <p className="text-[8px] font-black text-blue-400 uppercase">Latency: {latency}ms</p>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* Temporal Hub: Detached Time & Date Box */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MotionDiv
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="surface-card p-6 flex items-center justify-between border-b-4 border-b-blue-600 shadow-xl"
            >
               <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                     <MDBIcon fas icon="clock" className="text-2xl animate-spin-slow" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Live Subsystem Time</p>
                     <p className="text-3xl font-black font-mono tracking-widest uppercase" style={{ color: 'var(--text-primary)' }}>
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                     </p>
                  </div>
               </div>
               <div className="text-right hidden sm:block">
                  <span className="h-2 w-2 bg-emerald-500 rounded-full inline-block animate-ping mr-2" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Sync</span>
               </div>
            </MotionDiv>

            <MotionDiv
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="surface-card p-6 flex items-center gap-4 border-b-4 border-b-purple-600 shadow-xl"
            >
               <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
                  <MDBIcon fas icon="calendar-day" className="text-2xl" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Temporal Alignment</p>
                  <p className="text-xl font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                     {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
               </div>
            </MotionDiv>
         </div>

         <MDBRow className="g-8">
            {/* Main Analytics Column */}
            <MDBCol lg="8" className="space-y-8">
               <MDBCard className="surface-card p-4 overflow-hidden">
                  <MDBCardBody>
                     <div className="flex justify-between items-center mb-10">
                        <div>
                           <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{getTranslation('academic_nexus')}</h3>
                           <p className="text-xs font-bold text-slate-500">Live analytics of your weekly study engagement</p>
                        </div>
                        <div className="flex gap-2">
                           <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status: Optimized</span>
                        </div>
                     </div>

                     <div className="relative h-48 w-full">
                        <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                           <defs>
                              <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                 <stop offset="0%" style={{ stopColor: "rgba(59, 130, 246, 0.4)", stopOpacity: 1 }} />
                                 <stop offset="100%" style={{ stopColor: "rgba(59, 130, 246, 0)", stopOpacity: 1 }} />
                              </linearGradient>
                           </defs>
                           <motion.path
                              d={`M10,100 ${chartPoints.split(' ').map((p, i) => `L${p}`).join(' ')} L370,100 Z`}
                              fill="url(#grad)"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 1 }}
                           />
                           <motion.polyline
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={chartPoints}
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, ease: "easeInOut" }}
                           />
                           {activityData.map((v, i) => (
                              <motion.circle
                                 key={i}
                                 cx={(i * 60) + 10} cy={100 - v} r="5"
                                 fill="#0f172a" stroke="#3b82f6" strokeWidth="2"
                                 whileHover={{ r: 8, strokeWidth: 4 }}
                              />
                           ))}
                        </svg>
                     </div>

                     <div className="flex justify-between mt-8 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                     </div>
                  </MDBCardBody>
               </MDBCard>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MotionDiv whileHover={{ y: -5 }} className="surface-card p-6 relative group border-l-4 border-l-emerald-500">
                     <div className="flex justify-between items-start mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                           <MDBIcon fas icon="chart-pie" />
                        </div>
                        <div className="text-right">
                           <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">GPA Estimate</span>
                           <h4 className="text-2xl font-black text-emerald-500">3.86</h4>
                        </div>
                     </div>
                     <h5 className="text-sm font-black uppercase tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>Academic Standing</h5>
                     <p className="text-xs font-bold text-slate-500 mb-6">Superior performance in core engineering modules detected.</p>
                     <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} className="h-full bg-emerald-500 rounded-full" />
                     </div>
                  </MotionDiv>

                  <MotionDiv whileHover={{ y: -5 }} className="surface-card p-6 relative group border-l-4 border-l-blue-500">
                     <div className="flex justify-between items-start mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                           <MDBIcon fas icon="clock" />
                        </div>
                        <div className="text-right">
                           <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Attendance Pulse</span>
                           <h4 className="text-2xl font-black text-blue-500">94.2%</h4>
                        </div>
                     </div>
                     <h5 className="text-sm font-black uppercase tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>Presence Analytics</h5>
                     <p className="text-xs font-bold text-slate-500 mb-6">You've missed only 2 sessions this semester. Maintain trajectory.</p>
                     <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: "94.2%" }} className="h-full bg-blue-500 rounded-full" />
                     </div>
                  </MotionDiv>
               </div>
            </MDBCol>

            {/* Action Sidebar */}
            <MDBCol lg="4" className="space-y-8">
               <MDBCard className="surface-card p-6 h-full">
                  <MDBCardBody>
                     <h3 className="text-xl font-black tracking-tight mb-8" style={{ color: 'var(--text-primary)' }}>{getTranslation('system_alerts')}</h3>
                     <div className="space-y-8">
                        {[
                           { title: "ILMA Hackathon Phase II", date: "Apr 12", color: "blue" },
                           { title: "Global Tech Symposium 2026", date: "Apr 09", color: "emerald" },
                           { title: "Semester Enrollment Deadline", date: "Apr 08", color: "amber" },
                           { title: "Quantum Lab Access Granted", date: "Apr 05", color: "purple" },
                        ].map((item, idx) => (
                           <div key={idx} className="flex gap-4 items-start group cursor-pointer">
                              <div className={`h-2.5 w-2.5 rounded-full mt-1.5 bg-${item.color}-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform`} />
                              <div>
                                 <p className="text-xs font-black text-slate-200 group-hover:text-blue-400 transition-colors uppercase tracking-tighter leading-tight">{item.title}</p>
                                 <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-widest">{item.date}, 2026</p>
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col gap-4">
                        <MDBBtn onClick={() => navigate("/notifications")} className="btn-ui btn-ui-solid w-full rounded-2xl py-3">
                           Bulletin History
                        </MDBBtn>
                        <div className="text-center">
                           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Last Synced: {time.toLocaleTimeString()}</p>
                           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Portal Version 4.0.2 Stable</span>
                        </div>
                     </div>
                  </MDBCardBody>
               </MDBCard>
            </MDBCol>
         </MDBRow>
      </div>
   );
};

export default Home;
