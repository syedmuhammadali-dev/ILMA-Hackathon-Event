import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import PageHeader from "../../components/UI/PageHeader";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useLoading } from "../../context/LoadingContext";
import { getTranslation } from "../../utils/linguaEngine";

const MotionDiv = motion.div;

const Schedule = () => {
  const { withLoader } = useLoading();

  const scheduleData = [
    {
      time: "09:00 AM - 10:30 AM",
      monday: "CS-201",
      tuesday: "-",
      wednesday: "CS-201",
      thursday: "-",
      friday: "Lab-3",
    },
    {
      time: "10:45 AM - 12:15 PM",
      monday: "CS-302",
      tuesday: "CS-204",
      wednesday: "-",
      thursday: "CS-302",
      friday: "CS-204",
    },
    {
      time: "12:15 PM - 01:15 PM",
      monday: "Break",
      tuesday: "Break",
      wednesday: "Break",
      thursday: "Break",
      friday: "Break",
    },
    {
      time: "01:30 PM - 03:00 PM",
      monday: "-",
      tuesday: "CS-401",
      wednesday: "CS-305",
      thursday: "CS-401",
      friday: "CS-305",
    },
  ];

  const handleExport = async () => {
    await withLoader(async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
    });

    await Swal.fire({
      icon: "info",
      title: "Export queued",
      text: "PDF export is currently being finalized. Try again shortly.",
      confirmButtonColor: "#2563eb",
    });
  };

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  return (
    <div className="page-shell animate-in fade-in slide-in-from-right-5 duration-700">
      <PageHeader
        title={getTranslation("schedule_title")}
        subtitle={getTranslation("schedule_subtitle")}
        actions={
          <MDBBtn
            color="primary"
            className="btn-ui btn-ui-solid"
            onClick={handleExport}
          >
            <MDBIcon fas icon="download" size="xs" /> {getTranslation("export_pdf")}
          </MDBBtn>
        }
      />

        <MDBCard className="table-shell surface-card">
        <MDBCardBody className="p-0">
          <div className="p-4 md:p-6 border-b border-gray-100 surface-soft sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <MDBIcon fas icon="calendar-alt" className="text-blue-500" />
              {getTranslation("weekly_schedule")}
            </h3>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest surface-soft px-3 py-1 rounded-full border border-slate-200">
              {getTranslation("spring_semester")}
            </span>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <MDBTable hover borderless align="middle" className="mb-0">
              <MDBTableHead className="surface-soft border-b border-slate-100">
                <tr className="text-left">
                  <th className="table-head-cell">{getTranslation("time_slot")}</th>
                  <th className="table-head-cell text-center">Mon</th>
                  <th className="table-head-cell text-center">Tue</th>
                  <th className="table-head-cell text-center">Wed</th>
                  <th className="table-head-cell text-center">Thu</th>
                  <th className="table-head-cell text-center">Fri</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {scheduleData.map((row, idx) => (
                  <tr key={idx} className="group hover-surface transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-xs font-black text-slate-900 glass-badge px-3 py-1 rounded-lg border border-slate-200">
                        {row.time}
                      </span>
                    </td>
                    {days.map((day, dIdx) => (
                      <td key={dIdx} className="px-6 py-4 text-center">
                          {row[day] === "-" ? (
                            <span className="text-slate-200 font-bold">-</span>
                          ) : row[day] === "Break" ? (
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest glass-badge px-2 py-0.5 rounded-md">
                              Lunch Break
                            </span>
                          ) : (
                            <div className="surface-soft border border-blue-100 p-3 rounded-2xl text-blue-900 dark:text-blue-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-700 transition-all cursor-pointer">
                              <p className="text-xs font-black mb-0.5 uppercase tracking-tighter">
                                {row[day]}
                              </p>
                              <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest">
                                Main Block
                              </p>
                            </div>
                          )}
                      </td>
                    ))}
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>

          {/* Mobile/Tablet List View */}
          <div className="lg:hidden p-4 space-y-6">
            {scheduleData.map((row, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></span>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {row.time}
                  </span>
                  <span className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {days.map((day, dIdx) => row[day] !== "-" && (
                    <div key={dIdx} className="surface-card p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{day.toUpperCase()}</span>
                          <span className={`text-xs font-black ${row[day] === "Break" ? 'text-slate-400 italic' : 'text-slate-900'}`}>{row[day]}</span>
                       </div>
                       {row[day] !== "Break" && (
                         <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                            <MDBIcon fas icon="map-marker-alt" className="text-[10px]" />
                         </div>
                       )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MDBCardBody>
      </MDBCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: "map-marker-alt",
            title: "Main Block",
            text: "Rooms 201-205, Labs",
          },
          {
            icon: "info-circle",
            title: "Faculty Hours",
            text: "Mon-Thu: 10AM-12PM",
          },
          {
            icon: "exclamation-triangle",
            title: "Note",
            text: "Lab sessions are mandatory.",
          },
        ].map((item, idx) => (
          <MotionDiv
            key={idx}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-4 surface-card p-4 rounded-3xl border border-slate-100 shadow-sm border-b-4 border-b-blue-600 transition-transform hover:-translate-y-1"
          >
            <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl border border-blue-100">
              <MDBIcon fas icon={item.icon} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 mb-0 uppercase tracking-tighter">
                {item.title}
              </p>
              <p className="text-xs text-slate-500 font-medium">{item.text}</p>
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default Schedule;

