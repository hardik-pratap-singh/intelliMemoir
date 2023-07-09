import React, { useContext, useEffect, useState, useRef } from 'react'
// useState
import noteContext from '../context/noteContext';
import {  useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";



const Getuser = () => {

  const context = useContext(noteContext);
  const { newnotes , data, userData ,updateUserData  } = context;
  // console.log(userData) ; 
  
  const [newcred , setnewCred] = useState({name : "" , email : ""}) ; 
  
  const ref = useRef(null);
  const saveChanges = useRef(null) ; 

  useEffect(() => {
    data(); 
    // setnewCred({name : userData.name , email : userData.email}); 
    // console.log(newcred);
    
  // eslint-disable-next-line
  }, []);  //This will render only the first time when component loads 
  // data()  ; // This will cause infinite renders of the same component 


  let navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem('token');
    // navigate('/Login');
    Swal.fire({
      title: 'Confirm Log Out ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Log Out',
      denyButtonText: `Wait`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('See You Again !', '', 'success');
        navigate('/Login'); 
      } 
    })
    // alert("Confirm Log Out !")
  }

  const handleUpdate = () => {
    ref.current.click();
    setnewCred({name : userData.name , email : userData.email}) ; 
  }

  const handleChange = (e) => {
    setnewCred({ ...newcred, [e.target.name]: e.target.value })
  }

  const updateProfile = () => {
    saveChanges.current.click() ;
    console.log(newcred.name) ; 
    console.log(newcred.email) ; 
    updateUserData(newcred.name , newcred.email) ; 
  }

  return (
    <>
      {/* // Modal code begins  */}


      <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }}>

      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Profile</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='container my-5'>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" name="name" className="form-control" value = {newcred.name} onChange={handleChange}  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value = {newcred.email} onChange={handleChange}  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={saveChanges} data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={updateProfile}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* // Modal code ends  */}
      <div className="row">
        <div className="card my-5" style={{ width: "18rem", align: "center", display: "flex", margin: "auto", justifyContent: "center" }}>
          <img src={`${userData.image}`} className="card-img-top my-3" alt="Profile" style={{ width: "50%", height: "50%", margin: "auto" , borderRadius : "50%" }} />
          <div className="card-body">

            <h4 className="card-title" style={{ textDecoration: "underline" , textAlign : "center" }}>{userData.name}</h4>
            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          </div>
          <ul className="list-group list-group-flush">
            {/* <li className="list-group-item"><h6><b>ID: </b>{userData._id}</h6></li> */}
            {/* <li className="list-group-item"></li> */}
            <li className="list-group-item"><b>Email</b> : {userData.email}</li>
            {/* variable && variable.substring(0, 7)  This is just to check whether your variable is empty of not if it's not empty then apply substr to it*/}
            <li className="list-group-item"><b>User Since :</b> {userData.date && userData.date.substr(0, userData.date.indexOf('T'))}</li>
            <li className="list-group-item"><b>Notes Count</b> : {newnotes.length}</li>
          </ul>
          <br />
          <div className="d-flex flex-row d-flex justify-content-around">
            <div className="p-2"><button type="submit" className="btn btn-info mx-2" onClick={handleUpdate} >Edit Details</button></div>
            <div className="p-2"><button type="submit" onClick={handlelogout} className="btn btn-info mx-2">Logout</button></div>
          </div>


        </div>
      </div>
    </>
  )
}

export default Getuser
