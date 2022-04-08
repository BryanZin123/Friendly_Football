import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


export const Header=(props)=>{

useEffect(()=>{
  display();
})

const [logout, setLogout]=useState(false);

const display=()=>{
  setLogout(false);
}

const signOut =()=>{
  localStorage.clear();
  setLogout(true);
  console.log(logout);
}

  const toggleDisplay=()=>{

    if(localStorage.getItem('loggedInUser')){
      return(<div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <Link className="nav-link" to="/leaderboard" >Leader Board</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about-us">How to play</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" onClick={signOut} to="/">Log Out</Link>          
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Profile</Link>
          </li>
        </ul>
      </div>
      )
    }

    else{
      return(<div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <Link className="nav-link" to="/sign-up">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about-us">How to play</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link"  to="/login">Login</Link>
        </li>
      </ul>
    </div>
      )
    }
}

return(
<div className='container mb-5'>
<header>
   <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Fantasy Football</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
     {toggleDisplay()} 
    </div>
  </nav>
</header>
</div>  
)
}