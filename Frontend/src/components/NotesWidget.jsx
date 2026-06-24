import React from "react";
import { useStore } from "../store/useStore";

const NotesWidget = () => {
  const notes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="notes-widget">
      <div className="notes-header">
        <h2 className="notes-title">All notes</h2>
        {notes && (
          <button className="notes-clear-btn" onClick={() => setNotes("")}>
            Clear
          </button>
        )}
      </div>
      <textarea
        className="notes-textarea"
        value={notes}
        onChange={handleNotesChange}
        placeholder="This is how I am going to learn MERN Stack in next 3 months..."
      />
    </div>
  );
};

export default NotesWidget;
