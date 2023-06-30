import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {

    const [newnotes , setNotes] = useState([])
    const [userData , setuserData] = useState({}) 

    const getNote = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}note/getnotes` , {
            method : "GET", 
            headers: {
                "Content-Type" : "application/json" , 
                "token" : localStorage.getItem('token')
            }
        })

        const data = await response.json() ; 
        setNotes(data) ;      
    }


    // console.log(newnotes) ;


    const editNote = async (id , title , tag , description) => {

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}note/updatenote/${id}` , {
            method : "PUT" , 
            headers: {
                "Content-Type" : "application/json" , 
                "token" : localStorage.getItem('token')
            },
            body : JSON.stringify({title , tag , description})
        })

        const json = await response.json() ; 
        // console.log(json)

        // let newnotes = JSON.parse(JSON.stringify(notes)) ; 
        let notes = JSON.parse(JSON.stringify((newnotes))); 
        for (let index = 0; index < newnotes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                notes[index].title = title;
                notes[index].description = description;
                notes[index].tag = tag;

                break ; 
            }
            

        }

        setNotes(notes) ; 




    }

    //abhi sahi chal rha hai 
    const deleteNote = async (id) => {
        // console.log(id);

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}note/deletenote/${id}`, {
            // http://localhost:5000/note/deletenote/642e7b6d41e604ad7f30fb4f
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.getItem('token'),
            },
        });
        const json = await response.json() ; 
        // console.log(json) ; 

        // console.log("Deleted Note with ID " + id);
        const newNotes =  newnotes.filter((note) => { return (note._id !== id) })
        setNotes(newNotes);

    }

    //abhi sahi chal rha hai 
    const addNote = async (title , tag , description) =>  {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}note/addnotes`, {
            method : "POST" , 
            headers : {
                'Content-Type':'application/json',
                'token':localStorage.getItem('token'),
            },
            body : JSON.stringify({title : title , tag : tag, description : description})
        });
        // const json = await response.json() ; 
        // console.log(response);
        const json  = await response.json() ; 
        // if (json.success) {
        //     // console.log("WoW !")
        //     navigate('/Mynotes')
        //     setnewnote({title : "" , tag : "" ,  description : "" }) ; 
        // }
        // else {
        //     alert("Some Error Occurred while deleting a note. Please retry !");
        // }

        // let addednote = newnotes ;
        // addednote.push(json.data);
        setNotes(newnotes.concat(json.data));
        // navigate("/Mynotes");
        

    }



    const data = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}auth/getuser`, {
          "method": "GET",
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token'),
          }
        });
        let resp = await response.json();
        // console.log(resp);
        setuserData(resp);
      }

    return (
        // <NoteContext.Provider value={{ s1, notes, addNote, deleteNote, editNote , getNotes }}>
        <NoteContext.Provider value={{ newnotes  , getNote , editNote  , addNote , deleteNote , data ,  userData}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;


