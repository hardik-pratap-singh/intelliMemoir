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


    return (
        <>

    {/* //yaha rakhke kaam nhi ho rha  */}
            {/* <button type="button" ref={ref} style={{ display: "none" }} className="btn btn-primary mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal">hello</button> */}

            {/* <!-- Modal -->
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Changes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='container my-5'>
                                <div className="mb-3">

                                    {/* Remember ye cheez mera kaafi time kha gayi , modal.etitle yaani value ko 
                        aapko modal.etitle ke baraabar karna hai aur e.target.name = e.target.value hamne specify
                        kar rakha hai, so name ko bhi 'etitle' rakhna padega 
                        //anything which is same id ko bhi rakh sakte hai  */}

                                    {/* for eg. for this particular example, content will not be editable if we specify, 
                        e.target.id = e.target.value, however content will be editable if we specify 
                        e.target.name = e.target.value  */}
                                    {/* <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" id="title" name='etitle' value={modal.etitle} onChange={handlechange} className="form-control" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" id="tag" name='etag' value={modal.etag} onChange={handlechange} className="form-control" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <input type="text" id="desc" name="edesc" value={modal.edesc} onChange={handlechange} className="form-control" />

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refclose} data-bs-dismiss="modal" >Close</button>
                            <button type="submit" className="btn btn-primary" onClick={() => updatechanges()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}


            <div className="card my-3 mx-3 col-md-3" style={{ width: "18rem"  }}>
                {/* <Update ref = {modalref} /> */}
                <div className="card-body" style={{backgroundColor : "white"}}>
                    {/* <h6 className="card-title">{note._id}</h6> */}
                    {/* isi id ko delete and update karna hai  */}
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">--     {note.description}</p>
                    <h6 className="card-subtitle mb-2 text-muted">@{note.tag}</h6>
                    <i onClick={() => deleteNote(note._id)} className="fa-solid fa-trash mx-0 my-2 icon"></i>
                    <i onClick={() => updateNote(note)} className="fa-solid fa-pen-to-square mx-4 icon"></i>
                </div>
            </div>
        </>
    )
}

export default Card
