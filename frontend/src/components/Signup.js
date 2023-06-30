import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// import { signup } from '../../../backend/controllers/auth';

const Signup = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [data, signupdata] = useState({ name: "", email: "", password: "" , image : "" });
    // const [base64 , setbase64] = useState("") ; 

    
    const handleclick = async (event) => {
        // console.log(data) ; 
        event.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: data.name, email: data.email, password: data.password , image : data.image })
        });

        const json = await response.json();
        console.log(json); 


        if (json.success) {
            alert("signup Success");
            navigate("/Login");
        }

        else {
            alert("failed")
        }
    }

    const handlechange = (e) => {
        // eslint-disable-next-line
        signupdata({ ...data, [e.target.name]: e.target.value });
    }


    // function uploadSingleImage(base64) {
    //     // setLoading(true);
    //     // axios
    //     //   .post("http://localhost:5000/auth/signup", { image: base64 })
    //     //   .then((res) => {
    //     //     // setUrl(res.data);
    //     //     alert("Image uploaded Succesfully");
    //     //   })
    //     //   .then(() => setLoading(false))
    //     //   .catch(console.log);
    //     setbase64(base64) ; 

    //   }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };



    const uploadImage = async (event) => {
        const files = event.target.files;
        console.log(files.length);
        const base64 = await convertBase64(files[0]);
        // uploadSingleImage(base64);
        console.log(base64) ; 
        // setbase64(String(base64)) ; 
        signupdata({...data , image : base64}) ; 
        return;
    };


    return (
        <div>
            <form onSubmit={handleclick} className='container my-5'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" name='name' value={data.name} onChange={handlechange} className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' value={data.email} onChange={handlechange} className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" value={data.password} onChange={handlechange} className="form-control" id="exampleInputPassword1" />
                    <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>

                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Choose Profile Photo</label>
                    <input className="form-control" type="file" id="formFile" onChange={uploadImage} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
