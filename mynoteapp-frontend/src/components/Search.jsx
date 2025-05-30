import React, { useState } from "react";
import axios from "axios";
import NavBar from '../components/NavBar'

const SearchPage = ({ userId, token }) => {
  const [notesDate, setNotesDate] = useState("");
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!notesDate) {
      setMessage("Select a date to search.");
      setNotes([]);
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3030/searchnotes",
        { userId, notesDate },
        { headers: { token } }
      );
      const items = res.data.items || [];
      setNotes(items);
      setMessage(items.length === 0 ? "No notes found." : "");
    } catch (err) {
      console.error("error");
        } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <NavBar/>
    <div className="create-background min-vh-100 min-vw-100 pb-5">
        
      <div className="container pt-4">
        <h3 className="text-center mb-4">Search Notes</h3>
        <div className="row mb-3 justify-content-center">
          <div className="col-12 col-md-8 d-flex gap-2 flex-wrap">
            <input type="date" value={notesDate} onChange={(e) => setNotesDate(e.target.value)} className="form-control" style={{ minWidth: "200px" }}/>
            <button className="btn btn-dark" onClick={handleSearch}>Search </button>
          </div>
      {message && <p className="text-center">{message}</p>}
      {notes.length > 0 && (
        <div className="row g-3">
          {notes.map((note) => (
            <div className="col-md-6" key={note._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.Message}</p>
                </div>
                <div className="card-footer"> {new Date(note.notesDate).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    </div>
    </div>
  );
};

export default SearchPage;
