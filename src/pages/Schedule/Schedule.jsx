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

const Schedule = () => {
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

  return (
    <div className="page-shell animate-in fade-in slide-in-from-right-5 duration-700">
      <PageHeader
        title="Class Timetable"
        subtitle="Manage your weekly schedule and academic commitments."
        actions={
          <MDBBtn
            color="primary"
            className="btn-ui btn-ui-solid"
          >
            <MDBIcon fas icon="download" size="xs" /> Export PDF
          </MDBBtn>
        }
      />

      <MDBCard className="table-shell surface-card">
        <MDBCardBody className="p-0">
          <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <MDBIcon fas icon="calendar-alt" className="text-blue-500" />
              Weekly Schedule
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
              Spring Semester 2026
            </span>
          </div>
          <div className="overflow-x-auto">
            <MDBTable hover borderless align="middle" className="mb-0">
              <MDBTableHead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-left">
                  <th className="table-head-cell">
                    Time Slot
                  </th>
                  <th className="table-head-cell text-center">
                    Mon
                  </th>
                  <th className="table-head-cell text-center">
                    Tue
                  </th>
                  <th className="table-head-cell text-center">
                    Wed
                  </th>
                  <th className="table-head-cell text-center">
                    Thu
                  </th>
                  <th className="table-head-cell text-center">
                    Fri
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {scheduleData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-xs font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                        {row.time}
                      </span>
                    </td>
                    {[
                      row.monday,
                      row.tuesday,
                      row.wednesday,
                      row.thursday,
                      row.friday,
                    ].map((day, dIdx) => (
                      <td key={dIdx} className="px-6 py-4 text-center">
                        {day === "-" ? (
                          <span className="text-slate-200 font-bold">-</span>
                        ) : day === "Break" ? (
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">
                            Lunch Break
                          </span>
                        ) : (
                          <div className="bg-blue-50/80 border border-blue-100 p-3 rounded-2xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-700 transition-all cursor-pointer">
                            <p className="text-xs font-black mb-0.5 uppercase tracking-tighter">
                              {day}
                            </p>
                            <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest">
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
          <div
            key={idx}
            className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm border-b-4 border-b-blue-600 transition-transform hover:-translate-y-1"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
