import React from "react";
import { MDBCard, MDBCardBody, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import PageHeader from "../../components/UI/PageHeader";

const Notifications = () => {
  const notifications = [
    {
      title: "Exam Schedule Released",
      time: "2 hours ago",
      desc: "Midterm examinations for Spring 2026 are scheduled from April 20th.",
      type: "urgent",
      icon: "exclamation-circle",
    },
    {
      title: "Seminar: AI in Research",
      time: "5 hours ago",
      desc: "A guest lecture by Dr. Arsalan on the future of AI in academic research.",
      type: "info",
      icon: "info-circle",
    },
    {
      title: "Maintenance Alert: Campus Wi-Fi",
      time: "1 day ago",
      desc: "Main block Wi-Fi will be down for maintenance on Saturday from 2 PM.",
      type: "warning",
      icon: "wifi",
    },
    {
      title: "Library Hours Extended",
      time: "2 days ago",
      desc: "The central library will now remain open until 10 PM on weekdays.",
      type: "info",
      icon: "book-reader",
    },
    {
      title: "Scholarship Results",
      time: "3 days ago",
      desc: "The results for the Merit Scholarship have been published. Check portal records.",
      type: "success",
      icon: "award",
    },
  ];

  return (
    <div className="page-shell animate-in fade-in slide-in-from-top-4 duration-700">
      <PageHeader
        title="University Notifications"
        subtitle="Stay updated with the latest academic announcements and alerts."
        actions={
          <MDBBtn
            outline
            color="secondary"
            size="sm"
            className="rounded-xl px-6 py-2.5 text-xs font-bold border-2 transition-all hover:bg-slate-50"
          >
            Mark all as read
          </MDBBtn>
        }
      />

      <div className="max-w-4xl space-y-4">
        {notifications.map((item, idx) => (
          <MDBCard
            key={idx}
            className={`border-0 shadow-sm overflow-hidden h-full border-l-4 ${
              item.type === "urgent"
                ? "border-l-rose-500"
                : item.type === "warning"
                  ? "border-l-amber-500"
                  : item.type === "success"
                    ? "border-l-emerald-500"
                    : "border-l-blue-500"
            } hover:shadow-md transition-shadow group cursor-pointer`}
          >
            <MDBCardBody className="p-6">
              <div className="flex gap-6 items-start">
                <div
                  className={`p-4 rounded-2xl shrink-0 border transition-colors ${
                    item.type === "urgent"
                      ? "bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white"
                      : item.type === "warning"
                        ? "bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white"
                        : item.type === "success"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white"
                          : "bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white"
                  }`}
                >
                  <MDBIcon fas icon={item.icon} size="lg" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
                <MDBIcon
                  fas
                  icon="chevron-right"
                  className="text-slate-100 group-hover:text-slate-300 transition-colors mt-auto mb-auto"
                />
              </div>
            </MDBCardBody>
          </MDBCard>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
