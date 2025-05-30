import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar'

const Edit = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [note, setNote] = useState({
    Message: '',
    notesDate: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3030/getnote/${noteId}`, {
      headers: { token }
    })
      .then((res) => {
        setNote({
          Message: res.data.note.Message,
          notesDate: res.data.note.notesDate
        });
      })
      .catch((err) => console.error('Error fetching note:', err));
  }, [noteId]);
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3030/editnote/${noteId}`, note, {
      headers: { token }
    })
      .then((res) => {
        console.log(res.data);
        navigate("/viewmynote");
      })
      .catch((err) => console.error("Error updating note:", err));
  };

  return (
    <div>
      <NavBar />
      <div className="create-background min-vh-100 min-vw-100 pb-5">
        <div className="container mt-5">
          <h2>Edit Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">

              <textarea placeholder="message"
                className="form-control"
                name="Message"
                value={note.Message}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">

              <input
                type="date"
                className="form-control"
                name="notesDate"
                value={note.notesDate}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-warning">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
