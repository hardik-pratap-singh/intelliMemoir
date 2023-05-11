import React, { useEffect, useState } from 'react'
// useState

const Getuser = () => {

  const [data, setdata] = useState({});
  // let data; 
  useEffect(() => {

    const fetchapi = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}auth/getuser`, {
        "method": "GET",
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        }
      });
      let resp = await response.json();
      // console.log(resp);
      setdata(resp);
    }
    fetchapi();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="row">
      <div className="card my-5 col-4 d-flex justify-content-center" style={{height : "12rem" , width: "22rem" , align : "center" , display : "flex" , margin : "auto" , justifyContent : "center"}}>
        <div className="card-body">
          <h4 className="card-title" style={{textDecoration : "underline"}}>{data.name}</h4>
          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><h6><b>ID: </b>{data._id}</h6></li>
          {/* <li className="list-group-item"></li> */}
          <li className="list-group-item"><b>Email</b> : {data.email}</li>
          {/* variable && variable.substring(0, 7)  This is just to check whether your variable is empty of not if it's not empty then apply substr to it*/}
          <li className="list-group-item"><b>User Since :</b> {data.date && data.date.substr(0 , data.date.indexOf('T'))}</li>
        </ul>
        {/* <div className="card-body">
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div> */}
      </div>
    </div>
  )
}

export default Getuser
