import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBBtn, MDBInput, MDBIcon } from "mdb-react-ui-kit";
import { storage } from "../../utils/storage";
import { profileSchema } from "../../utils/validation";

const Profile = () => {
  const [user, setUser] = useState(storage.getCurrentUser());
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    studentId: user?.studentId || "",
    bio: user?.bio || "Enthusiastic computer science student with a passion for web technologies.",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      return;
    }

    const updatedUser = storage.updateProfile(formData);
    if (updatedUser) {
      setUser(updatedUser);
      setIsEditing(false);
      setErrors({});
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <header>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Profile</h2>
        <p className="text-slate-500 font-medium mt-1">Manage your personal information and student credentials.</p>
      </header>

      <MDBRow className="g-6">
        <MDBCol lg="4">
          <MDBCard className="border-0 shadow-sm text-center p-6">
            <MDBCardBody>
              <div className="relative w-32 h-32 mx-auto mb-6">
                <MDBCardImage
                  src={`https://ui-avatars.com/api/?name=${user?.fullName}&background=random&size=128`}
                  className="rounded-full shadow-lg border-4 border-white"
                  alt="avatar"
                />
                <div className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full text-white border-2 border-white cursor-pointer hover:bg-blue-700 transition-colors shadow-sm">
                  <MDBIcon fas icon="camera" size="sm" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{user?.fullName}</h3>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mt-1">Computer Science Student</p>
              
              <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div className="text-center group cursor-pointer p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">Courses</p>
                  <p className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">12</p>
                </div>
                <div className="text-center group cursor-pointer p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">Points</p>
                  <p className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">2.4k</p>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol lg="8">
          <MDBCard className="border-0 shadow-sm">
            <MDBCardBody className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <MDBIcon fas icon="id-card" className="text-blue-500" />
                  Account Information
                </h4>
                {!isEditing ? (
                  <MDBBtn outline color="primary" size="sm" onClick={() => setIsEditing(true)} className="px-5 rounded-xl font-bold tracking-tight">
                    Edit Profile
                  </MDBBtn>
                ) : (
                  <div className="flex gap-2">
                    <MDBBtn outline color="secondary" size="sm" onClick={() => setIsEditing(false)} className="px-5 rounded-xl font-bold tracking-tight">
                      Cancel
                    </MDBBtn>
                    <MDBBtn color="primary" size="sm" onClick={handleSave} className="px-5 rounded-xl font-bold tracking-tight">
                      Save Changes
                    </MDBBtn>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Full Name</label>
                    {isEditing ? (
                      <>
                        <MDBInput 
                          name="fullName" 
                          value={formData.fullName} 
                          onChange={handleChange} 
                          className={errors.fullName ? "border-red-500" : ""}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName[0]}</p>}
                      </>
                    ) : (
                      <p className="p-3 bg-slate-50 rounded-xl font-bold text-slate-900 border border-slate-100">{user?.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Student ID</label>
                    {isEditing ? (
                      <>
                        <MDBInput 
                          name="studentId" 
                          value={formData.studentId} 
                          onChange={handleChange} 
                          className={errors.studentId ? "border-red-500" : ""}
                        />
                        {errors.studentId && <p className="text-red-500 text-xs mt-1 font-medium">{errors.studentId[0]}</p>}
                      </>
                    ) : (
                      <p className="p-3 bg-slate-50 rounded-xl font-bold text-slate-900 border border-slate-100">{user?.studentId}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Email Address</label>
                    <p className="p-3 bg-slate-50/50 rounded-xl font-medium text-slate-400 border border-slate-100 cursor-not-allowed italic">
                      {user?.email} (Cannot be changed)
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Short Bio</label>
                    {isEditing ? (
                      <>
                        <MDBInput 
                          textarea 
                          rows={3} 
                          name="bio" 
                          value={formData.bio} 
                          onChange={handleChange} 
                          className={errors.bio ? "border-red-500" : ""}
                        />
                        {errors.bio && <p className="text-red-500 text-xs mt-1 font-medium">{errors.bio[0]}</p>}
                      </>
                    ) : (
                      <p className="p-4 bg-slate-50 rounded-xl text-slate-700 leading-relaxed border border-slate-100">
                        {user?.bio || formData.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Profile;
