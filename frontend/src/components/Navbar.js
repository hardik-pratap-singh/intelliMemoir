import { React, useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/noteContext';

const Navbar = () => {

    const context = useContext(noteContext);
    const { data, userData } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            data();
        }
    }, [data]);

    //pehle aise (below) kar rhe the to kaafi error aa rha tha, but then I used my lill brain and conditionally rendered the component
    //as shown above 
    // useEffect(() => {
    //     data() ; 
    // } , []) ; 

    return (
        <div>
            <nav className="navbar form-inline navbar-dark bg-dark">
                <div className="container-fluid">
                    <h3 className="navbar-brand" to="#">iNoteBook-Notes-Maker</h3>
                    {/* <ul className="navbar-nav me-auto mb-3 mb-lg-0"> */}
                    {
                        localStorage.getItem('token') &&
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Mynotes">My Notes</Link>
                            </li>
                        </ul>
                        // <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        // <li className="nav-item">
                        //   <a className="nav-link active" aria-current="page" href="#">Home</a>
                        // </li>
                        // </ul>


                    }


                    {/* </ul> */}
                    {
                        localStorage.getItem('token') ?
                            // <button type="submit" onClick={handlelogout} className="btn btn-info mx-2">Logout</button>
                            <form className="d-flex" role="search">
                    
                                    <Link className="nav-link active" aria-current="page" to="/Getuser"><img src={userData.image} alt="profile" width="40px" height="40px" style={{borderRadius : "50%" , marginRight : "10px"}}  /></Link>
                       
                            </form>
                            

                            :
                            <form className="d-flex">
                                <button type="submit" className="btn btn-info mx-2"><Link className="nav-link active" aria-current="page" to="/Login">Login</Link></button>
                                <button type="submit" className="btn btn-info mx-2"><Link className="nav-link active" aria-current="page" to="/Signup">Signup</Link></button>
                            </form>
                    }

                </div>
            </nav>
        </div>
    )
}

export default Navbar
