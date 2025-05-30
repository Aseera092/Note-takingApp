import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewMynotes = () => {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token");
  const userId = { userId: sessionStorage.getItem("userId") };
  const navigate = useNavigate();

 const fetchData = () => {
  axios.post("http://localhost:3030/viewmynotes", userId, {
    headers: {
      token: token,
      "Content-Type": "application/json"
    }
  }).then((response) => {
    const sortedNotes = response.data.items.sort(
      (a, b) => new Date(b.notesDate) - new Date(a.notesDate)
    );
    setData(sortedNotes);
  }).catch((error) => {
    console.log("Fetch error:", error);
  });
};


  const deleteNote = (noteId) => {
    axios.delete(`http://localhost:3030/deletenote/${noteId}`, {
      headers: {
        token: token
      }
    }).then((response) => {
      console.log(response.data);
      fetchData();
    }).catch((error) => {
      console.error("Error deleting note:", error);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const singleCardStyle = "text-bg-white";

  return (
    <div>
      <NavBar />
      <div className="view-background min-vh-100 min-vw-100 pb-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="text-center">My Notes</h1>
             <div style={{ marginBottom: '20px' }}></div>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {data.map((value) => (
                <div className={`card ${singleCardStyle} mb-3`} style={{ maxWidth: "18rem" }} key={value._id}>
                  <div className="card-body">
                    <p className="card-text">{value.Message}</p>
                    <p className="card-text">{value.notesDate}</p>
                    
                    <button
                      onClick={() => navigate(`/edit/${value._id}`)}
                      className="btn btn-secondary btn-sm mt-2">
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm mt-2 me-2"
                      onClick={() => deleteNote(value._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMynotes;
