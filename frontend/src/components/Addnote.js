import React, { useState  } from 'react'
import { useNavigate } from 'react-router-dom';
// import Update from './Update';
import noteContext from '../context/noteContext';
import { useContext } from 'react';

const Addnote = () => {
    const [newnote , setnewnote] = useState({title : "" , tag : "" ,  description : "" }) ; 


    const context = useContext(noteContext);
    const {addNote}  = context ;
    


    const handleclick = async (e) => {
        e.preventDefault() ; 
        // jab ye form submit hona chahiye tab to mujhe ek request maarni padegi add note waale endpoint
        //par with headers set as json token // to pahle backend ko bana lete hai , aane wali requests ko 
        //handle karne ke liye ... 
        // addnote(newnote.title , newnote.tage , newnote.description); 
        addNote(newnote.title , newnote.tag , newnote.description); 
        setnewnote({title : "" , tag : "" ,  description : "" })
    }


    const handlechange = (e) => {
        e.preventDefault() ; 
        setnewnote({...newnote , [e.target.name] : e.target.value});
    }


    
    return (
        <div>
            <form onSubmit={handleclick} className='container my-5'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="name" name='title' value={newnote.title} onChange={handlechange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="name" name='tag' value={newnote.tag} onChange={handlechange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="name" name="description" value={newnote.description} onChange={handlechange} className="form-control" id="exampleInputPassword1" />

                </div>
                <button type="submit" className="btn btn-primary mx-2">Add Note</button>
                {/* <Update /> */}
            </form>


           
        </div>
    )
}

export default Addnote
