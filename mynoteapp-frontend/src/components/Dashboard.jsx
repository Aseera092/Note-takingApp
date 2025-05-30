import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar'
const Dashboard = () => {
  const searchNotesByDate = ({ userId, notesDate, token }) => {
    axios.post("http://localhost:3030/searchnotes",
      { userId, notesDate },
      { headers: { token } }
    )
      .then(res => {
        console.log("Notes found:", res.data.items);
      })
      .catch(err => {
        console.error("Error fetching notes:", err);
      });
  };


  const navigate = useNavigate();

  const navigateToCreateNote = () => {
    navigate('/create');
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className="bg-light min-vh-100 min-vw-100 pb-5">
      <NavBar />
      <div className="bg-primary-dark-custom text-white text-center py-5 mb-5" style={{ minHeight: '100px' }}>
        <div className="container-xxl d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="display-4 fw-bold mb-3">Welcome back to your notes</h1>
          <p className="lead mb-4">Capture ideas, organize thoughts, and stay productive</p>
          <div className="d-flex gap-3 flex-wrap">
            <a href="/create" className="btn btn-light rounded-pill shadow-sm d-inline-flex align-items-center justify-content-center" style={{ width: '240px', height: '50px' }}>
              <i className="bi bi-plus-lg me-1"></i>
              Create Note
            </a>
            <a href="/Search" className="btn btn-light rounded-pill shadow-sm d-inline-flex align-items-center justify-content-center" style={{ width: '240px', height: '50px' }}>
              <i className="bi bi-search me-1"></i>
              Search
            </a>
          </div>
        </div>
      </div>
      <div className="card-group">
        <div className="card">
          <img src="https://www.aiseesoft.com/images/iphone-notes-app/iphone-notes-app.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <p>Organizing notes</p>
          </div>
        </div>
        <div className="card">
          <img src="https://www.linuxlinks.com/wp-content/uploads/2020/04/top-view-sticky-notes-with-list.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <p>Creating a schedule</p>
          </div>
        </div>
        <div className="card">
          <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6b/c8/12/6bc81226-e9da-fa4f-129a-e5dc18f81a84/logo_keep_2020q4_color-0-1x_U007emarketing-0-0-0-6-0-0-0-85-220-0.png/1200x630wa.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <p>Instantly capture ideas</p>
          </div>
        </div>
      </div>
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="../src/assets/carosal.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://webflow-amber-prod.gumlet.io/620e4101b2ce12a1a6bff0e8/63f3aed338f92709d7908c76_Header_10%20Best%20Note-Taking%20Apps%20Every%20Student%20Needs%20in%202023_JAN23.webp" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://i.ytimg.com/vi/EWsZ_mJyMYQ/maxresdefault.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div style={{ marginBottom: '10px' }}></div>
          <p>
            <b>Books:</b> Online Accounting Software<br />
            <b>Inventory:</b> Online Inventory Management<br />
            <b>Billing:</b> End-to-End Billing Solution<br />
            <b>Checkout:</b> Online Payments Software<br />
            <b>Payroll:</b> Online Payroll Software<br />
            <b>Invoice:</b> 100% Free Invoicing Solution<br />
            <b>Commerce:</b> Ecommerce Software<br />
            <b>Practice:</b> Practice Management Software
          </p>
        </div>
        <div className="col-12 col-md-6">
          <h4>Personal Organization</h4>
          <h6>Write daily reflections</h6>
          <h4>Professional Productivity</h4>
          <h6>Idea Capture</h6>
          <h4>Academic Use</h4>

          <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            Learn More
          </button>
          <div style={{ marginBottom: '10px' }}></div>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="card text-bg-success mb-3">
                    <div className="card-body">
                      <p className="card-text">Routine Planning</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card text-bg-primary mb-3">
                    <div className="card-body">
                      <p className="card-text">Goal Setting</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card text-bg-warning mb-3">
                    <div className="card-body">
                      <h6 className="card-title">Routine Planning</h6>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card text-bg-danger mb-3">
                    <div className="card-body">
                      <p className="card-text">Event Notes</p>
                    </div>
                  </div>
                </div>
                <i>This software has paid for itself and saved us a lot of time!</i>
                <img src="https://cdn.prod.website-files.com/63e3da3df35cd62f54751985/64d475c949ae1f0001a9d73a_ui-illo-budget-breakdown-phone.webp" className="img-fluid" alt="..." />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 mb-2 bg-dark text-white">
        <div className="row">
          <div className="col-md-3">
            <b>SITEMAP</b>
            <p>Home<br />Services<br />Projects</p>
          </div>
          <div className="col-md-3">
            <b>SUPPORT</b>
            <p>Company<br />Contact<br />Project Request</p>
          </div>
          <div className="col-md-3">
            <b>LEGAL</b>
            <p>Terms of Use<br />Privacy Policy<br />Use of Cookies</p>
          </div>
          <div className="col-md-3">
            <b>1 Million Customers</b>
            <p>1 million+ happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
