import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoutes/protectedRoutes";
import Home from "../pages/Home/home";
import Portal from "../pages/Portal/portal";
import Profile from "../pages/Profile/profile";
import Grades from "../pages/Grades/Grades";
import Schedule from "../pages/Schedule/Schedule";
import Notifications from "../pages/Notifications/Notifications";
import PublicRoute from "../components/PublicRoutes/publicRoutes";
import Login from "../pages/Login/login";
import Signup from "../pages/Signup/signup";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import DashboardLayout from "../components/DashboardLayout/dashboardLayout";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Route>

        {/* public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
