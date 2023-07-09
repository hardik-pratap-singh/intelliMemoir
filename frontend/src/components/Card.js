import React, { useEffect, useState, useRef } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import noteContext from '../context/noteContext';

const Card = (props) => {
    const { note , color , updateNote } = props;

    // const ref = useRef(null);
    // const refclose = useRef(null);


    const context = useContext(noteContext);
    const { deleteNote , editNote } = context;

    const dates = new Date((note.date.substr(0, note.date.indexOf('T')))).toString() ; 
    // console.log(dates) ;  //object hai be ye
    // const date = Date((note.date.substr(0, note.date.indexOf('T')))) ; 

    // console.log(date) ; 
    // console.log(typeof(dates)) ; 

    return (
        <>


            <div className="card my-3 mx-3 col-md-3" style={{ width: "18rem"  }}>
                {/* <Update ref = {modalref} /> */}
                <div className="card-body" style={{backgroundColor : "white"}}>
                    {/* <h6 className="card-title">{note._id}</h6> */}
                    {/* isi id ko delete and update karna hai  */}
                    <h5 className="card-title" style={{textDecoration : "underline"}}>{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">@{note.tag}</h6>
                    <p className="card-text">~ {note.description}</p>
                    
                    Last Modified : 

                    <span className="card-subtitle mb-2 text-muted"> {dates.substr(0,3)},</span>
                    <span className="card-subtitle mb-2 text-muted"> {(note.date.substr(0, note.date.indexOf('T')))}</span><br />
                    <br /><i onClick={() => deleteNote(note._id)} className="fa-solid fa-trash mx-0 my-2 icon"></i>
                    <i onClick={() => updateNote(note)} className="fa-solid fa-pen-to-square mx-4 icon"></i><br />
                </div>
            </div>
        </>
    )
}

export default Card
