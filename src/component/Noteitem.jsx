import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body my-3  ">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fas fa-trash-alt mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert(`Notes deleted Successfully of ${note._id}`,"success");
            }}
          ></i>
          <i
            className="fas fa-edit mx-2"
            onClick={() => {
              updateNote(note);
              // console.log("clicked");
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
