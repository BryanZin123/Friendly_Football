import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const PlayerDetails=(props)=>{

  let navigate = useNavigate();

const [playerDetail, setPlayerDetail]=useState([]);
const [teamId, setTeamId]=useState("");


let playerId = props.viewPlayerId.PlayerID;
const playerDetailUrl = "https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStatsByPlayerID/2021/"+ playerId +"?key=18aaeb3686df43c3ad5b60956927ef53"

useEffect(()=>{
  axios.get(playerDetailUrl)
  .then(response=>{setPlayerDetail(response.data); getTeamId();})
  .catch(error=>console.log(error));
},[]);

const getTeamId=()=>{
  const params = {
    email:localStorage.getItem('loggedInUser')
  };
  
  axios.get("http://localhost:8080/findTeamByEmail",{params})
  .then(response=>{
    console.log(response.data.id);
    setTeamId(response.data.id);
  }).catch(error=>{
    console.log(error)
  });
  console.log(localStorage.getItem('loggedInUser'))
}

const savePlayer=(stats)=>{
  // const playerStats = {
  //   playerId:props.viewPlayerId.PlayerID, 
  //                     playerPos:props.viewPlayerId.Position, 
  //                     playerFirstName:props.viewPlayerId.FirstName,
  //                     playerLastName:props.viewPlayerId.LastName, 
  //                     playerNumber: stats.FantasyPoints , 
  //                       team:{id:teamId}
  // }

  //console.log(playerStats);
  axios.post("http://localhost:8080/savePlayer",{   
    playerId:props.viewPlayerId.PlayerID, 
  playerPos:props.viewPlayerId.Position, 
  playerFirstName:props.viewPlayerId.FirstName,
  playerLastName:props.viewPlayerId.LastName, 
  playerNumber: stats.FantasyPoints , 
    team:{id:teamId}})
  .then(response=>{console.log(response);navigate("/dashboard")})
  .catch(error=>{console.log(error)})
}


    return(
  <div>
  {playerDetail.map((stats)=>(
  <div className="home-page d-flex align-items-center">
  <div class="card" style={{width : 300}}>
  <img class="card-img-top rounded-circle" src={props.viewPlayerId.PhotoUrl} alt="Card" style={{"maxWidth":100}}/>
  <div class="card-body">
    <h5 class="card-title">{stats.Name}</h5>
    <div className="row">
    <div className="col">
    <p class="card-text">{stats.Team}</p>
    </div>
    <div className="col">
    <p class="card-text">{stats.FantasyPosition}</p>
    </div>
    <div className="col">
    <p class="card-text">#{stats.Number}</p>
    </div>
    </div>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Rushing Yards - {stats.RushingYards}</li>
    <li class="list-group-item">Passing Yards - {stats.PassingYards}</li>
    <li class="list-group-item">Recieving Yards -  {stats.ReceivingYards}</li>
    <li class="list-group-item">Total Fantasy Points -  {stats.FantasyPoints}</li>
  </ul>
  <div class="card-body">
    <button className="btn btn-primary m-1" onClick={()=>savePlayer(stats)}>+Draft Player</button>
    <button className="btn btn-danger m-1" onClick={()=>{navigate('/draft')}}>Cancel</button>
  </div>
</div>
</div>
 ))}

      
</div>

    )
}