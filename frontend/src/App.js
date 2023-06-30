import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Getuser from './components/Getuser';
import Notes from './components/Notes';
// import Myfile from './components/Myfile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/noteState';


function App() {
  return (
    <>

      <Router>
        {/* <Myfile /> */}
        <NoteState>
          <Navbar />
          <Routes>
            <Route exact path='/Login' Component={Login}  ></Route>
            <Route exact path='/' Component={Login}  ></Route>
            <Route exact path='/Signup' Component={Signup}   ></Route>
            <Route exact path='/Getuser' Component={Getuser}   ></Route>
            <Route exact path='/Mynotes' Component={Notes}   ></Route>
          </Routes>
        </NoteState>
      </Router>
    </>
  );
}

export default App;
