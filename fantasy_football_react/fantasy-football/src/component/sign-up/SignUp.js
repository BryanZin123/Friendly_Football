import React from "react";
import axios from "axios";
import nflLogo from "../../images/nfl_logo.png";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const SignUp=()=>{
 
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =(data)=> {
    axios.post("http://localhost:8080/save", data).then(response=>{navigate("/thank-you")}).catch(error=>{navigate("/*")})
    console.log(data);
  };

    return (
      <div className="home-page d-flex align-items-center">
      <div className="container sign-up-container bg-light p-5">
         <form onSubmit={handleSubmit(onSubmit)} >
          <div className="row mb-3" >
          <img src={nflLogo} alt="nfl logo" style={{width:'10%'}}/>
          <h2> Sign up for Fantasy Football Account</h2>
          </div>

          <div className="col-md-6 mb-3">
          <input type="text" name="userFirstName" placeholder="First Name"  {...register('userFirstName', {required:true})} className="form-control" id="inputFirstName" />
          {errors.userFirstName && <p>First name is required.</p>}
          </div>

          <div className="col-md-6 mb-3">
          <input type="text" name="userLastName" placeholder="Last Name" {...register('userLastName', {required:true})} className="form-control" id="inputLastName" />
          {errors.userLastName && <p>Last name is required.</p>}
          </div>

          <div className="col-md-6 mb-3">
          <input type="email" name="email" placeholder="Email" {...register('email', {required:true})} className="form-control" id="inputEmail" />
          {errors.userLastName && <p>Email is required.</p>}
          </div>

          <div className="col-md-6 mb-3">
          <input type="password" name="userPassword" placeholder="Password" {...register('userPassword', {required:true})} className="form-control" id="inputPassword" />
          {errors.userPassword && <p>Password is required.</p>}
          </div>

          <button className="btn btn-outline-success" style={{width:"78px"}} type="submit">Sign up</button>

      </form>
      </div>
      </div>
    )
}