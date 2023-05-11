import React from 'react'
// import noteContext from '../context/noteContext'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    // const context = useContext(NoteContext)  ; 
    const [login , logindata] = useState({email : "" , password : ""});
    let navigate = useNavigate() ; 
    const handlechange = (e) => {
        logindata({...login , [e.target.name] : e.target.value}); 
    }


    const handlesubmit = async (event) => {
        event.preventDefault() ;  //ye bhi kaafi zaroori cheez hai bhai // isko bhool gye to kaafi faltu ki errors aa sakti 
        //hai like url me teri personal cheeze show hone lag sakti hai , email , password type cheeze 

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}auth/login` , {
            method : "POST" , 
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({email : login.email , password : login.password}) , 
        })


        const json = await response.json()  ;
        if(json.success === true){
            localStorage.setItem('token' , json.authToken);
            navigate('/Mynotes')
            alert("Succesfully loggedIn");     
        }
        else if(json.issue === "email"){
            alert("Email Doesn't Exist. Try Signing Up !")
        }

        else{
            alert("Password Didn't Match. Try Again !")
        }
    }
    
    return (
        <div>
            <form onSubmit = {handlesubmit} className='container my-5'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name = "email" value = {login.email} onChange = {handlechange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name = "password" value = {login.password} onChange = {handlechange} className="form-control" id="exampleInputPassword1"/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
