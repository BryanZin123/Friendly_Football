import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export const LeaderBoard=(props)=>{

  const [team, setTeam]=useState([]);
  
  useEffect(()=>{
    axios.get("http://localhost:8080/findAllTeam")
      .then(response=>{console.log(response.data); setTeam(response.data) ; })
     .catch(error=>console.log(error))
  },[]);




    return(
      <div className="home-page">
      <div className='row'>
      <div className='col'>
      <div className="container mt-3 p-3 bg-light">
      <div>
          <table className="table table-hover">
             <thead>
                <tr>
                  <th scope="col" className='col-md-2 col-xs-1'>TEAM</th>
                  <th scope="col" className='col-md-2 col-xs-1'>FANTASY POINTS</th>
                  <th scope="col" className='col-md-2 col-xs-1'>USER</th>
                </tr>
              </thead>
              </table>
        {
          team.map((details, index )=>{
            return (
              <table className="table table-hover" key={details.id}>
              <tbody>
                <tr>
                  <td className='col-md-2 col-sm-1'>{details.name}</td>
                  <td className='col-md-2 col-sm-1'>{details.teamTotalScore}</td>
                  <td className='col-md-2 col-sm-1'>{details.user.userFirstName}</td>
                </tr>
              </tbody>
            </table>
            )
          })
      }
      </div>
      </div>
      </div>
      </div>
      </div>
    )
}