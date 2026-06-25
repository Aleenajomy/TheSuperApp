import React from "react";
import { useStore } from "../store/useStore";

const NotesWidget = () => {
  const notes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="notes-widget card border-0 bg-transparent h-100 p-4 text-dark text-start">
      <div className="notes-header d-flex justify-content-between align-items-center w-100 mb-3">
        <h2 className="notes-title h2 fw-bold text-dark mb-0">All notes</h2>
        {notes && (
          <button className="btn btn-outline-dark btn-sm rounded-pill px-3 py-1 fw-semibold" onClick={() => setNotes("")}>
            Clear
          </button>
        )}
      </div>
      <textarea
        className="form-control border-0 bg-transparent p-0 text-dark fs-5 shadow-none flex-grow-1"
        style={{ resize: "none", outline: "none", minHeight: "150px" }}
        value={notes}
        onChange={handleNotesChange}
        placeholder="This is how I am going to learn MERN Stack in next 3 months..."
      />
    </div>
  );
};

export default NotesWidget;
