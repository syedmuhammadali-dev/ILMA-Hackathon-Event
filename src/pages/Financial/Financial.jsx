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

const Financial = () => {
  const { withLoader } = useLoading();

  const transactions = [
    { id: "TX-9081", desc: "Spring Semester Fee", date: "Jan 12, 2026", amount: "PKR 125,000", status: "Paid", method: "Online Bank" },
    { id: "TX-8821", desc: "Library Security Deposit", date: "Dec 05, 2025", amount: "PKR 5,000", status: "Paid", method: "Wallet" },
    { id: "TX-7712", desc: "Exam Registration Fee", date: "Nov 20, 2025", amount: "PKR 12,000", status: "Paid", method: "Challan" },
    { id: "TX-6651", desc: "Late Fee Fine (CS-201)", date: "Oct 15, 2025", amount: "PKR 1,500", status: "Paid", method: "Fine" },
  ];

  const handleDownloadVoucher = async () => {
    await withLoader(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    Swal.fire({
      icon: "success",
      title: "Voucher Generated",
      text: "Fee challan voucher for the current semester has been encrypted and is ready for download.",
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Extract PDF"
    });
  };

  return (
    <div className="page-shell space-y-8 pb-12">
      <PageHeader
        title="Financial Ledger"
        subtitle="Manage your fiscal node, track transactions, and monitor scholarship allocations."
      />

      <MDBRow className="g-6">
        {/* Main Stats */}
        <MDBCol lg="4">
           <MotionDiv 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group h-full"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-start mb-6">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Current Balance Hub</p>
                       <MDBIcon fas icon="wallet" className="text-xl opacity-50" />
                    </div>
                    <h2 className="text-5xl font-black tracking-tighter mb-1">PKR 0.00</h2>
                    <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Next Due: March 15, 2026</p>
                 </div>
                 
                 <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                       <div>
                          <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Status</p>
                          <p className="text-sm font-black">SOLVENT</p>
                       </div>
                       <MDBIcon fas icon="check-circle" className="text-2xl text-emerald-300" />
                    </div>
                 </div>
              </div>
           </MotionDiv>
        </MDBCol>

        <MDBCol lg="4">
           <MotionDiv 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.1 }}
             className="surface-card rounded-[2.5rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden group h-full"
           >
              <div className="flex flex-col h-full justify-between">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Scholarship Metrics</p>
                    <div className="flex items-center gap-4 mb-6">
                       <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                          <MDBIcon fas icon="award" className="text-2xl" />
                       </div>
                       <div>
                          <h4 className="text-xl font-black text-white">Merit Node Beta</h4>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Discount: 25%</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-500">Eligibility Sync</span>
                       <span className="text-emerald-500">92%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                          className="h-full bg-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: '92%' }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                       />
                    </div>
                    <p className="text-[10px] text-slate-400 italic">Maintain GPA {'>'} 3.5 to sustain scholarship status.</p>
                 </div>
              </div>
           </MotionDiv>
        </MDBCol>

        <MDBCol lg="4">
           <div className="flex flex-col gap-4 h-full">
              <MDBBtn onClick={handleDownloadVoucher} className="btn-ui btn-ui-solid flex-1 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 p-6 transition-all hover:scale-[1.02]">
                 <MDBIcon fas icon="file-invoice-dollar" className="text-3xl mb-2" />
                 <span className="font-black text-xs uppercase tracking-[0.2em]">Generate Voucher</span>
              </MDBBtn>
              <MDBBtn outline className="btn-ui-glass flex-1 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 p-6 border-white/10 hover:border-blue-500/50">
                 <MDBIcon fas icon="hands-helping" className="text-3xl mb-2 text-blue-400" />
                 <span className="font-black text-xs uppercase tracking-[0.2em] text-slate-300">Apply Installments</span>
              </MDBBtn>
           </div>
        </MDBCol>
      </MDBRow>

      {/* Transaction History */}
      <MotionDiv 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="surface-card rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                 <MDBIcon fas icon="history" />
               </div>
               <h3 className="text-xl font-black text-white tracking-tight">Ledger Matrix</h3>
            </div>
            <MDBBtn outline size="sm" className="btn-ui-glass py-2 px-4 rounded-xl border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400">
               Filter Hub
            </MDBBtn>
        </div>

        <div className="overflow-x-auto p-2">
           <MDBTable borderless align="middle" className="mb-0 text-white">
              <MDBTableHead className="bg-white/[0.03]">
                 <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction ID</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-center text-slate-400">Amount</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-center text-slate-400">Method</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-right text-slate-400">Status</th>
                 </tr>
              </MDBTableHead>
              <MDBTableBody>
                 {transactions.map((tx, idx) => (
                    <motion.tr 
                      key={tx.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.1) }}
                      className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group"
                    >
                       <td className="px-8 py-6">
                          <span className="text-xs font-black text-blue-400 bg-blue-500/5 px-2 py-1 rounded-md border border-blue-500/10">{tx.id}</span>
                       </td>
                       <td className="px-6 py-6">
                          <div>
                             <p className="text-sm font-black text-slate-200">{tx.desc}</p>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{tx.date}</p>
                          </div>
                       </td>
                       <td className="px-6 py-6 text-center">
                          <span className="text-sm font-black text-white">{tx.amount}</span>
                       </td>
                       <td className="px-6 py-6 text-center">
                          <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-3 py-1 rounded-full">{tx.method}</span>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{tx.status}</span>
                          </div>
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

export default Financial;
