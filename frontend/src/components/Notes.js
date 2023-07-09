import React, { useEffect, useRef, useState } from 'react'
import Addnote from './Addnote';
import { useContext } from 'react';
import noteContext from '../context/noteContext';
import Card from './Card';
// useRef


const Notes = () => {
	const context = useContext(noteContext);
	const { newnotes, getNote, editNote } = context;
	// { } iske andar wale name exactly same hone chahiye jaisa ki right side wali jagah se bheja jaa rha hai 
	// bilkul same 
	const [modal, setmodal] = useState({ eid: "", etitle: "", etag: "", edesc: "" });

	const ref = useRef(null);
	const refclose = useRef(null);

	
	useEffect(() => {
		getNote();
	}, []) // eslint-disable-line


	const updateNote = (currentNote) => {
		ref.current.click();
		setmodal({ eid: currentNote._id, etitle: currentNote.title, etag: currentNote.tag, edesc: currentNote.description });

	}

	const handlechange = (e) => {
		setmodal({ ...modal, [e.target.name]: e.target.value })
	}

	const updatechanges = () => {
		editNote(modal.eid, modal.etitle, modal.etag, modal.edesc);
		refclose.current.click();
	}


	return (
		<div>
			<Addnote />


			<button type="button" ref={ref} style={{ display: "none" }} className="btn btn-primary mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal">hello</button>

			{/* <!-- Modal --> */}
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
                        //anything which is same id ko bhi rakh sakte hai 

                                    {/* for eg. for this particular example, content will not be editable if we specify, 
                        e.target.id = e.target.value, however content will be editable if we specify 
                        e.target.name = e.target.value  */}
									<label htmlFor="title" className="form-label">Title</label>
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
			</div>
			<br />

			<div className="container">

				<h3><center><b>Your Notes</b></center>
					</h3><br />

				<div className="container row mx-1">
					{newnotes.length === 0 && <h5 style={{textAlign: "center"}}>No Notes To Display</h5>}
				</div>

				<div className="container row row-md-2 cardclass">

					{
						
						newnotes.map((note) => {
							return (
								<>
									<Card note={note}  updateNote={updateNote} key={note._id} />
								</>
							)
						})
					}

				</div>


			</div>




		</div>
	)
}

export default Notes
