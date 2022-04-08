import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export const Dashboard=()=>{
  const navigate = useNavigate();
  const [team, setTeam]=useState("");
  const [teamId, setTeamId]=useState("");
  const [player, setPlayer]=useState([]);
  const [total, setTotal] = useState(0);




  useEffect(()=>{
    const params = {
      email:localStorage.getItem('loggedInUser')
    };
    axios.get("http://localhost:8080/findTeamByEmail",{params})
    .then(response=>{
      setTeamId(response.data.id);
      setTeam(response.data.name);
      if(teamId!==null){playersData(response.data.id)}
      ;
       }).catch(error=>{
      console.log(error)
    });
  },[]);

  console.log(teamId);

  const playersData=(teamId)=>{
    const params={
      id : teamId
    }
      axios.get("http://localhost:8080/findAllPlayer",{params})
      .then(response=>{
        setPlayer(response.data);if(player!==null){totalFantasyPoints(response.data)};
      }).catch(error=>{console.log(error)})
  }

  const updateTeamScore=()=>{
    axios.put("http://localhost:8080/updateTeam",{id:teamId, teamTotalScore: total})
    .then(response=>{console.log(response)})
    .catch(error=>{console.log(error)});
  }


  const getPlayerById=(id)=>{
    const params={
      id : id
    }
    axios.get("http://localhost:8080/findPlayerById",{params})
    .then(response=>{console.log(response)})
    .catch(error=>{console.log(error)})
  }

  const deletePlayerById=(id)=>{
    const params={
      id:id
    }
    axios.delete("http://localhost:8080/deletePlayerById",{params})
    .then(response=>{console.log(response); window.location.reload()})
    .catch(error=>{console.log(error)})
  }
  const[createTeam, setCreateTeam]=useState({name:"",user:{email:localStorage.getItem('loggedInUser')}});

  const changeHandler=(e)=>{
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const tempCreateTeam = {...createTeam};
    tempCreateTeam[name]=value;
    setCreateTeam(tempCreateTeam);
  }

  const createTeamHandler=()=>{
    axios.post("http://localhost:8080/saveTeam", createTeam)
    .then(response=>{console.log(response); window.location.reload();})
    .catch(error=>{console.log(error)});
    setCreateTeam({name:"",user:{email:localStorage.getItem('loggedInUser')}});
    console.log(localStorage.getItem('loggedInUser'));
  }
 
 const totalFantasyPoints=(player)=>{
    const result = player.reduce((total, currentValue)=> total = total + currentValue.playerNumber,0)
   setTotal(result);
   console.log(total);
   console.log(teamId);
  if(teamId!==null && total!==0){
    updateTeamScore();
  } else{
    console.log("the total score didnt update")
  }
 }

    return (
      <div className="home-page">
      <div className="container mt-3 p-3 bg-light">
        <div className="row ">
        <div className="col">
        <button onClick={()=>{navigate("/draft")}}>Draft Your Players</button>

      {
       team?<div><h3>{team}</h3></div>:   
       <div className='row'>
       <form className='mt-3'>
          <div className="form-group col-md-4">
            <input type="text" className="form-control" name="name" value={createTeam.name} onChange={changeHandler} placeholder="Your Team's Name"/>  
            <button type="button" className="btn btn-primary mt-2" onClick={createTeamHandler}>Submit</button>
        </div>
       </form>
       </div>
      }

<div>
<table className="table table-hover">
  <thead>
    <tr>
      <th scope="col" className="col-md-1">First</th>
      <th scope="col" className="col-md-1">Last</th>
      <th scope="col" className="col-md-1">Position</th>
      <th scope="col" className="col-md-1">Fantasy Points</th>
      <th scope="col" className="col-md-2">Action</th>

    </tr>
  </thead>
  </table>
{
player.map((item, index)=>{
  return(
  <table className="table table-hover" key={index}>
  <tbody>
    <tr >
      <td className="col-md-1">{item.playerFirstName}</td>
      <td className="col-md-1">{item.playerLastName}</td>
      <td className="col-md-1">{item.playerPos}</td>
      <td className="col-md-1">{item.playerNumber}</td>
      <td className="col-md-1"><button className="btn btn-outline-primary" id={item.playerId} onClick={()=>getPlayerById(item.playerId)}>VIEW</button></td>
      <td className="col-md-1"><button className="btn btn-outline-danger" id={item.playerId} onClick={()=>deletePlayerById(item.playerId)}>DELETE</button></td>
    </tr>
  </tbody>
</table>)
})
}
<div><strong>Total Fantasy Points : {total}</strong></div>
</div>

        </div>
        </div>
    </div>
    </div>
    )
}