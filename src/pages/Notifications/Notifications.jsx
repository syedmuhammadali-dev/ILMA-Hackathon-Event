import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import PageHeader from "../../components/UI/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useLoading } from "../../context/LoadingContext";
import { getTranslation } from "../../utils/linguaEngine";

const MotionDiv = motion.div;

const Notifications = () => {
  const { withLoader } = useLoading();
  const [notifications, setNotifications] = useState([
    { title: "Exam Schedule Released", time: "2 hours ago", desc: "Midterm examinations for Spring 2026 are scheduled from April 20th.", type: "urgent", icon: "exclamation-circle", read: false },
    { title: "Seminar: AI in Research", time: "5 hours ago", desc: "A guest lecture by Dr. Arsalan on the future of AI in academic research.", type: "info", icon: "info-circle", read: false },
    { title: "Maintenance Alert: Campus Wi-Fi", time: "1 day ago", desc: "Main block Wi-Fi will be down for maintenance on Saturday from 2 PM.", type: "warning", icon: "wifi", read: false },
    { title: "Library Hours Extended", time: "2 days ago", desc: "The central library will now remain open until 10 PM on weekdays.", type: "info", icon: "book-reader", read: false },
    { title: "Scholarship Results", time: "3 days ago", desc: "The results for the Merit Scholarship have been published.", type: "success", icon: "award", read: false },
  ]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const markAllAsRead = async () => {
    if (unreadCount === 0) return;
    await withLoader(async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    });
    Swal.fire({ icon: "success", title: "Clean Slate", text: "All alerts have been cleared.", timer: 1200, showConfirmButton: false });
  };

  return (
    <div className="page-shell space-y-8 animate-in fade-in duration-700 pb-12">
      <PageHeader
        title={getTranslation("bulletin_center")}
        subtitle={getTranslation("bulletin_subtitle")}
        actions={
          <MDBBtn onClick={markAllAsRead} disabled={unreadCount === 0} className="btn-ui btn-ui-solid px-4 md:px-5 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/10 w-full md:w-auto">
            <MDBIcon fas icon="check-double" className="mr-2" />
            {getTranslation("dismiss_all")} ({unreadCount})
          </MDBBtn>
        }
      />

      <div className="max-w-4xl space-y-4">
        <AnimatePresence mode="popLayout">
          {notifications.map((item, idx) => (
            <MotionDiv
              key={idx}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ x: 5 }}
              className="group"
            >
              <MDBCard className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm relative group cursor-pointer ${item.read ? 'opacity-60' : ''}`}>
                 {/* Lateral Status Bar */}
                 <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    item.type === 'urgent' ? 'bg-rose-500' : 
                    item.type === 'warning' ? 'bg-amber-500' : 
                    item.type === 'success' ? 'bg-emerald-500' : 'bg-blue-600'
                 }`} />

                 <MDBCardBody className="p-3 xs:p-4 pl-5 xs:pl-6 md:p-6 md:pl-10">
                    <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-6 sm:items-center">
                       <div className={`h-10 w-10 xs:h-11 xs:w-11 rounded-xl xs:rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                          item.type === 'urgent' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 border-rose-100 dark:border-rose-900/30' : 
                          item.type === 'warning' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 border-amber-100 dark:border-amber-900/30' : 
                          item.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-100 dark:border-emerald-900/30' : 
                          'bg-blue-50 dark:bg-blue-500/10 text-blue-600 border-blue-100 dark:border-blue-900/30'
                       } group-hover:scale-110 shadow-sm sm:shadow-none`}>
                          <MDBIcon fas icon={item.icon} className="text-base xs:text-lg" />
                       </div>

                       <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap justify-between items-center mb-1 gap-1 xs:gap-2">
                             <h4 className="text-xs xs:text-sm font-black text-slate-800 dark:text-white tracking-tight leading-none group-hover:text-blue-600 transition-colors uppercase truncate w-full sm:w-auto">{item.title}</h4>
                             <span className="text-[8px] xs:text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.time}</span>
                          </div>
                          <p className="text-[11px] xs:text-xs font-bold text-slate-500 leading-relaxed break-words">{item.desc}</p>
                       </div>

                       <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">View</span>
                          <MDBIcon fas icon="chevron-right" className="text-slate-200 text-xs" />
                       </div>
                    </div>
                 </MDBCardBody>
              </MDBCard>
            </MotionDiv>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notifications;

