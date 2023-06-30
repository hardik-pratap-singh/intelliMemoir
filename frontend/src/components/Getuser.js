import React, { useContext, useEffect, useState } from 'react'
// useState
import noteContext from '../context/noteContext';
import { Link, useNavigate } from 'react-router-dom';
const Getuser = () => {

  const context = useContext(noteContext);
  const { data, userData } = context;
  useEffect(() => {
    data();
  }, []);  //This will render only the first time when component loads 
  // data()  ; // This will cause infinite renders of the same component 
  let navigate = useNavigate();
  const handlelogout = () => {
      localStorage.removeItem('token');
      navigate('/Login');
      alert("Confirm Log Out !")
  }

  return (
    <div className="row">
      <div className="card my-5" style={{ width: "18rem", align: "center", display: "flex", margin: "auto", justifyContent: "center" }}>
        <img src={`${userData.image}`} className="card-img-top" alt="Profile" style={{ width: "50%", height: "50%", margin: "auto" }} />
        <div className="card-body">

          <h4 className="card-title" style={{ textDecoration: "underline" }}>{userData.name}</h4>
          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><h6><b>ID: </b>{userData._id}</h6></li>
          {/* <li className="list-group-item"></li> */}
          <li className="list-group-item"><b>Email</b> : {userData.email}</li>
          {/* variable && variable.substring(0, 7)  This is just to check whether your variable is empty of not if it's not empty then apply substr to it*/}
          <li className="list-group-item"><b>User Since :</b> {userData.date && userData.date.substr(0, userData.date.indexOf('T'))}</li>
        </ul>
      <br />
        <div class="d-flex flex-row d-flex justify-content-around">
          <div class="p-2"><button type="submit" className="btn btn-info mx-2"><Link className="nav-link active" aria-current="page" to="/Login">Edit Details</Link></button></div>
          <div class="p-2"><button type="submit" onClick={handlelogout} className="btn btn-info mx-2">Logout</button></div>
        </div>
        
        
      </div>
    </div>
  )
}

export default Getuser
