import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import PageHeader from "../../components/UI/PageHeader";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useLoading } from "../../context/LoadingContext";

const MotionDiv = motion.div;
const MotionTr = motion.tr;

const Grades = () => {
  const { withLoader } = useLoading();

  const gradeData = [
    { course: "Object Oriented Programming", code: "CS-201", grade: "A", gpa: "4.0", status: "Passed", progress: 95 },
    { course: "Database Management Systems", code: "CS-302", grade: "B+", gpa: "3.3", status: "Passed", progress: 78 },
    { course: "Data Structures & Algorithms", code: "CS-204", grade: "A-", gpa: "3.7", status: "Passed", progress: 88 },
    { course: "Software Engineering", code: "CS-401", grade: "A", gpa: "4.0", status: "Passed", progress: 92 },
    { course: "Operating Systems", code: "CS-305", grade: "B", gpa: "3.0", status: "Session Active", progress: 65 },
  ];

  const gpaTrend = [3.2, 3.4, 3.8, 3.6, 3.9, 3.82];
  const chartPoints = gpaTrend.map((val, i) => `${(i * 70) + 15},${90 - (val / 4 * 70)}`).join(" ");

  const handleDownloadTranscript = async () => {
    await withLoader(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    });
    Swal.fire({
      icon: "success",
      title: "Transcript Node Active",
      text: "Your official academic transcript has been encrypted and prepared for extraction.",
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonText: "Download Digital Copy",
      confirmButtonColor: "#2563eb",
    });
  };

  return (
    <div className="page-shell space-y-8 pb-12">
      <PageHeader
        title="Academic Nexus"
        subtitle="Quantum visualization of your academic trajectory and degree synchronization."
      />

      <MDBRow className="g-8">
        <MDBCol lg="8">
          <MotionDiv 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="surface-card rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <MDBIcon fas icon="analytics" />
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight">Active Semester Node</h3>
               </div>
               <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Spring 2026 Batch</span>
               </div>
            </div>
            
            <div className="overflow-x-auto p-2">
              <MDBTable borderless align="middle" className="mb-0 text-white">
                <MDBTableHead className="bg-white/[0.03]">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Module Entry</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-center text-slate-400">Index</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-center text-slate-400">Rank</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-right text-slate-400">Sync Status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {gradeData.map((item, idx) => (
                    <MotionTr
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-0.5">
                          <p className="text-sm font-black text-slate-200 group-hover:text-blue-400 transition-colors">{item.course}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.code}</p>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="text-md font-black text-blue-400 bg-blue-500/5 px-3 py-1 rounded-lg border border-blue-500/10">{item.gpa}</span>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className={`h-10 w-10 rounded-2xl mx-auto flex items-center justify-center font-black text-sm border-2 ${item.grade === 'A' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10' : 'border-blue-500/30 bg-blue-500/10 text-blue-400'}`}>
                          {item.grade}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex flex-col gap-2 items-end">
                            <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${item.status === 'Passed' ? 'text-emerald-500' : 'text-blue-500'}`}>
                               {item.status}
                            </span>
                            <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                               <motion.div 
                                  className={`h-full rounded-full ${item.status === 'Passed' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${item.progress}%` }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </div>
                         </div>
                      </td>
                    </MotionTr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
          </MotionDiv>
        </MDBCol>

        <MDBCol lg="4">
           <div className="flex flex-col gap-8">
              {/* Credit Hour Completion Hub */}
              <MotionDiv 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="surface-card rounded-[2.5rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden group"
              >
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/5 blur-[80px] rounded-full group-hover:bg-purple-500/10 transition-colors" />
                 
                 <div className="flex flex-col items-center text-center relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Degree Completion Hub</p>
                    
                    <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                       <svg className="w-full h-full transform -rotate-90">
                          <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                          <motion.circle 
                             cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent"
                             strokeDasharray="440"
                             initial={{ strokeDashoffset: 440 }}
                             animate={{ strokeDashoffset: 440 - (440 * 0.65) }}
                             transition={{ duration: 2, ease: "easeOut" }}
                             className="text-purple-500"
                             strokeLinecap="round"
                          />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <h2 className="text-4xl font-black text-white tracking-tighter">65%</h2>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Verified</p>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-white/5">
                       <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Earned</p>
                          <p className="text-lg font-black text-white">78/130</p>
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                          <p className="text-lg font-black text-emerald-500">Junior</p>
                       </div>
                    </div>
                 </div>
              </MotionDiv>

              {/* GPA Trajectory Chart */}
              <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-slate-900 to-[#1e1e2d] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl overflow-hidden relative"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full" />
                 
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-1">Cumulative Index</p>
                          <div className="flex items-baseline gap-2">
                             <h2 className="text-5xl font-black text-blue-400 tracking-tighter">3.82</h2>
                             <span className="text-sm font-bold text-slate-600">/4.0</span>
                          </div>
                       </div>
                       <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                          <MDBIcon fas icon="chart-line" />
                       </div>
                    </div>
                    
                    <div className="h-32 w-full mt-4">
                       <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                          <defs>
                             <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                             </linearGradient>
                          </defs>
                          <motion.path
                             d={`M 15 90 L ${chartPoints} L 365 90 Z`}
                             fill="url(#chartGradient)"
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
                          {gpaTrend.map((v, i) => (
                             <motion.circle 
                                key={i} 
                                cx={(i * 70) + 15} cy={90 - (v / 4 * 70)} r="4" 
                                fill="#3b82f6"
                                stroke="#1e1e2d"
                                strokeWidth="2"
                                whileHover={{ r: 6 }}
                             />
                          ))}
                       </svg>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                       {['S1', 'S2', 'S3', 'S4', 'S5', 'NOW'].map((tag, idx) => (
                          <span key={idx} className="text-[8px] font-black text-slate-600 transition-colors hover:text-blue-400 cursor-default">{tag}</span>
                       ))}
                    </div>
                 </div>
              </MotionDiv>

              {/* Action Node */}
              <MDBBtn 
                onClick={handleDownloadTranscript} 
                className="btn-ui btn-ui-solid py-4 rounded-[1.5rem] shadow-2xl shadow-blue-500/20 font-black text-[10px] uppercase tracking-[0.2em] relative group overflow-hidden"
              >
                 <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                 <span className="relative z-10 flex items-center justify-center gap-2">
                    <MDBIcon fas icon="fingerprint" />
                    Secure Transcript Extraction
                 </span>
              </MDBBtn>
           </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Grades;

