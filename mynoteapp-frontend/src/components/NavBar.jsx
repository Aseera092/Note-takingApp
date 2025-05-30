import React from 'react';

const handleLogout = () => {
  sessionStorage.clear();
  window.location.href = "/";
};

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary-dark-custom min-vh-90 min-vw-100 pb-5py-3">
      <div className="container-fluid container-xxl ">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src="../src/assets/icon.png" alt="App Icon" style={{ width: '30px', height: '30px' }} className="me-2" />
          <span className="fw-bold fs-5">NoteCorner</span>
        </a>


        <div className="d-flex ms-auto order-lg-last">
          <ul className="navbar-nav flex-row">
            <li className="nav-item me-3">
              <a className="nav-link" href="/Dashboard">Home</a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="/search">Search</a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="/create">Add</a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="/viewmynote">View Notes</a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person-circle fs-5 me-1"></i> Account
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
