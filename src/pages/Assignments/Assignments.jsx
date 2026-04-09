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
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useLoading } from "../../context/LoadingContext";
import { getTranslation } from "../../utils/linguaEngine";

const MotionDiv = motion.div;

const Assignments = () => {
  const { withLoader } = useLoading();

  const activeAssignments = [
    { id: 1, title: "UI/UX Micro-Interactions", course: "Advanced Frontend", due: "2h 45m", priority: "High", color: "rose", icon: "bolt" },
    { id: 2, title: "Database Schema Design", course: "DBMS-II", due: "1d 12h", priority: "Medium", color: "blue", icon: "database" },
    { id: 3, title: "Ethical Hacking Report", course: "Cyber Security", due: "3d 04h", priority: "Low", color: "emerald", icon: "shield-alt" },
  ];

  const submittedTasks = [
    { id: 101, title: "React State Management", date: "Feb 10, 2026", status: "Graded", score: "92/100", remarks: "Excellent state pattern usage." },
    { id: 102, title: "API Integration Node", date: "Feb 05, 2026", status: "Pending", score: "--", remarks: "Awaiting faculty review." },
  ];

  const handleFileUpload = async () => {
    const { value: file } = await Swal.fire({
      title: "Select Assignment Node",
      input: "file",
      inputAttributes: {
        accept: ".pdf,.doc,.zip",
        "aria-label": "Upload assignment repository",
      },
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonText: "Initialize Uplink",
      confirmButtonColor: "#2563eb",
      customClass: {
        input: "text-slate-400 bg-slate-800 border-white/10 rounded-xl"
      }
    });

    if (file) {
      await withLoader(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      });
      Swal.fire({
         icon: "success",
         title: "Uplink Synchronized",
         text: "Mission successful. Your assignment repository has been deployed to the faculty node.",
         background: "#0f172a",
         color: "#f8fafc",
      });
    }
  };

  return (
    <div className="page-shell space-y-8 pb-12">
      <PageHeader
        title={getTranslation('assignment_header')}
        subtitle={getTranslation('assignment_subtitle')}
      />

      <MDBRow className="g-6">
        {/* Active Deadlines */}
        <MDBCol lg="8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
               {activeAssignments.map((task, idx) => (
                 <MotionDiv
                   key={task.id}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: idx * 0.1 }}
                   whileHover={{ y: -5 }}
                   className="surface-card p-6 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group"
                 >
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-${task.color}-500/5 blur-[50px] rounded-full group-hover:bg-${task.color}-500/10 transition-colors`} />
                    <div className="flex justify-between items-start mb-6">
                       <div className={`h-12 w-12 rounded-2xl bg-${task.color}-500/10 flex items-center justify-center text-${task.color}-400 border border-${task.color}-500/20`}>
                          <MDBIcon fas icon={task.icon} className="text-xl" />
                       </div>
                       <div className="flex flex-col items-end">
                          <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-${task.color}-500/20 text-${task.color}-400 mb-2 border border-${task.color}-500/30`}>{task.priority}</span>
                          <p className="text-[10px] font-black text-rose-500 animate-pulse uppercase tracking-widest">{task.due} LEFT</p>
                       </div>
                    </div>
                    
                    <h4 className="text-lg font-black text-white mb-1">{task.title}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">{task.course}</p>
                    
                    <MDBBtn onClick={handleFileUpload} outline block className="btn-ui-glass py-3 rounded-xl border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:border-blue-500/30 group-hover:text-blue-400">
                       {getTranslation('initialize_uplink')}
                    </MDBBtn>
                 </MotionDiv>
               ))}
            </AnimatePresence>
            
            {/* Blank Placeholder / Add New Link */}
            <MotionDiv 
               className="border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center p-8 cursor-pointer hover:border-blue-500/30 hover:bg-white/[0.02] transition-all group"
            >
               <div className="h-10 w-10 flex items-center justify-center text-slate-500 group-hover:text-blue-500 transition-colors">
                  <MDBIcon fas icon="plus" className="text-xl" />
               </div>
               <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 mt-2">Request Extension Node</p>
            </MotionDiv>
          </div>
        </MDBCol>

        {/* Status Radar */}
        <MDBCol lg="4">
           <MotionDiv 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="surface-card rounded-[2.5rem] p-8 border border-white/5 flex flex-col items-center text-center h-full shadow-2xl"
           >
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">{getTranslation('performance_equilibrium')}</p>
              
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                 <div className="absolute inset-0 border-[1.5rem] border-white/5 rounded-full" />
                 <div className="absolute inset-0 border-[1.5rem] border-blue-500/40 rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)' }} />
                 <div className="flex flex-col items-center">
                    <h2 className="text-5xl font-black text-white tracking-tighter">88%</h2>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Submission Rate</p>
                 </div>
              </div>

              <div className="space-y-6 w-full pt-8 border-t border-white/5">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">Global Score Avg</span>
                    <span className="text-blue-400">84.2</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">Rank Standing</span>
                    <span className="text-purple-400">TOP 5%</span>
                 </div>
              </div>
           </MotionDiv>
        </MDBCol>
      </MDBRow>

      {/* History Matrix */}
      <MotionDiv 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="surface-card rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden mt-8"
      >
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
               <MDBIcon fas icon="history" className="text-slate-500" />
               <h3 className="text-lg font-black text-white tracking-tight">{getTranslation('mission_history')}</h3>
            </div>
        </div>
        
        <div className="overflow-x-auto p-2">
           <MDBTable borderless align="middle" className="mb-0 text-white">
              <MDBTableHead className="bg-white/[0.03]">
                 <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Deployed Hub</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-center text-slate-400">Status</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-center text-slate-400">Index Score</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-right text-slate-400">Faculty Remarks</th>
                 </tr>
              </MDBTableHead>
              <MDBTableBody>
                 {submittedTasks.map((task, idx) => (
                    <motion.tr 
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.1) }}
                      className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors"
                    >
                       <td className="px-8 py-6">
                          <div>
                             <p className="text-sm font-black text-slate-200">{task.title}</p>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{task.date}</p>
                          </div>
                       </td>
                       <td className="px-6 py-6 text-center">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${task.status === 'Graded' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                             {task.status}
                          </span>
                       </td>
                       <td className="px-6 py-6 text-center">
                          <span className="text-sm font-black text-slate-200">{task.score}</span>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <p className="text-[10px] font-bold text-slate-400 italic">"{task.remarks}"</p>
                       </td>
                    </motion.tr>
                 ))}
              </MDBTableBody>
           </MDBTable>
        </div>
      </MotionDiv>
    </div>
  );
};

export default Assignments;
