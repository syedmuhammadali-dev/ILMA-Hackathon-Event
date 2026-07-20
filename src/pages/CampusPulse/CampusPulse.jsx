import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import PageHeader from "../../components/UI/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { getTranslation } from "../../utils/linguaEngine";
import { getColorClasses } from "../../utils/colorClasses";

const MotionDiv = motion.div;

const CampusPulse = () => {

  const newsFeed = [
    { id: 1, type: "Academic", title: "Spring Semester Final Results Deployed", time: "2h ago", icon: "poll" },
    { id: 2, type: "Admin", title: "Campus Network Maintenance Scheduled", time: "5h ago", icon: "wifi" },
    { id: 3, type: "Holiday", title: "Eid-ul-Fitr Vacations Announced", time: "1d ago", icon: "moon" },
  ];

  const upcomingEvents = [
    { id: "EV-01", title: "ILMA Tech Hackathon 2026", date: "April 25", category: "Tech", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: "EV-02", title: "Global Entrepreneurship Summit", date: "May 02", category: "Business", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
  ];

  const societies = [
    { title: "Gaming Society", icon: "gamepad", members: "450+", color: "purple" },
    { title: "IEEE Student Branch", icon: "microchip", members: "320+", color: "blue" },
    { title: "ACM Computing", icon: "code", members: "580+", color: "emerald" },
    { title: "Drama & Arts", icon: "masks-theater", members: "150+", color: "rose" },
  ];

  const handleJoinSociety = (name) => {
    Swal.fire({
      title: `${getTranslation("campus_join_title")} ${name}?`,
      text: getTranslation("campus_join_text"),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: getTranslation("campus_join_confirm"),
      cancelButtonText: getTranslation("campus_join_cancel"),
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
           title: getTranslation("campus_join_success_title"),
           text: `${getTranslation("campus_join_success_text")} ${name}.`,
           icon: "success",
           background: "#0f172a",
           color: "#f8fafc",
        });
      }
    });
  };

  const handleRegisterEvent = (title) => {
     Swal.fire({
        title: getTranslation("campus_register_title"),
        input: "email",
        inputLabel: getTranslation("campus_register_label"),
        inputPlaceholder: getTranslation("campus_register_placeholder"),
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonText: getTranslation("campus_register_confirm"),
        confirmButtonColor: "#2563eb",
     }).then((result) => {
        if (result.value) {
           Swal.fire({
              icon: "success",
              title: getTranslation("campus_register_success_title"),
              text: `${getTranslation("campus_register_success_text")} ${title} ${getTranslation("campus_register_success_suffix")}`,
              background: "#0f172a",
              color: "#f8fafc",
           });
        }
     });
  };

  return (
    <div className="page-shell space-y-8 pb-12">
      <PageHeader
        title={getTranslation("campus")}
        subtitle={getTranslation("campus_subtitle")}
      />

      <MDBRow className="g-6">
         {/* Featured Events - Main Column on mobile it should come first or second? 
             User usually reads News first, but Events are more visual. 
             I'll stick to news sidebar first as it's quick to read. */}
         <MDBCol lg="4" className="mb-8 lg:mb-0 order-2 lg:order-1">
            <MotionDiv 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="surface-card rounded-[2rem] md:rounded-[2.5rem] border border-white/5 h-full shadow-2xl overflow-hidden"
            >
               <div className="px-6 md:px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                   <h3 className="text-lg md:text-xl font-black text-white tracking-tight flex items-center gap-2">
                      <MDBIcon fas icon="satellite-dish" className="text-blue-500 text-sm" />
                      {getTranslation("campus_live_stream")}
                   </h3>
                   <span className="text-[10px] font-black uppercase text-emerald-500 animate-pulse">{getTranslation("campus_online")}</span>
               </div>
               
                <div className="p-2 xs:p-4 space-y-3">
                  {newsFeed.map((news) => (
                    <MotionDiv 
                       key={news.id} 
                       whileHover={{ x: 5 }}
                       className="p-3 xs:p-4 rounded-xl xs:rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                       <div className="flex items-start gap-2 xs:gap-3">
                          <div className="h-7 w-7 xs:h-8 xs:w-8 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                             <MDBIcon fas icon={news.icon} className="text-[10px]" />
                          </div>
                          <div className="min-w-0">
                             <p className="text-[8px] xs:text-[10px] font-black uppercase tracking-widest text-slate-500 truncate">{news.type}</p>
                             <h5 className="text-[10px] xs:text-xs font-bold text-slate-200 mt-0.5 truncate">{news.title}</h5>
                             <p className="text-[7px] xs:text-[8px] font-bold text-slate-600 mt-0.5 uppercase">{news.time}</p>
                          </div>
                       </div>
                    </MotionDiv>
                  ))}
               </div>
               
               <div className="px-4 xs:px-8 py-4 xs:py-6 border-t border-white/5 text-center bg-white/[0.01]">
                  <MDBBtn outline className="btn-ui-glass w-full rounded-xl py-2 xs:py-2.5 text-[9px] xs:text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {getTranslation("campus_historical_logs")}
                  </MDBBtn>
               </div>
            </MotionDiv>
         </MDBCol>

         {/* Right Column: Events and Guilds */}
         <MDBCol lg="8" className="order-1 lg:order-2">
            <div className="space-y-6 xs:space-y-8">
                <h4 className="text-[9px] xs:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 pl-4">{getTranslation("campus_event_nexus")}</h4>
               <MDBRow className="g-3 xs:g-4">
                  {upcomingEvents.map((event) => (
                    <MDBCol sm="6" key={event.id}>
                       <MotionDiv 
                         whileHover={{ y: -5 }}
                         className="relative h-48 xs:h-64 rounded-[1.5rem] xs:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-2xl"
                       >
                          <img src={event.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={event.title} />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                          
                          <div className="absolute inset-x-4 xs:inset-x-6 bottom-4 xs:bottom-6 flex flex-col items-start">
                             <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-blue-600 text-white mb-2">{event.category}</span>
                             <h4 className="text-base xs:text-xl font-black text-white mb-1 leading-tight truncate w-full">{event.title}</h4>
                             <p className="text-[8px] xs:text-[10px] text-slate-400 font-bold mb-3 xs:mb-4">{event.date} • {getTranslation("campus_digital_hub")}</p>
                             
                             <MDBBtn onClick={() => handleRegisterEvent(event.title)} className="btn-ui btn-ui-solid py-1.5 xs:py-2 px-4 xs:px-6 rounded-lg xs:rounded-xl font-black text-[9px] xs:text-[10px] uppercase tracking-widest">
                                 {getTranslation("campus_secure_token")}
                             </MDBBtn>
                          </div>
                       </MotionDiv>
                    </MDBCol>
                  ))}
               </MDBRow>

               {/* Guild Directory */}
               <div className="pt-4 space-y-4">
                   <h4 className="text-[9px] xs:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 pl-4">{getTranslation("campus_guild_directory")}</h4>
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4">
                     {societies.map((club, idx) => (
                       <MotionDiv 
                         key={idx}
                         whileHover={{ scale: 1.05 }}
                         className="surface-card p-4 xs:p-5 rounded-2xl xs:rounded-3xl border border-white/5 text-center group transition-all"
                       >
                          <div className={`h-10 w-10 xs:h-12 xs:w-12 rounded-xl xs:rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 border shadow-lg ${getColorClasses(club.color).iconWrap}`}>
                             <MDBIcon fas icon={club.icon} className="text-sm xs:text-base" />
                          </div>
                          <h6 className="text-[9px] xs:text-[10px] font-black text-white uppercase tracking-tighter mb-1 truncate">{club.title}</h6>
                           <p className="text-[7px] xs:text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-3">{club.members} {getTranslation("campus_members_suffix")}</p>
                          
                          <MDBBtn onClick={() => handleJoinSociety(club.title)} size="sm" outline className={`w-full rounded-lg xs:rounded-xl py-1.5 xs:py-2 font-black text-[7px] xs:text-[8px] uppercase tracking-widest transition-all ${getColorClasses(club.color).outlineBtn}`}>
                              {getTranslation("campus_join_node")}
                          </MDBBtn>
                       </MotionDiv>
                     ))}
                  </div>
               </div>
            </div>
         </MDBCol>
      </MDBRow>
    </div>
  );
};

export default CampusPulse;

