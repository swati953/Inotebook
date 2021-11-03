import React, { useRef } from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

export const Notes = (props) => {
    const context = useContext(noteContext);
    let history = useHistory();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            history.push("/login");
        }
    }, []);

    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "default",
    });
    const handleClick = (e) => {
        // console.log("update note", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
        props.showAlert("Notes Updated Successfully", "success");
    };
    const onchange = (e) => {
        setNote({...note, [e.target.name]: e.target.value });
    };
    const ref = useRef(null);
    const refclose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
    };
    return ( <
        >
        <
        AddNote showAlert = { props.showAlert }
        />

        <
        button ref = { ref }
        type = "button"
        className = "btn btn-primary d-none"
        data - bs - toggle = "modal"
        data - bs - target = "#exampleModal" >
        Modal <
        /button>

        <
        div className = "modal fade"
        id = "exampleModal"
        tabIndex = "-1"
        aria - labelledby = "exampleModalLabel"
        aria - hidden = "true" >
        <
        div className = "modal-dialog" >
        <
        div className = "modal-content" >
        <
        div className = "modal-header" >
        <
        h5 className = "modal-title"
        id = "exampleModalLabel" >
        Edit Note <
        /h5> <
        button type = "button"
        className = "btn-close"
        data - bs - dismiss = "modal"
        aria - label = "Close" >
        < /button> <
        /div> <
        div className = "modal-body" > { " " } <
        form >
        <
        div className = "mb-3" >
        <
        label htmlFor = "title"
        className = "form-label" >
        Title <
        /label> <
        input type = "text"
        className = "form-control"
        id = "etitle"
        name = "etitle"
        aria - describedby = "emailHelp"
        onChange = { onchange }
        value = { note.etitle }
        minLength = { 5 }
        required /
        >
        <
        /div> <
        div className = "mb-3" >
        <
        label htmlFor = "description"
        className = "form-label" >
        Description <
        /label> <
        input type = "text"
        className = "form-control"
        id = "edescription"
        name = "edescription"
        onChange = { onchange }
        value = { note.edescription }
        minLength = { 5 }
        required /
        >
        <
        /div> <
        div className = "mb-3" >
        <
        label htmlFor = "tag"
        className = "form-label" >
        Tag <
        /label> <
        input type = "text"
        className = "form-control"
        id = "etag"
        name = "etag"
        onChange = { onchange }
        value = { note.etag }
        minLength = { 5 }
        required /
        >
        <
        /div> <
        /form> <
        /div> <
        div className = "modal-footer" >
        <
        button type = "button"
        className = "btn btn-secondary"
        data - bs - dismiss = "modal"
        ref = { refclose } >
        Close <
        /button> <
        button disabled = {
            note.etitle.length < 5 || note.edescription.length < 5
        }
        type = "button"
        onClick = { handleClick }
        className = "btn btn-primary" >
        Update Note <
        /button> <
        /div> <
        /div> <
        /div> <
        /div> <
        div className = "row my-3" >
        <
        h2 > your Notes < /h2> <
        div className = "container" > { notes.length === 0 && "No note to display" } <
        /div> {
            notes.map((note) => {
                return ( <
                    Noteitem key = { note._id }
                    updateNote = { updateNote }
                    note = { note }
                    showAlert = { props.showAlert }
                    />
                );
            })
        } <
        /div> <
        />
    );
};