import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import nflLogo from "../../images/nfl_logo.png";
import { useForm } from 'react-hook-form';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = (props) => {

  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors},
    reset
  } = useForm();

  const onSubmit=(data)=>{
    axios.post("http://localhost:8080/login", data)
    .then(response=>{localStorage.setItem("loggedInUser", response.data.email); 
    props.refresh(); 
    navigate("/dashboard")})
    .catch(error=>{signInError();reset()});
  }


  const signInError=()=>{toast.error("Please enter the correct Email and Password", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })};

  return (
    <div className="home-page d-flex align-items-center">

    <div className='container sign-in-container bg-light p-5'>
      <><ToastContainer/></>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row mb-3'>
        <img src={nflLogo} alt="nfl logo" style={{width:'10%'}}/>
          <h2>Log in to your account</h2>
        </div>

        <div class="form-group mb-3">
        <input className="form-control me-2" type='email' {...register('email',{required:true})} placeholder="Email" aria-label="Email" />
        {errors.email && <p>Email is required.</p>}
        </div>

        <div class="form-group mb-3">
        <input className="form-control me-2" type="password" name='userPassword' {...register('userPassword',{required:true})} placeholder="Password" aria-label="Password" />
        {errors.userPassword && <p>Password is required.</p>}
        </div>

        <button className="btn btn-outline-success"  type="submit">Login</button> 

     </form>
  
      <p className='mt-3'>Need an Account?</p>
      <p> <a href="/sign-up">Sign Up</a></p>
    </div>
    </div>
  )
}
