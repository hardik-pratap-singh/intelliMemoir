import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    let navigate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem('token');
        navigate('/Login');
        alert("Confirm Log Out !")
    }
    return (
        <div>
            <nav className="navbar form-inline navbar-dark bg-dark">
                <div className="container-fluid">
                    <h3 className="navbar-brand" to="#">iNoteBook-Notes-Maker</h3>
                        <ul className="navbar-nav me-auto mb-3 mb-lg-0">
                            {
                                localStorage.getItem('token') &&
                                <ul className="nav1 navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/Getuser">Get My Details</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/Mynotes">My Notes</Link>
                                    </li>
                                </ul>


                            }


                        </ul>
                        {
                            localStorage.getItem('token') ?
                                <button type="submit" onClick={handlelogout} className="btn btn-info mx-2">Logout</button>
                                :
                                <form className="d-flex">
                                    <button type="submit" className="btn btn-info mx-2"><Link className="nav-link active" aria-current="page" to="/Login">Login</Link></button>
                                    <button type="submit" className="btn btn-info mx-2"><Link className="nav-link active" aria-current="page" to="/Signup">Signup</Link></button>
                                </form>
                        }

                    </div>
                {/* </div> */}
            </nav>
        </div>
    )
}

export default Navbar
