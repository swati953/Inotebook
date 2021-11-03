import React from "react";
import { useState } from "react/cjs/react.development";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  //taking notes by user
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  //fetch al notes
  const getNotes = async () => {
    //api call to bring notes on frontend
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
 
    });
    const json=await response.json();
    // console.log(json);
    setNotes(json);
};
  //add note
  const addNote = async (title, description, tag) => {
      //api call to change at backend too
    const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}),
      });
     const note=await response.json();
    setNotes(notes.concat(note));
  };

  //delete note
  const deleteNote = async(id) => {
      //API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
    });
     const json=await response.json();
    //  console.log(json);
    //add note
    // console.log("deleting the note wth id : " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit note....
  const editNote = async (id, title, description, tag) => {
    //api call to change at backend too
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
   const json=await response.json();
    let newNotes=JSON.parse(JSON.stringify(notes));
    //edit note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
         newNotes[index].title = title;
         newNotes[index].description = description;
         newNotes[index].tag = tag;
         break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {" "}
      {/* <NoteContext.Provider value={{state,update}}>  */} {props.children}{" "}
    </NoteContext.Provider>
  );
};
export default NoteState;
