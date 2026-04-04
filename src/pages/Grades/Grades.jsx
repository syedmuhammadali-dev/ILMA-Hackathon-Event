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

const Grades = () => {
  const gradeData = [
    {
      course: "Object Oriented Programming",
      code: "CS-201",
      grade: "A",
      gpa: "4.0",
      status: "Passed",
    },
    {
      course: "Database Management Systems",
      code: "CS-302",
      grade: "B+",
      gpa: "3.3",
      status: "Passed",
    },
    {
      course: "Data Structures & Algorithms",
      code: "CS-204",
      grade: "A-",
      gpa: "3.7",
      status: "Passed",
    },
    {
      course: "Software Engineering",
      code: "CS-401",
      grade: "A",
      gpa: "4.0",
      status: "Passed",
    },
    {
      course: "Operating Systems",
      code: "CS-305",
      grade: "B",
      gpa: "3.0",
      status: "In progress",
    },
  ];

  return (
    <div className="page-shell animate-in fade-in duration-700">
      <PageHeader
        title="Academic Grades"
        subtitle="Detailed overview of your performance history and current standing."
      />

      <MDBRow className="g-6">
        <MDBCol lg="8">
          <MDBCard className="table-shell h-full surface-card">
            <MDBCardBody className="p-0">
              <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <MDBIcon fas icon="poll-h" className="text-blue-500" />
                  Semester Results
                </h3>
              </div>
              <div className="overflow-x-auto">
                <MDBTable hover borderless align="middle" className="mb-0">
                  <MDBTableHead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-left">
                      <th className="table-head-cell">
                        Course
                      </th>
                      <th className="table-head-cell text-center">
                        Grade
                      </th>
                      <th className="table-head-cell text-center">
                        GPA
                      </th>
                      <th className="table-head-cell text-right">
                        Status
                      </th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {gradeData.map((item, idx) => (
                      <tr
                        key={idx}
                        className="group hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-bold text-slate-900 mb-0">
                              {item.course}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {item.code}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-lg font-black text-blue-600">
                            {item.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-slate-700">
                          {item.gpa}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`status-badge ${
                              item.status === "Passed"
                                ? "status-success"
                                : "status-info"
                            }`}
                          >
                            {item.status}
                          </span>
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
            <MDBCard className="border-0 shadow-sm premium-gradient text-white p-6">
              <MDBCardBody className="p-2">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-4">
                  Cumulative GPA
                </p>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-6xl font-black tracking-tighter">3.82</h4>
                  <span className="text-xl font-medium opacity-60">/ 4.0</span>
                </div>
                <div className="mt-8 flex items-center gap-2">
                  <div className="p-2 bg-white/20 rounded-lg">🏆</div>
                  <p className="text-xs font-bold leading-tight">
                    You are currently in the top tier of your batch.
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="border-0 shadow-sm">
              <MDBCardBody className="p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  Performance Insight
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Your GPA has increased by 0.15 points since last semester.
                  Great job in Object Oriented Programming!
                </p>
                <MDBBtn
                  outline
                  color="primary"
                  className="w-full mt-6 btn-ui btn-ui-outline"
                >
                  Download Transcript
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Grades;
