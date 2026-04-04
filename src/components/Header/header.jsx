import React from "react";
import { MDBNavbar, MDBContainer, MDBNavbarBrand, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { storage } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = storage.getCurrentUser();

  const handleLogout = () => {
    storage.logout();
    navigate("/login");
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light" className="sticky-top shadow-sm">
      <MDBContainer fluid className="px-5">
        <MDBNavbarBrand href="/" className="font-bold text-primary flex items-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
            height="30"
            alt="logo"
            className="me-2"
          />
          Student Portal
        </MDBNavbarBrand>

        <div className="d-flex align-items-center">
          {user && (
            <div className="me-3 d-none d-md-block">
              <span className="text-muted small">Welcome,</span>
              <span className="ms-1 fw-bold">{user.fullName}</span>
            </div>
          )}
          <MDBBtn color="danger" size="sm" onClick={handleLogout} className="px-3">
            Logout
          </MDBBtn>
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
