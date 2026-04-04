import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { storage } from "../../utils/storage";
import { getColorClasses } from "../../utils/colorClasses";
import PageHeader from "../../components/UI/PageHeader";

const Portal = () => {
  const [courses, setCourses] = useState(() => storage.getEnrolledCourses());
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: "", instructor: "", progress: 0 });

  useEffect(() => {
    const onOpen = () => setIsEnrollOpen(true);
    const onClose = () => setIsEnrollOpen(false);
    window.addEventListener("openEnrollModal", onOpen);
    window.addEventListener("closeEnrollModal", onClose);
    return () => {
      window.removeEventListener("openEnrollModal", onOpen);
      window.removeEventListener("closeEnrollModal", onClose);
    };
  }, []);

  return (
    <div className="page-shell animate-in fade-in duration-700">
      <PageHeader
        title="Student Portal"
        subtitle="Manage your academic records and enrolled courses."
        actions={
          <MDBBtn color="primary" className="btn-ui btn-ui-solid" onClick={() => setIsEnrollOpen(true)}>
            <MDBIcon fas icon="plus" size="xs" /> Enroll New Course
          </MDBBtn>
        }
      />

      {/* Enroll Modal */}
      {isEnrollOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsEnrollOpen(false)} />
          <div className="relative w-full max-w-lg mx-4">
            <MDBCard className="surface-card p-6 shadow-lg">
              <MDBCardBody>
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold">Enroll New Course</h4>
                  <button
                    aria-label="Close enroll form"
                    className="btn-icon-link"
                    onClick={() => setIsEnrollOpen(false)}
                  >
                    <MDBIcon fas icon="times" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Course Name</label>
                    <input
                      value={newCourse.name}
                      onChange={(e) => setNewCourse((p) => ({ ...p, name: e.target.value }))}
                      className="input-field w-full"
                      placeholder="e.g. Modern React Patterns"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Instructor</label>
                    <input
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse((p) => ({ ...p, instructor: e.target.value }))}
                      className="input-field w-full"
                      placeholder="Instructor name"
                    />
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    <MDBBtn outline color="secondary" className="btn-ui btn-ui-muted" onClick={() => setIsEnrollOpen(false)}>Cancel</MDBBtn>
                    <MDBBtn color="primary" className="btn-ui btn-ui-solid" onClick={() => {
                      // simple validation
                      if (!newCourse.name) return alert('Please provide a course name');
                      const created = storage.addCourse(newCourse);
                      setCourses((c) => [...c, created]);
                      setNewCourse({ name: "", instructor: "", progress: 0 });
                      setIsEnrollOpen(false);
                    }}>Enroll</MDBBtn>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      )}

      <MDBRow className="g-6">
        <MDBCol lg="8">
          <MDBCard className="table-shell h-full surface-card">
            <MDBCardBody className="p-0">
              <div className="p-6 border-b border-gray-100 surface-soft sticky top-0 z-10 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <MDBIcon fas icon="book-open" className="text-blue-500" />
                  My Enrolled Courses
                </h3>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest surface-soft px-3 py-1 rounded-full">
                  {courses.length} Courses Total
                </span>
              </div>
              <div className="overflow-x-auto">
                <MDBTable hover borderless align="middle" className="mb-0">
                  <MDBTableHead className="surface-soft border-b border-slate-100">
                    <tr className="text-left">
                      <th className="table-head-cell">Course Name</th>
                      <th className="table-head-cell">Instructor</th>
                      <th className="table-head-cell">Progress</th>
                      <th className="table-head-cell text-right">Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {courses.map((course) => (
                      <tr
                          key={course.id}
                          className="group hover-surface transition-colors"
                        >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                              <MDBIcon fas icon="laptop-code" size="sm" />
                            </div>
                            <span className="font-bold text-slate-900">
                              {course.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-600">
                            {course.instructor}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-full h-1.5 bg-slate-100 rounded-full max-w-25 overflow-hidden">
                              <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold text-slate-400">
                              {course.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <MDBBtn
                            color="link"
                            className="btn-icon-link"
                            aria-label={`Open ${course.name}`}
                            title={`Open ${course.name}`}
                            onClick={() => alert(`Open ${course.name} — details view not implemented yet`) }
                          >
                            <MDBIcon fas icon="chevron-right" />
                          </MDBBtn>
                        </td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol lg="4">
          <div className="space-y-6">
            {/* GPA Card */}
            <MDBCard className="border-0 shadow-sm premium-gradient text-white overflow-hidden relative group">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <MDBIcon fas icon="star" size="10x" />
              </div>
              <MDBCardBody className="p-8 relative">
                <p className="text-sm font-bold uppercase tracking-widest opacity-75 mb-3">
                  Overall GPA
                </p>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-5xl font-extrabold tracking-tighter">
                    3.85
                  </h4>
                  <span className="text-lg font-medium opacity-60">/ 4.0</span>
                </div>
                <div className="mt-8 flex items-center gap-2">
                  <span className="px-2.5 py-1 glass-badge rounded-lg text-xs font-bold tracking-tight text-white">
                    Top 5% of Class
                  </span>
                </div>
              </MDBCardBody>
            </MDBCard>

            {/* Academic Standing */}
            <MDBCard className="border-0 shadow-sm">
              <MDBCardBody className="p-6">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <MDBIcon
                    fas
                    icon="graduation-cap"
                    className="text-emerald-500"
                  />
                  Academic Calendar
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      event: "Midterm Exams",
                      date: "Apr 20 - Apr 25",
                      status: "Upcoming",
                      color: "blue",
                    },
                    {
                      event: "Project Submission",
                      date: "May 02, 2026",
                      status: "Not Started",
                      color: "amber",
                    },
                    {
                      event: "Spring Break",
                      date: "May 10 - May 17",
                      status: "Holiday",
                      color: "emerald",
                    },
                  ].map((item, idx) => {
                    const c = getColorClasses(item.color);
                    return (
                      <div
                        key={idx}
                        className="flex gap-4 border-l-2 border-slate-100 pl-4 py-2 hover:border-blue-500 transition-all cursor-default"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-800 leading-tight">
                            {item.event}
                          </p>
                          <p className="text-xs font-medium text-slate-400 mt-1">
                            {item.date}
                          </p>
                        </div>
                        <span
                          className={`ms-auto text-[10px] font-extrabold uppercase tracking-widest h-fit px-2 py-0.5 rounded-md ${c.badge}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Portal;
