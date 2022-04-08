package com.claim.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.claim.entity.Team;
import com.claim.entity.User;
import com.claim.repository.TeamRepository;
import com.claim.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TeamController {
	
	
	@Autowired
	private TeamRepository teamRespository;
	
	@Autowired
	private UserRepository	userRepository;
	
	
	@RequestMapping(value="/saveTeam",
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE,
			method=RequestMethod.POST)
	private void submitTeam(@RequestBody Team team) {
		User user = userRepository.findById(team.getUser().getEmail()).get();
		team.setUser(user);
		teamRespository.save(team);
	}
	
	
	@RequestMapping(value="/updateTeam",
			consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE,
			method=RequestMethod.PUT)
	private void updateTeam(@RequestBody Team teamScore) {
		//User user = userRepository.findById(team.getUser().getEmail()).get();
		
		Team team=teamRespository.findById(teamScore.getId()).get();
		
		team.setTeamTotalScore(teamScore.getTeamTotalScore());
		teamRespository.save(team);
	}
	
	
	@RequestMapping(value="/findAllTeam",
			produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET
			)
	@ResponseBody
	private ResponseEntity <List<Team>>findAllTeam()
	{
		return new ResponseEntity<>(teamRespository.findAll(),HttpStatus.OK);
	}
	
	
	
	@RequestMapping(value="/findTeamByEmail",
			produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET
			)
	@ResponseBody
	private ResponseEntity <Team>findTeam(String email)
	{
		return new ResponseEntity<>(teamRespository.findTeamByEmail(email), HttpStatus.OK);
	}

}
