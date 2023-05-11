import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {  
    let navigate = useNavigate(); 

    const [data, signupdata] = useState({ name: "", email: "", password: "" });

    const handleclick = async (event) => {
        event.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: data.name, email: data.email, password: data.password })
        });

        const json = await response.json() ; 


        if(json.success){
            alert("signup Success");
            navigate("/Login");
        }

        else{
            alert("failed")
        }
    }

    const handlechange = (e) => {
        // eslint-disable-next-line
        signupdata({ ... data , [e.target.name] : e.target.value }) ; 
    }


    return (
        <div>
            <form onSubmit={handleclick} className='container my-5'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" name='name' value = {data.name} onChange = {handlechange} className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' value = {data.email} onChange = {handlechange} className="form-control"  aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" value = {data.password} onChange = {handlechange} className="form-control" id="exampleInputPassword1" />
                    <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>

                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
