import React, { useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { storage } from "../../utils/storage";
import PageHeader from "../../components/UI/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useLoading } from "../../context/LoadingContext";

const MotionDiv = motion.div;

const Portal = () => {
  const [enrolled, setEnrolled] = useState(() => storage.getEnrolledCourses());
  const [activeTab, setActiveTab] = useState("All");
  const { withLoader } = useLoading();

  const availableCourses = [
    { id: 101, name: "Advanced Neural Networks", instructor: "Dr. Sarah", category: "AI", rating: 4.8, students: "128", price: "Free", color: "purple" },
    { id: 102, name: "UI/UX Design Systems", instructor: "Michael Chen", category: "Design", rating: 4.9, students: "256", price: "Free", color: "rose" },
    { id: 103, name: "Cloud Architecture", instructor: "James Wilson", category: "CS", rating: 4.7, students: "180", price: "Free", color: "blue" },
    { id: 104, name: "Blockchain Fundamentals", instructor: "Emma Davis", category: "CS", rating: 4.5, students: "95", price: "Free", color: "emerald" },
  ];

  const filteredAvailable = activeTab === "All" 
    ? availableCourses 
    : availableCourses.filter(c => c.category === activeTab);

  const handleQuickEnroll = async (course) => {
    if (enrolled.find(e => e.id === course.id)) {
      Swal.fire({ icon: "info", title: "Already Enrolled", text: "You are already a student of this course." });
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: 'Enroll in Course?',
      text: `Are you sure you want to add "${course.name}" to your semester?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Enroll Me',
      confirmButtonColor: '#2563eb'
    });

    if (isConfirmed) {
      await withLoader(async () => {
         await new Promise(r => setTimeout(r, 1000));
         const newCourse = storage.addCourse({
           id: course.id,
           name: course.name,
           instructor: course.instructor,
           progress: 0
         });
         setEnrolled(prev => [...prev, newCourse]);
      });
      Swal.fire({ icon: "success", title: "Success", text: `Successfully enrolled in ${course.name}!`, timer: 1500, showConfirmButton: false });
    }
  };

  return (
    <div className="page-shell space-y-10 animate-in fade-in duration-700">
      <PageHeader
        title="Course Center"
        subtitle="Manage your current studies and explore new academic opportunities."
      />

      <MDBRow className="g-8">
        {/* Left Column: My Current Courses */}
        <MDBCol lg="7" xl="8">
           <div className="space-y-8">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                       <MDBIcon fas icon="book-reader" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Active Enrollment</h3>
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    {enrolled.length} Courses Total
                 </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {enrolled.length > 0 ? enrolled.map((course, idx) => (
                    <MotionDiv
                      key={course.id}
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="surface-card p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm relative group"
                    >
                       <div className="flex justify-between items-start mb-6">
                          <div className={`h-12 w-12 rounded-2xl bg-${idx % 2 === 0 ? 'blue' : 'emerald'}-500/10 flex items-center justify-center text-${idx % 2 === 0 ? 'blue' : 'emerald'}-600`}>
                             <MDBIcon fas icon="laptop-code" className="text-xl" />
                          </div>
                          <button className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                             <MDBIcon fas icon="ellipsis-v" className="text-slate-400 text-xs" />
                          </button>
                       </div>
                       
                       <h4 className="text-lg font-black text-slate-800 dark:text-white leading-tight mb-1">{course.name}</h4>
                       <p className="text-xs font-bold text-slate-400 mb-6">{course.instructor}</p>

                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                             <span className="text-slate-400">Progress Status</span>
                             <span className="text-blue-600">{course.progress}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-50 dark:bg-slate-800/50 rounded-full overflow-hidden">
                             <motion.div 
                                className="h-full bg-blue-600 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                             />
                          </div>
                       </div>
                    </MotionDiv>
                 )) : (
                    <div className="col-span-2 py-20 text-center bg-slate-50 dark:bg-slate-800/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                       <MDBIcon fas icon="ghost" className="text-4xl text-slate-300 mb-4" />
                       <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No courses enrolled yet</p>
                    </div>
                 )}
              </div>

              {/* Browse Marketplace Section */}
              <div className="pt-12">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-t border-slate-100 dark:border-slate-800 pt-12">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600">
                          <MDBIcon fas icon="compass" />
                       </div>
                       <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Browse Marketplace</h3>
                    </div>
                    
                    <div className="flex surface-soft p-1.5 rounded-2xl gap-1">
                       {["All", "CS", "Design", "AI"].map(tab => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm border border-slate-100 dark:border-slate-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                          >
                             {tab}
                          </button>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredAvailable.map((course) => (
                       <MotionDiv
                         key={course.id}
                         whileHover={{ scale: 1.02 }}
                         className="surface-card p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                       >
                          <div className="flex justify-between items-start mb-4">
                             <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-${course.color}-500/10 text-${course.color}-600 border border-${course.color}-500/10`}>
                                {course.category}
                             </span>
                             <div className="flex items-center gap-1.5 text-amber-500">
                                <MDBIcon fas icon="star" className="text-[10px]" />
                                <span className="text-[11px] font-black">{course.rating}</span>
                             </div>
                          </div>

                          <h4 className="text-md font-black text-slate-800 dark:text-white leading-tight mb-4">{course.name}</h4>
                          
                          <div className="flex items-center justify-between mt-auto">
                             <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 capitalize">{course.instructor}</span>
                                <span className="text-xs font-black text-slate-900 dark:text-white mt-0.5">{course.price}</span>
                             </div>
                             <MDBBtn onClick={() => handleQuickEnroll(course)} className="btn-ui btn-ui-solid px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 text-[10px] font-black">
                                Quick Enroll
                             </MDBBtn>
                          </div>
                       </MotionDiv>
                    ))}
                 </div>
              </div>
           </div>
        </MDBCol>

        {/* Right Column: Calendar & Stats */}
        <MDBCol lg="5" xl="4">
           <div className="flex flex-col gap-8">
              {/* Profile Shortcut Card */}
              <MotionDiv 
                whileHover={{ y: -5 }}
                className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden"
              >
                  <div className="relative z-10">
                     <div className="h-14 w-14 rounded-2xl border-2 border-white/20 overflow-hidden mb-6">
                        <img src={storage.getCurrentUser()?.profileImage} alt="User" className="h-full w-full object-cover" />
                     </div>
                     <h4 className="text-xl font-black tracking-tight text-white">{storage.getCurrentUser()?.fullName}</h4>
                     <p className="text-xs font-bold text-blue-300 mt-1 uppercase tracking-widest">{storage.getCurrentUser()?.studentId}</p>
                     
                     <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                        <div>
                           <p className="text-[9px] font-black uppercase text-white/50">Academic Status</p>
                           <p className="text-xs font-bold text-emerald-400 mt-1">Excellent (3.86 GPA)</p>
                        </div>
                        <MDBIcon fas icon="angle-right" className="text-white/30" />
                     </div>
                  </div>
                  {/* Decor */}
                  <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-blue-600/10 blur-3xl" />
              </MotionDiv>

              {/* Academic Highlights */}
              <MDBCard className="surface-card rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-xl">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                       <MDBIcon fas icon="calendar-check" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Priority Calendar</h3>
                 </div>

                 <div className="space-y-6">
                    {[
                      { title: "Midterm Portfolio", date: "Apr 22, 2026", type: "Submission", color: "blue", timeLeft: "2 days" },
                      { title: "Hackathon Phase 1", date: "Apr 28, 2026", type: "Event", color: "purple", timeLeft: "8 days" },
                      { title: "System Maintenance", date: "May 01, 2026", type: "Update", color: "slate", timeLeft: "11 days" },
                    ].map((item, i) => (
                       <div key={i} className="flex flex-col gap-2 group cursor-pointer">
                          <div className="flex justify-between items-center px-1">
                             <span className={`text-[9px] font-black uppercase tracking-widest text-${item.color}-500`}>{item.type}</span>
                             <span className="text-[10px] font-bold text-slate-300">{item.timeLeft}</span>
                          </div>
                          <div className="p-4 surface-soft rounded-2xl border border-transparent group-hover:border-slate-200 dark:group-hover:border-slate-700 transition-all">
                             <p className="text-sm font-black text-slate-800 dark:text-slate-100">{item.title}</p>
                             <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{item.date}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </MDBCard>
           </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Portal;
