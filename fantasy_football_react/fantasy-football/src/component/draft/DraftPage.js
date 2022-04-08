import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const DraftPage = (props) => {

    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);

    useEffect(()=>{
      axios.get("https://api.sportsdata.io/v3/nfl/scores/json/Players?key=18aaeb3686df43c3ad5b60956927ef53")
      .then(response=>{setPlayers(response.data);console.log(response.data)})
      .catch(error=>console.log(error));

    },[])


    
    const [filterList, setFilterList]=useState(players);
    const [searchValue, setSearchValue]=useState("");
    const [selectedTeam, setSelectedTeam]=useState("");
    const [selectedPos, setSelectedPos]=useState();

    const filterByName =(filteredData)=>{
      if(searchValue===""){
        return filteredData;
      }
      const filteredPlayers = filteredData.filter((player)=>player.LastName.match(new RegExp(searchValue, "i")) );
      return filteredPlayers;
    }

    const filterByTeam = (filteredData)=>{
      if(!selectedTeam){
        return filteredData;
      }
      const filteredPlayers = filteredData.filter((player)=>player.Team===selectedTeam);
      return filteredPlayers;
    };

    const filterByPos = (filteredData)=>{
      if(!selectedPos){
        return filteredData;
      }
      const filteredPlayers = filteredData.filter((player)=> player.Position===selectedPos || player.PositionCategory===selectedPos);
      return filteredPlayers;
    };



    const handleTeamChange=(e)=>{
      e.preventDefault();
      setSelectedTeam(e.target.value);
      console.log(e.target.value);
    };

    const handlePosChange=(e)=>{
      const inputPos = e.target.id;
      console.log(inputPos);
      if(inputPos===selectedPos){
        setSelectedPos("")
      } else{
        setSelectedPos(inputPos);
      }
    };


    const onSearch=()=>{
      var filteredData = filterByName(players);
      filteredData = filterByTeam(filteredData);
      filteredData = filterByPos(filteredData);
      setFilterList(filteredData);
      console.log(filteredData);
    };

    const onClear=()=>{
      setSearchValue("");
      setSelectedTeam("");
      setSelectedPos();
      setFilterList([]);
    }

    const handlePlayerView=(id)=>{
      console.log(id);
      props.handlePlayerView(id);
       navigate(`/playerdetails/${id.PlayerID}`);
    }


  return (
    <div className="home-page">
    <div className='container bg-light'>


      <div className='row'>
         <form className='mt-2'>
            <div className="form-group col-md-4">
              <div><h2>Draft Your Players</h2></div>
              <input type="text" name='search' value={searchValue} onChange={e=>setSearchValue(e.target.value)} class="form-control" id="" placeholder="Search by Last Name"/>
          </div>
         </form>
      </div>
      
      <div className='team-filter'>
        <div>Filter By Team</div>
        <select
        class="form-select"
        id="team-input"
        value={selectedTeam}
        onChange={handleTeamChange}
        >
          <option value="">All</option>
          <option value="ARI">Arizona Caridinals</option>
          <option value="ATL">Atlanta Falcons</option>
          <option value="BAL">Balitmore Ravens</option>
          <option value="BUF">Buffalo Bills</option>
          <option value="CAR">Carolina Panthers</option>
          <option value="CHI">Chicago Bears</option>
          <option value="CIN">Cincinanati Bengals</option>
          <option value="CLE">Cleveland Browns</option>
          <option value="DAL">Dallas Cowboys</option>
          <option value="DEN">Denver Broncos</option>
          <option value="DET">Detroit Lions</option>
          <option value="GB">Green Bay Packers</option>
          <option value="HOU">Houston Texans</option>
          <option value="IND">Indianapolis Colts</option>
          <option value="JAC">Jacksonville Jaguars</option>
          <option value="KC">Kansas City Chiefs</option>
          <option value="LV">Las Vegas Raiders</option>
          <option value="LAC">Los Angeles Chargers</option>
          <option value="LAR">Los Angeles Rams</option>
          <option value="MIA">Miami Dolphins</option>
          <option value="MIN">Minnesota Vikings</option>
          <option value="NE">New England Patriots</option>
          <option value="NO">New Orleans Saints</option>
          <option value="NYG">New York Giants</option>
          <option value="PHI">Philadelphia Eagles</option>
          <option value="PIT">Pittsburgh Steelers</option>
          <option value="SF">San Francisco 49ers</option>
          <option value="SEA">Seattle Seahawks</option>
          <option value="TB">Tampa Bay Buccaneers</option>
          <option value="TEN">Tennessee Titans</option>
          <option value="WAS">Washington Football Team</option>
        </select>
      </div>

      <div className='mt-3'>
      <div>Filter by Position</div>
      <div id="pos-options" onClick={handlePosChange}>

      <div className={selectedPos===""?"active-option":"filter-option"} id=""
        value="">
          ALL
        </div>

        <div className={selectedPos==="QB"?"active-option":"filter-option"} id="QB"
        value="QB">
          QB
        </div>

        <div className={selectedPos==="RB"?"active-option":"filter-option"} id="RB"
        value="RB">
          RB
        </div>

        <div className={selectedPos==="WR"?"active-option":"filter-option"} id="WR"
        value="WR">
          WR
        </div>

        <div className={selectedPos==="TE"?"active-option":"filter-option"} id="TE"
        value="TE">
          TE
        </div>

        <div className={selectedPos==="K"?"active-option":"filter-option"} id="K"
        value="K">
          K
        </div>

        <div className={selectedPos==="DEF"?"active-option":"filter-option"} id="DEF"
        value="DEF">
          DEF
        </div>
        
      </div>
      </div>


      <div className='row mt-3'>
      <div className='col-md-1'>
      <button type="button" onClick={onSearch} class="btn btn-primary mt-2">Search</button>
      </div>
      <div className='col'>
      <button type="button" onClick={onClear} class="btn btn-danger mt-2">Clear</button>
      </div>
      </div>

         <div className='row'>
             <div className="container mt-3 p-3 bg-light">
             <table class="table table-hover">
             <thead>
                <tr>
                <th scope="col" className='col-md-1'>Player</th>
                <th scope="col" className='col-md-1'>#</th>
                <th scope="col" className='col-md-2'>Name</th>
                <th scope="col" className='col-md-2'>Position</th>
                <th scope="col" className='col-md-2'>Team</th>
                <th scope="col" className='col-md-2'>Action</th>

                </tr>
              </thead>
            </table>
          <div>{
               filterList.map((detail,index)=>{
               return(
              <div>
           
              <table class="table table-hover">
              <tbody key={index} >
              <tr>
              <td className='col-md-1'>
              <img src={detail.PhotoUrl} alt="profile pic" className='rounded-circle'></img></td>
                <td className='col-md-1'>{detail.Number}</td>
                <td className='col-md-2'>{detail.FirstName} {detail.LastName}</td>
                <td className='col-md-2'>{detail.Position}</td>
                <td className='col-md-2'>{detail.CurrentTeam}</td>
                <td className='col-md-2'><button value={detail} onClick={()=>handlePlayerView(detail)} className='btn btn-primary'>View</button></td>

              </tr>
              </tbody>
              </table>
              </div>
                )})
             }</div>
            </div>
           </div>

           </div>
      </div>
  )
}
