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
import { getColorClasses } from "../../utils/colorClasses";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = storage.getCurrentUser();
  const navigate = useNavigate();

  return (
    <div className="page-shell animate-in fade-in slide-in-from-top-6 duration-1000">
      {/* Hero Greeting Section */}
      <section className="relative overflow-hidden premium-gradient rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-blue-950/20 group">
        <div className="absolute top-0 right-0 p-8 opacity-20 transition-transform group-hover:scale-110 duration-700">
          <MDBIcon fas icon="graduation-cap" size="8x" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-widest backdrop-blur-md mb-6 border border-white/20">
            Student Activity Center
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
            Hi, {user?.fullName || "Student"}! 👋
          </h1>
          <p className="text-lg md:text-xl text-blue-100/90 font-medium mb-8 leading-relaxed">
            Welcome to your personalized portal. Everything you need for your
            academic success is organized right here at your fingertips.
          </p>
          <div className="flex flex-wrap gap-4">
            <MDBBtn className="btn-ghost" onClick={() => navigate("/portal")}>
              Go to Portal
            </MDBBtn>
            <MDBBtn
              outline
              onClick={() => navigate("/schedule")}
              className="rounded-2xl px-8 py-3.5 text-white border-2 border-white/30 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              View Schedule
            </MDBBtn>
          </div>
        </div>
      </section>

      <MDBRow className="g-8">
        {/* Left Column: Quick Access Grid */}
        <MDBCol lg="8" className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              <div className="h-6 w-1 bg-blue-600 rounded-full"></div>
              Quick Access Widgets
            </h3>
            <span className="text-xs font-bold text-slate-400 hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-widest">
              Manage Widgets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <MDBCard className="data-grid-card group border-blue-500">
              <MDBCardBody className="p-6">
                <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MDBIcon fas icon="calendar-check" size="lg" />
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">
                  My Attendance
                </h4>
                <p className="text-sm text-slate-500 font-medium mb-6">
                  Track your presence in all currently enrolled modules.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 tracking-tighter">
                    94%
                  </span>
                  <span className="text-xs font-bold text-emerald-600 uppercase">
                    Above average
                  </span>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="data-grid-card group border-indigo-500">
              <MDBCardBody className="p-6">
                <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <MDBIcon fas icon="tasks" size="lg" />
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">
                  Pending Tasks
                </h4>
                <p className="text-sm text-slate-500 font-medium mb-6">
                  Review upcoming assignment deadlines and tasks.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-slate-900 tracking-tighter">
                    03
                  </span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-blue-100">
                    Pending
                  </span>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="data-grid-card group border-emerald-500">
              <MDBCardBody className="p-6">
                <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <MDBIcon fas icon="certificate" size="lg" />
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">
                  Certifications
                </h4>
                <p className="text-sm text-slate-500 font-medium mb-6">
                  Explore professional certifications available this semester.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-3 overflow-hidden">
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200"></div>
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-blue-100"></div>
                    <div className="h-8 w-8 rounded-full ring-2 ring-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                      +5
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="data-grid-card group border-amber-500">
              <MDBCardBody className="p-6">
                <div className="bg-amber-50 text-amber-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-amber-100 group-hover:bg-amber-600 group-hover:text-white transition-all">
                  <MDBIcon fas icon="bell" size="lg" />
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">
                  New Notices
                </h4>
                <p className="text-sm text-slate-500 font-medium mb-6">
                  Stay updated with official university announcements.
                </p>
                <div className="animate-pulse flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-bold text-amber-600">
                    05 Urgent messages
                  </span>
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>

        {/* Right Column: Mini Stats/News */}
        <MDBCol lg="4">
          <MDBCard className="surface-card shadow-lg shadow-slate-200/70 p-4 h-full">
            <MDBCardBody className="p-4">
              <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8 flex items-center justify-between">
                <span>University News</span>
                <MDBIcon fas icon="rss" className="text-blue-500 text-sm" />
              </h3>
              <div className="space-y-8">
                {[
                  {
                    title: "Convocation 2026 Registration Open",
                    date: "April 06, 2026",
                    color: "blue",
                  },
                  {
                    title: "Annual Science Fair Participants",
                    date: "April 04, 2026",
                    color: "emerald",
                  },
                  {
                    title: "New AI Lab Facility Initialized",
                    date: "April 02, 2026",
                    color: "amber",
                  },
                  {
                    title: "Campus-wide Wi-Fi Upgrade Notice",
                    date: "March 30, 2026",
                    color: "rose",
                  },
                ].map((item, idx) => {
                  const c = getColorClasses(item.color);
                  return (
                    <div
                      key={idx}
                      className="flex gap-4 group cursor-pointer border-b border-slate-50 pb-6 last:border-0 last:pb-0"
                    >
                      <div
                        className={`mt-1.5 h-3 w-3 rounded-full shrink-0 ${c.dot} shadow-lg group-hover:scale-125 transition-transform`}
                      ></div>
                      <div>
                        <p className="text-sm font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter flex items-center gap-1">
                          <MDBIcon far icon="clock" size="xs" /> {item.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <MDBBtn
                outline
                color="primary"
                className="w-full mt-10 rounded-2xl py-4 text-xs font-black uppercase tracking-widest border-2 hover:bg-blue-50 transition-all"
              >
                Full News Archive
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
