import { BrowserRouter, Routes, Route } from "react-router";
import ProtectedRoute from "../components/ProtectedRoutes/protectedRoutes";
import Home from "../pages/Home/home";
import Portal from "../pages/Portal/portal";
import Profile from "../pages/Profile/profile";
import PublicRoute from "../components/PublicRoutes/publicRoutes";
import Login from "../pages/Login/login";
import Signup from "../pages/Signup/signup";
import DashboardLayout from "../components/DashboardLayout/dashboardLayout";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />

          {/* sidebar and header show in those routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/portal" element={<Portal />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
