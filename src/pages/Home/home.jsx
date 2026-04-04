import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { storage } from "../../utils/storage";

const Home = () => {
  const user = storage.getCurrentUser();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-5 duration-700">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Welcome back, <span className="text-blue-600">{user?.fullName || "Student"}!</span>
        </h1>
        <p className="mt-3 text-lg text-slate-600 max-w-2xl">
          Track your studies, manage your schedule, and stay updated with your academic goals.
        </p>
      </header>

      <MDBRow className="g-6">
        <MDBCol md="8" className="space-y-6">
          {/* Featured Course Card */}
          <MDBCard className="border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative flex items-end p-6">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <MDBIcon fas icon="graduation-cap" size="8x" className="text-white" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md mb-2">
                  Currently Learning
                </span>
                <h2 className="text-2xl font-bold text-white">Full Stack Web Development</h2>
              </div>
            </div>
            <MDBCardBody className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-400">Instructor</p>
                  <p className="text-base font-bold text-slate-900">Dr. Sarah Johnson</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-400">Progress</p>
                  <p className="text-base font-bold text-blue-600">68% Completed</p>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-blue-600 rounded-full w-[68%] transition-all duration-1000 shadow-sm shadow-blue-200"></div>
              </div>
              <MDBBtn className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-100">
                Continue Learning
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <MDBCard className="border-0 shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <MDBCardBody className="p-6 relative">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MDBIcon fas icon="calendar-check" size="lg" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Upcoming Exams</h3>
                <p className="text-sm text-slate-500 mb-4">Check your schedule for next week's examinations.</p>
                <a href="#!" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-2 group-hover:gap-3 transition-all">
                  View Schedule <MDBIcon fas icon="arrow-right" />
                </a>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="border-0 shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <MDBCardBody className="p-6 relative">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <MDBIcon fas icon="tasks" size="lg" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Assignments</h3>
                <p className="text-sm text-slate-500 mb-4">You have 3 pending assignments due this week.</p>
                <a href="#!" className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-2 group-hover:gap-3 transition-all">
                  Check Tasks <MDBIcon fas icon="arrow-right" />
                </a>
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>

        <MDBCol md="4" className="space-y-6">
          {/* News & Updates */}
          <MDBCard className="border-0 shadow-sm h-full">
            <MDBCardBody className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <MDBIcon fas icon="bullhorn" className="text-blue-500" />
                Latest Updates
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Library Hours Extended", date: "April 05, 2026", color: "blue" },
                  { title: "New Lab Equipment Arrived", date: "April 03, 2026", color: "emerald" },
                  { title: "Registration Open for Fall", date: "April 01, 2026", color: "amber" },
                  { title: "Scholarship Results Out", date: "March 28, 2026", color: "rose" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group cursor-pointer">
                    <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 bg-${item.color}-500 shadow-sm shadow-${item.color}-200`}></div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.title}</p>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-tighter">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <MDBBtn outline color="primary" className="w-full mt-8 rounded-xl py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-blue-50">
                View All News
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
