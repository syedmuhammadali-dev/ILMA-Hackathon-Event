import { BrowserRouter, Routes, Route } from "react-router";

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
